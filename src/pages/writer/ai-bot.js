import { Badge, Button, Card, Container, Group, ScrollArea, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import RouteGuard from '../components/routeGuard';
import { getAccessToken, getSupabaseBrowser } from '../../lib/supabaseBrowser';

export default function AiBotDashboardPage() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('ai');
  const [customCategory, setCustomCategory] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [scheduledAt, setScheduledAt] = useState('');
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

  async function reviewSubmission(id, status) {
    const token = await getAccessToken();
    if (!token) {
      setMsg('請先登入 admin 帳號');
      return;
    }

    const res = await fetch(`/api/writer/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setMsg(`已更新為 ${status} ✅`);
    } else {
      const err = await readErrorMessage(res);
      setMsg(`更新失敗：${err}`);
    }

    await loadStatus();
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
              </Group>
              <Group>
                <Button onClick={enqueue} disabled={!topic.trim()}>Enqueue</Button>
                <Button variant="light" disabled>Run one now (use local worker)</Button>
              </Group>
              <Text size="xs" color="dimmed">為避免 Cloudflare 504，請用本機 worker：<code>npm run ai:bot:loop -- --interval 15000</code></Text>
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
                <Button variant="light" disabled>
                  Regenerate / Optimize by Comment (use local command)
                </Button>
              </Group>
              <Text size="xs" color="dimmed">本機執行：<code>npm run ai:bot:optimize -- --submissionId {'<id>'} --comment &quot;語氣更貼地，加入實例&quot;</code></Text>
            </Stack>
          </Card>

          <Card withBorder>
            <Text size="sm" color="dimmed" mb="sm">Recent queue items (with logs)</Text>
            <ScrollArea>
              <Table striped highlightOnHover miw={980}>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Status</th>
                    <th>Submission ID</th>
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
                      <td>
                        {r.generated_submission_id ? (
                          <Stack spacing={4}>
                            <Text size="xs">{r.generated_submission_id}</Text>
                            <Button
                              size="xs"
                              variant="subtle"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(r.generated_submission_id);
                                  setReviewSubmissionId(r.generated_submission_id);
                                  setMsg('已複製 submission id 並填入 optimize 欄位 ✅');
                                } catch {
                                  setMsg('複製失敗，請手動複製 submission id');
                                }
                              }}
                            >
                              Copy ID
                            </Button>
                          </Stack>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{r.scheduled_at ? new Date(r.scheduled_at).toLocaleString() : '-'}</td>
                      <td>{r.processed_at ? new Date(r.processed_at).toLocaleString() : '-'}</td>
                      <td style={{ maxWidth: 260 }}>{r.error_message || '-'}</td>
                      <td>
                        <Stack spacing={6}>
                          {r.generated_submission_id ? (
                            <Button size="xs" component="a" href={`/writer/submissions/${r.generated_submission_id}`}>
                              View/Edit
                            </Button>
                          ) : null}
                          {r.generated_submission_id ? (
                            <Button size="xs" color="green" variant="light" onClick={() => reviewSubmission(r.generated_submission_id, 'approved')}>
                              Approve
                            </Button>
                          ) : null}
                          {r.generated_submission_id ? (
                            <Button size="xs" color="red" variant="light" onClick={() => reviewSubmission(r.generated_submission_id, 'rejected')}>
                              Reject
                            </Button>
                          ) : null}
                          {r.status === 'failed' ? (
                            <Button size="xs" variant="light" onClick={() => retryFailed(r.id)}>
                              Retry
                            </Button>
                          ) : null}
                          {r.status === 'pending' ? (
                            <Button size="xs" color="red" variant="light" onClick={() => deletePending(r.id)}>
                              Delete
                            </Button>
                          ) : null}
                          {!r.generated_submission_id && r.status !== 'failed' && r.status !== 'pending' ? '-': null}
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>

          {msg ? <Text size="sm">{msg}</Text> : null}
        </Stack>
      </Container>
    </RouteGuard>
  );
}
