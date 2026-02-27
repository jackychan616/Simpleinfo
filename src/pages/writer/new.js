import { Button, Container, Select, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import WriterAuth from '../components/writerAuth';
import { getAccessToken } from '../../lib/supabaseBrowser';

const TITLE_LIMIT = 120;
const CONTENT_LIMIT = 10000;

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ai');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitForReview() {
    setLoading(true);
    setMsg('');

    const safeTitle = title.trim();
    const safeContent = content.trim();

    if (!safeTitle || !safeContent) {
      setLoading(false);
      setMsg('提交失敗：請先填寫標題與內容');
      return;
    }

    const token = await getAccessToken();
    if (!token) {
      setLoading(false);
      setMsg('提交失敗：請先登入（magic link）');
      return;
    }

    const res = await fetch('/api/writer/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: safeTitle, category, content: safeContent }),
    });

    const body = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(`提交失敗：${body?.error || 'unknown error'}`);
      return;
    }

    setMsg('已送審 ✅（已綁定 author）');
    setTitle('');
    setCategory('ai');
    setContent('');
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>建立投稿</Title>
        <WriterAuth />
        <Text color="dimmed">提交後會寫入 writer_submissions（pending_review）並綁定登入作者。</Text>

        <TextInput
          label="文章標題"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
          maxLength={TITLE_LIMIT}
          description={`${title.trim().length}/${TITLE_LIMIT}`}
        />
        <Select
          label="分類"
          value={category}
          onChange={(value) => setCategory(value || 'ai')}
          data={[
            { value: 'ai', label: 'AI' },
            { value: 'gaming', label: 'Gaming' },
            { value: 'tech', label: 'Tech' },
          ]}
        />
        <Textarea
          label="內容"
          minRows={10}
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          required
          maxLength={CONTENT_LIMIT}
          description={`${content.trim().length}/${CONTENT_LIMIT}`}
        />

        <Button
          onClick={submitForReview}
          disabled={!title.trim() || !content.trim() || loading}
        >
          {loading ? '提交中...' : '提交審核'}
        </Button>
        <Button component={Link} href="/writer/my-posts" variant="light">查看我的投稿</Button>
        {msg ? <Text color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
