import { Button, Container, Select, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useState } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ai');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');

  function submitForReview() {
    const draft = {
      id: Date.now().toString(),
      title,
      category,
      content,
      status: 'pending_review',
      createdAt: new Date().toISOString(),
    };

    const key = 'simpleinfo_writer_drafts';
    const old = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([draft, ...old]));
    setMsg('已送審 ✅（目前為本機 mock，下一步會接真 DB）');
    setTitle('');
    setCategory('ai');
    setContent('');
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>建立投稿</Title>
        <Text color="dimmed">第一階段先用本機 mock 流程，之後接真實 user/auth/database。</Text>

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

        <Button onClick={submitForReview} disabled={!title || !content}>提交審核</Button>
        {msg ? <Text color="teal">{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
