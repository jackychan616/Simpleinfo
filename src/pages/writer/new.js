import { Button, Container, Select, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ai');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitForReview() {
    setLoading(true);
    setMsg('');

    const res = await fetch('/api/writer/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, content }),
    });

    const body = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(`提交失敗：${body?.error || 'unknown error'}`);
      return;
    }

    setMsg('已送審 ✅（已寫入 Supabase）');
    setTitle('');
    setCategory('ai');
    setContent('');
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>建立投稿</Title>
        <Text color="dimmed">已接上 Supabase，提交後會寫入 writer_submissions（pending_review）。</Text>

        <TextInput label="文章標題" value={title} onChange={(e) => setTitle(e.currentTarget.value)} required />
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
        />

        <Button onClick={submitForReview} disabled={!title || !content || loading}>
          {loading ? '提交中...' : '提交審核'}
        </Button>
        <Button component={Link} href="/writer/submissions" variant="light">查看投稿狀態</Button>
        {msg ? <Text color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
