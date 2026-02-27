#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { buildDraftFromTopic } = require('../src/lib/aiBotDraft');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function processOne() {
  const nowIso = new Date().toISOString();
  const { data: item, error } = await supabase
    .from('ai_blog_queue')
    .select('*')
    .eq('status', 'pending')
    .or(`scheduled_at.is.null,scheduled_at.lte.${nowIso}`)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error || !item) {
    console.log('[ai-bot] no pending jobs');
    return false;
  }

  await supabase.from('ai_blog_queue').update({ status: 'processing' }).eq('id', item.id);

  try {
    const draft = buildDraftFromTopic({
      topic: item.topic,
      tone: item.tone,
      length: item.length,
      category: item.category,
    });

    const { data: submission, error: insertErr } = await supabase
      .from('writer_submissions')
      .insert({
        title: draft.title,
        category: draft.category,
        content: draft.content,
        content_blocks: draft.blocks,
        status: 'pending_review',
        author_email: 'ai-bot@simpleinfo.local',
      })
      .select('id,title')
      .single();

    if (insertErr) throw insertErr;

    await supabase
      .from('ai_blog_queue')
      .update({ status: 'done', generated_submission_id: submission.id, processed_at: new Date().toISOString() })
      .eq('id', item.id);

    console.log(`[ai-bot] done queue=${item.id} submission=${submission.id}`);
    return true;
  } catch (e) {
    await supabase
      .from('ai_blog_queue')
      .update({ status: 'failed', error_message: String(e.message || e), processed_at: new Date().toISOString() })
      .eq('id', item.id);

    console.error('[ai-bot] failed', e.message || e);
    return false;
  }
}

async function main() {
  const isLoop = process.argv.includes('--loop');
  if (!isLoop) {
    await processOne();
    return;
  }

  console.log('[ai-bot] loop mode started');
  while (true) {
    await processOne();
    await new Promise((r) => setTimeout(r, 60_000));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
