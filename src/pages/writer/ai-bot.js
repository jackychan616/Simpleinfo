import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import RouteGuard from '../components/routeGuard';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function AiBotDashboardPage() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('ai');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [msg, setMsg] = useState('');
  const [counts, setCounts] = useState({});
  const [latest, setLatest] = useState([]);

  async function getRole(emailValue) {
    const res = await fetch(`/api/v2/me/role?email=${encodeURIComponent(emailValue || '')}`);
    const body = await res.json().catch(() => ({}));
    return body?.role || 'user';
  }

  async function loadStatus() {
    const role = await getRole(email);
    if (!['admin', 'editor'].includes(role)) {
      setMsg('你需要 admin/editor 權限先可用 AI Bot Dashboard');
      return;
    }

    const res = await fetch('/api/ai-bot/status');
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      setCounts(body.counts || {});
      setLatest(body.latest || []);
    }
  }

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    supabase.auth.getUser().then(async ({ data }) => {
      const userEmail = data.user?.email || '';
      setEmail(userEmail);
    });
  }, []);

  useEffect(() => {
    if (email) loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  async function enqueue() {
    const res = await fetch('/api/ai-bot/enqueue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, category, tone, length }),
    });

    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? '已加入 queue ✅' : `enqueue 失敗：${body?.error || 'unknown error'}`);
    if (res.ok) {
      setTopic('');
      await loadStatus();
    }
  }

  async function runOne() {
    const res = await fetch('/api/ai-bot/run', { method: 'POST' });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? (body.message || `已處理 queue ${body.queueId || ''}`) : `run 失敗：${body?.error || 'unknown error'}`);
    await loadStatus();
  }

  return (
    <RouteGuard requireLogin minRole="editor">
      <Container size="lg" py="xl">
        <Stack spacing="md">
          <Title order={1}>AI Blog Bot Dashboard</Title>
          <Text color="dimmed">管理 AI 內容排程：enqueue、run、監控 queue 狀態。</Text>
          <Text size="sm" color="dimmed">Current user: {email || '未登入'}</Text>

          <Group>
            <Badge color="yellow">pending: {counts.pending || 0}</Badge>
            <Badge color="blue">processing: {counts.processing || 0}</Badge>
            <Badge color="green">done: {counts.done || 0}</Badge>
            <Badge color="red">failed: {counts.failed || 0}</Badge>
            <Button size="xs" variant="light" onClick={loadStatus}>Refresh</Button>
          </Group>

          <Card withBorder>
            <Stack>
              <TextInput label="Topic" placeholder="例如：AI SEO 策略 2026" value={topic} onChange={(e) => setTopic(e.currentTarget.value)} />
              <Group grow>
                <Select value={category} onChange={(v) => setCategory(v || 'ai')} data={[{ value: 'ai', label: 'AI' }, { value: 'tech', label: 'Tech' }, { value: 'gaming', label: 'Gaming' }]} label="Category" />
                <Select value={tone} onChange={(v) => setTone(v || 'professional')} data={[{ value: 'professional', label: 'Professional' }, { value: 'friendly', label: 'Friendly' }, { value: 'persuasive', label: 'Persuasive' }]} label="Tone" />
                <Select value={length} onChange={(v) => setLength(v || 'medium')} data={[{ value: 'short', label: 'Short' }, { value: 'medium', label: 'Medium' }, { value: 'long', label: 'Long' }]} label="Length" />
              </Group>
              <Group>
                <Button onClick={enqueue} disabled={!topic.trim()}>Enqueue</Button>
                <Button variant="light" onClick={runOne}>Run one now</Button>
              </Group>
            </Stack>
          </Card>

          <Card withBorder>
            <Text size="sm" color="dimmed" mb="sm">Recent queue items</Text>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Status</th>
                  <th>Scheduled</th>
                  <th>Processed</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((r) => (
                  <tr key={r.id}>
                    <td>{r.topic}</td>
                    <td>{r.status}</td>
                    <td>{r.scheduled_at ? new Date(r.scheduled_at).toLocaleString() : '-'}</td>
                    <td>{r.processed_at ? new Date(r.processed_at).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          {msg ? <Text size="sm">{msg}</Text> : null}
        </Stack>
      </Container>
    </RouteGuard>
  );
}
