import { Button, Card, Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

function likelyAuthError(error) {
  const msg = String(error?.message || '').toLowerCase();
  return msg.includes('auth') || msg.includes('session') || msg.includes('jwt') || msg.includes('token');
}

export default class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isAuth: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, isAuth: likelyAuthError(error) };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('AuthErrorBoundary caught:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Container size="sm" py="xl">
        <Card withBorder>
          <Stack>
            <Title order={3}>{this.state.isAuth ? '登入狀態錯誤' : '頁面發生錯誤'}</Title>
            <Text color="dimmed">
              {this.state.isAuth
                ? '你的登入可能已失效，請重新登入後再試。'
                : '系統遇到非預期錯誤，你可以先重新整理，或返回登入頁。'}
            </Text>
            <Button component={Link} href="/login">前往登入</Button>
          </Stack>
        </Card>
      </Container>
    );
  }
}
