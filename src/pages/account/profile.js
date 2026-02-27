import { Button, Card, Container, Stack, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabaseBrowser';

function calcAge(birthday) {
  if (!birthday) return null;
  const d = new Date(birthday);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

export default function AccountProfilePage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [msg, setMsg] = useState('');

  const age = useMemo(() => calcAge(birthday), [birthday]);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      setUser(u || null);
      if (!u) return;

      const res = await fetch('/api/account/profile', {
        headers: {
          'x-user-id': u.id,
          'x-user-email': u.email || '',
        },
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body?.data) {
        setUsername(body.data.username || '');
        setBirthday(body.data.birthday || '');
      }
    });
  }, []);

  async function save() {
    if (!user) return setMsg('請先登入');
    const res = await fetch('/api/account/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
        'x-user-email': user.email || '',
      },
      body: JSON.stringify({ username, birthday }),
    });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? 'Profile 已更新 ✅' : `更新失敗：${body?.error || 'unknown error'}`);
  }

  return (
    <Container size="sm" py={48}>
      <Card withBorder shadow="sm" radius="md" p="lg">
        <Stack spacing="md">
          <Title order={2}>個人資料</Title>
          <Text color="dimmed" size="sm">可設定 username、生日，年齡會自動計算。</Text>
          <Text size="sm">登入帳號：{user?.email || '未登入'}</Text>

          <TextInput label="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          <TextInput label="Birthday" type="date" value={birthday} onChange={(e) => setBirthday(e.currentTarget.value)} />
          <Text size="sm">Age：{age ?? '-'}</Text>

          <Button onClick={save}>儲存</Button>
          {msg ? <Text size="sm" color={msg.includes('失敗') ? 'red' : 'teal'}>{msg}</Text> : null}
        </Stack>
      </Card>
    </Container>
  );
}
