import { Badge, Button, Card, Container, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import RouteGuard from '../components/routeGuard';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function AiBotDashboardPage() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('ai');
  const [customCategory, setCustomCategory] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [scheduledAt, setScheduledAt] = useState('');
  const [minChars, setMinChars] = useState(300);
  const [msg, setMsg] = useState('');
  const [reviewSubmissionId, setReviewSubmissionId] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [counts, setCounts] = useState({});
  const [latest, setLatest] = useState([]);

  async function readErrorMessage(res) {
    const text = await res.text();
    if (!text) return `HTTP ${res.status}`;

    try {
      const json = JSON.parse(text);
      return json?.error || json?.hint || text;
    } catch {
      return text;
    }
  }

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
      body: JSON.stringify({
        topic,
        category: (customCategory || category || 'ai').trim(),
        tone,
        length,
        scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      }),
    });

    if (res.ok) {
      setMsg('已加入 queue ✅');
    } else {
      const err = await readErrorMessage(res);
      setMsg(`enqueue 失敗：${err}`);
    }
    if (res.ok) {
      setTopic('');
      setCustomCategory('');
      setScheduledAt('');
      await loadStatus();
    }
  }

  async function runOne() {
    const res = await fetch('/api/ai-bot/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minChars: Number(minChars) || 0 }),
    });
    if (res.ok) {
      const body = await res.json().catch(() => ({}));
      setMsg(body.message || `已處理 queue ${body.queueId || ''}`);
    } else {
      const err = await readErrorMessage(res);
      setMsg(`run 失敗：${err}`);
    }
    await loadStatus();
  }

  async function retryFailed(id) {
    const res = await fetch('/api/ai-bot/retry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMsg('已重新排入 queue ✅');
    } else {
      const err = await readErrorMessage(res);
      setMsg(`retry 失敗：${err}`);
    }
    await loadStatus();
  }

  async function deletePending(id) {
    const res = await fetch('/api/ai-bot/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMsg('已刪除 pending 項目 ✅');
    } else {
      const err = await readErrorMessage(res);
      setMsg(`刪除失敗：${err}`);
    }

    await loadStatus();
  }

  async function optimizeByReview() {
    const res = await fetch('/api/ai-bot/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: reviewSubmissionId,
        comment: reviewComment,
      }),
    });

    if (res.ok) {
      const body = await res.json().catch(() => ({}));
      setMsg(`已按評論優化內容 ✅ submission=${body?.data?.id || reviewSubmissionId}`);
      setReviewComment('');
    } else {
      const err = await readErrorMessage(res);
      setMsg(`優化失敗：${err}`);
    }
  }

  return (
    <RouteGuard requireLogin>
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
                <Select
                  value={category}
                  onChange={(v) => setCategory(v || 'ai')}
                  data={[
                    { value: 'ai', label: 'AI' },
                    { value: 'tech', label: 'Tech' },
                    { value: 'business', label: 'Business' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'productivity', label: 'Productivity' },
                    { value: 'lifestyle', label: 'Lifestyle' },
                    { value: 'gaming', label: 'Gaming' },
                  ]}
                  label="Category"
                />
                <TextInput label="Custom category (optional)" placeholder="例如：startup / education" value={customCategory} onChange={(e) => setCustomCategory(e.currentTarget.value)} />
                <Select value={tone} onChange={(v) => setTone(v || 'professional')} data={[{ value: 'professional', label: 'Professional' }, { value: 'friendly', label: 'Friendly' }, { value: 'persuasive', label: 'Persuasive' }]} label="Tone" />
                <Select value={length} onChange={(v) => setLength(v || 'medium')} data={[{ value: 'short', label: 'Short' }, { value: 'medium', label: 'Medium' }, { value: 'long', label: 'Long' }]} label="Length" />
              </Group>
              <Group grow>
                <TextInput label="Schedule (optional)" type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.currentTarget.value)} />
                <TextInput label="Min chars threshold" type="number" value={String(minChars)} onChange={(e) => setMinChars(Number(e.currentTarget.value || 0))} />
              </Group>
              <Group>
                <Button onClick={enqueue} disabled={!topic.trim()}>Enqueue</Button>
                <Button variant="light" onClick={runOne}>Run one now</Button>
              </Group>
            </Stack>
          </Card>

          <Card withBorder>
            <Stack>
              <Text size="sm" color="dimmed">Review comment → API regenerate/optimize</Text>
              <Group grow>
                <TextInput label="Submission ID" placeholder="貼上 writer_submissions id" value={reviewSubmissionId} onChange={(e) => setReviewSubmissionId(e.currentTarget.value)} />
                <TextInput label="Review Comment" placeholder="例如：語氣更貼地、加實例、減官腔" value={reviewComment} onChange={(e) => setReviewComment(e.currentTarget.value)} />
              </Group>
              <Group>
                <Button variant="light" onClick={optimizeByReview} disabled={!reviewSubmissionId.trim() || !reviewComment.trim()}>
                  Regenerate / Optimize by Comment
                </Button>
              </Group>
            </Stack>
          </Card>

          <Card withBorder>
            <Text size="sm" color="dimmed" mb="sm">Recent queue items (with logs)</Text>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Status</th>
                  <th>Scheduled</th>
                  <th>Processed</th>
                  <th>Log</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((r) => (
                  <tr key={r.id}>
                    <td>{r.topic}</td>
                    <td>{r.status}</td>
                    <td>{r.scheduled_at ? new Date(r.scheduled_at).toLocaleString() : '-'}</td>
                    <td>{r.processed_at ? new Date(r.processed_at).toLocaleString() : '-'}</td>
                    <td style={{ maxWidth: 260 }}>{r.error_message || '-'}</td>
                    <td>
                      {r.status === 'failed' ? (
                        <Button size="xs" variant="light" onClick={() => retryFailed(r.id)}>
                          Retry
                        </Button>
                      ) : r.status === 'pending' ? (
                        <Button size="xs" color="red" variant="light" onClick={() => deletePending(r.id)}>
                          Delete
                        </Button>
                      ) : r.generated_submission_id ? (
                        <Button size="xs" component="a" href={`/writer/submissions/${r.generated_submission_id}`}>
                          Edit
                        </Button>
                      ) : (
                        '-'
                      )}
                    </td>
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
