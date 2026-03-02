#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { loadLocalEnv } = require('./load-env');

loadLocalEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

function arg(name, fallback = '') {
  const index = process.argv.findIndex((a) => a === `--${name}`);
  if (index < 0) return fallback;
  return process.argv[index + 1] || fallback;
}

async function main() {
  const topic = arg('topic');
  const category = arg('category', 'ai');
  const tone = arg('tone', 'professional');
  const length = arg('length', 'medium');
  const schedule = arg('schedule', '');

  if (!topic) {
    console.error('Usage: npm run ai:bot:enqueue -- --topic "Your topic" [--category ai] [--tone professional] [--length medium] [--schedule 2026-03-02T16:00:00+08:00]');
    process.exit(1);
  }

  const { data, error } = await supabase
    .from('ai_blog_queue')
    .insert({
      topic,
      category,
      tone,
      length,
      status: 'pending',
      scheduled_at: schedule || null,
    })
    .select('*')
    .single();

  if (error) {
    console.error('[enqueue] failed:', error.message);
    process.exit(1);
  }

  console.log('[enqueue] ok:', data.id, data.topic, data.status);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
