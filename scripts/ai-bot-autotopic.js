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

const TOPIC_POOL = [
  '香港中小企用 AI 自動化客服的 5 個實戰流程',
  '2026 年內容網站 SEO 實戰：從零到日更流量',
  '用 AI 寫作時點樣避免模板味：真實案例拆解',
  'SaaS 創業者必學：低成本驗證產品需求的方法',
  'Google 演算法更新後，內容站應該點調整',
  '用數據儀表板管理內容團隊：指標與誤區',
  'AI + 投資內容如何做得更可信：來源與風控',
  '新手做內容變現：從 0 到第一筆收入路線圖',
];

function pickTopic() {
  return TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
}

async function main() {
  const topic = process.argv.includes('--topic')
    ? process.argv[process.argv.indexOf('--topic') + 1]
    : pickTopic();

  const { data, error } = await supabase
    .from('ai_blog_queue')
    .insert({
      topic,
      category: 'ai',
      tone: 'professional',
      length: 'medium',
      status: 'pending',
    })
    .select('id,topic,status,created_at')
    .single();

  if (error) {
    console.error('[autotopic] enqueue failed:', error.message);
    process.exit(1);
  }

  console.log('[autotopic] enqueued:', data.id, data.topic);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
