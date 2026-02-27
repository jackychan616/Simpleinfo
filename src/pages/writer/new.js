import { ActionIcon, Badge, Button, Card, Container, Group, Select, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';
import BlockRenderer from '../components/blockRenderer';
import { blocksToPlainText, normalizeBlock, normalizeBlocks } from '../../lib/contentBlocks';

const TITLE_LIMIT = 120;
const CONTENT_LIMIT = 10000;

const BLOCK_TYPE_OPTIONS = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'heading', label: 'Heading' },
  { value: 'image', label: 'Image' },
  { value: 'link', label: 'Link' },
  { value: 'code', label: 'Code' },
  { value: 'embed', label: 'Embed (future: YouTube)' },
];

const EMPTY_BLOCK = normalizeBlock({ type: 'paragraph', text: '' });

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ai');
  const [blocks, setBlocks] = useState([EMPTY_BLOCK]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('professional');
  const [aiLength, setAiLength] = useState('medium');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDraft, setAiDraft] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  const plainContent = useMemo(() => blocksToPlainText(blocks), [blocks]);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || '');
      setUserId(data.user?.id || '');
    });
  }, []);

  function updateBlock(id, patch) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? normalizeBlock({ ...b, ...patch }) : b)));
  }

  function addBlock(type = 'paragraph') {
    setBlocks((prev) => [...prev, normalizeBlock({ type })]);
  }

  function removeBlock(id) {
    setBlocks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      return next.length ? next : [normalizeBlock({ type: 'paragraph' })];
    });
  }

  async function submitForReview() {
    setLoading(true);
    setMsg('');

    const safeTitle = title.trim();
    const normalized = normalizeBlocks(blocks);
    const safeContent = blocksToPlainText(normalized);

    if (!safeTitle || !safeContent) {
      setLoading(false);
      setMsg('提交失敗：請先填寫標題與內容');
      return;
    }

    const res = await fetch('/api/writer/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': userEmail,
        'x-user-id': userId,
      },
      body: JSON.stringify({ title: safeTitle, category, content: safeContent, contentBlocks: normalized }),
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
    setBlocks([normalizeBlock({ type: 'paragraph' })]);
    setAiDraft(null);
    setAiTopic('');
  }

  async function requestAI(action = 'draft') {
    setAiLoading(true);
    setMsg('');

    const payload = {
      topic: aiTopic.trim() || title.trim() || '未命名主題',
      tone: aiTone,
      length: aiLength,
      action,
      existingBlocks: normalizeBlocks(blocks),
    };

    const res = await fetch('/api/writer/ai-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => ({}));
    setAiLoading(false);

    if (!res.ok || !body?.data) {
      setMsg(`AI 生成失敗：${body?.error || 'unknown error'}`);
      return;
    }

    setAiDraft(body.data);
    if (body.data.title && !title.trim()) setTitle(body.data.title);
    setMsg(body.fallback ? 'AI 使用 fallback 模式，已生成可用草稿。' : 'AI 草稿已生成 ✅');
  }

  function applyAIDraft() {
    if (!aiDraft) return;
    setBlocks(normalizeBlocks(aiDraft.blocks || []));
    if (aiDraft.title) setTitle(aiDraft.title);
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="md">
        <Title order={1}>建立投稿（Advanced Editor MVP）</Title>
        <Text size="sm">登入狀態：{userEmail || '未登入'}</Text>
        {!userEmail ? <Button component={Link} href="/writer/auth" variant="light">先登入先可以投稿</Button> : null}
        <Text color="dimmed">支援 Block：paragraph / heading / image / link / code（已預留 embed schema）。</Text>

        <Card withBorder>
          <Stack spacing="xs">
            <Title order={4}>AI Assistant</Title>
            <TextInput label="Topic" placeholder="例如：2026 AI SEO content strategy" value={aiTopic} onChange={(e) => setAiTopic(e.currentTarget.value)} />
            <Group grow>
              <Select
                label="Tone"
                value={aiTone}
                onChange={(v) => setAiTone(v || 'professional')}
                data={[
                  { value: 'professional', label: 'Professional' },
                  { value: 'friendly', label: 'Friendly' },
                  { value: 'persuasive', label: 'Persuasive' },
                ]}
              />
              <Select
                label="Length"
                value={aiLength}
                onChange={(v) => setAiLength(v || 'medium')}
                data={[
                  { value: 'short', label: 'Short' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'long', label: 'Long' },
                ]}
              />
            </Group>
            <Group>
              <Button onClick={() => requestAI('draft')} loading={aiLoading}>Generate draft</Button>
              <Button variant="light" onClick={() => requestAI('expand')} loading={aiLoading}>Rewrite: Expand</Button>
              <Button variant="light" onClick={() => requestAI('shorten')} loading={aiLoading}>Rewrite: Shorten</Button>
              <Button variant="light" onClick={() => requestAI('improve_seo')} loading={aiLoading}>Rewrite: Improve SEO</Button>
              <Button variant="outline" onClick={applyAIDraft} disabled={!aiDraft}>Apply to editor</Button>
            </Group>
            {aiDraft?.description ? <Text size="sm" color="dimmed">AI SEO Description: {aiDraft.description}</Text> : null}
          </Stack>
        </Card>

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

        <Group>
          <Button variant={preview ? 'outline' : 'filled'} onClick={() => setPreview(false)}>Edit mode</Button>
          <Button variant={preview ? 'filled' : 'outline'} onClick={() => setPreview(true)}>Preview mode</Button>
          <Badge>{plainContent.length}/{CONTENT_LIMIT}</Badge>
        </Group>

        {preview ? (
          <Card withBorder>
            <BlockRenderer blocks={normalizeBlocks(blocks)} />
          </Card>
        ) : (
          <Stack spacing="sm">
            {blocks.map((block, idx) => (
              <Card key={block.id} withBorder>
                <Stack spacing="xs">
                  <Group position="apart">
                    <Group>
                      <Badge>#{idx + 1}</Badge>
                      <Select
                        value={block.type}
                        onChange={(v) => updateBlock(block.id, { type: v || 'paragraph' })}
                        data={BLOCK_TYPE_OPTIONS}
                      />
                    </Group>
                    <ActionIcon color="red" variant="subtle" onClick={() => removeBlock(block.id)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>

                  {block.type === 'paragraph' ? <Textarea minRows={4} value={block.text || ''} onChange={(e) => updateBlock(block.id, { text: e.currentTarget.value })} /> : null}
                  {block.type === 'heading' ? (
                    <Group grow>
                      <Select label="Level" value={String(block.level || 2)} onChange={(v) => updateBlock(block.id, { level: Number(v || 2) })} data={[1, 2, 3, 4, 5, 6].map((v) => ({ value: String(v), label: `H${v}` }))} />
                      <TextInput label="Text" value={block.text || ''} onChange={(e) => updateBlock(block.id, { text: e.currentTarget.value })} />
                    </Group>
                  ) : null}
                  {block.type === 'image' ? (
                    <>
                      <TextInput label="Image URL" value={block.src || ''} onChange={(e) => updateBlock(block.id, { src: e.currentTarget.value })} />
                      <Group grow>
                        <TextInput label="Alt" value={block.alt || ''} onChange={(e) => updateBlock(block.id, { alt: e.currentTarget.value })} />
                        <TextInput label="Caption" value={block.caption || ''} onChange={(e) => updateBlock(block.id, { caption: e.currentTarget.value })} />
                      </Group>
                    </>
                  ) : null}
                  {block.type === 'link' ? (
                    <Group grow>
                      <TextInput label="Text" value={block.text || ''} onChange={(e) => updateBlock(block.id, { text: e.currentTarget.value })} />
                      <TextInput label="Href" value={block.href || ''} onChange={(e) => updateBlock(block.id, { href: e.currentTarget.value })} />
                    </Group>
                  ) : null}
                  {block.type === 'code' ? (
                    <>
                      <TextInput label="Language" value={block.language || 'plaintext'} onChange={(e) => updateBlock(block.id, { language: e.currentTarget.value })} />
                      <Textarea minRows={6} label="Code" value={block.code || ''} onChange={(e) => updateBlock(block.id, { code: e.currentTarget.value })} />
                    </>
                  ) : null}
                  {block.type === 'embed' ? (
                    <>
                      <TextInput label="Provider" value={block.provider || 'youtube'} onChange={(e) => updateBlock(block.id, { provider: e.currentTarget.value })} />
                      <TextInput label="URL" value={block.url || ''} onChange={(e) => updateBlock(block.id, { url: e.currentTarget.value })} />
                    </>
                  ) : null}
                </Stack>
              </Card>
            ))}
            <Group>
              {BLOCK_TYPE_OPTIONS.map((opt) => (
                <Button key={opt.value} size="xs" variant="light" onClick={() => addBlock(opt.value)}>
                  + {opt.label}
                </Button>
              ))}
            </Group>
          </Stack>
        )}

        <Button onClick={submitForReview} disabled={!title.trim() || !plainContent.trim() || loading || plainContent.length > CONTENT_LIMIT || !userEmail}>
          {loading ? '提交中...' : '提交審核'}
        </Button>
        <Button component={Link} href="/writer/submissions" variant="light">查看投稿狀態</Button>
        {msg ? <Text color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
      </Stack>
    </Container>
  );
}
