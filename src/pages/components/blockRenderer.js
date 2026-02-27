import { Anchor, Code, Stack, Text, Title } from '@mantine/core';
import hljs from 'highlight.js';

function highlight(code, language) {
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value;
    }
    return hljs.highlightAuto(code).value;
  } catch (e) {
    return code;
  }
}

export default function BlockRenderer({ blocks = [] }) {
  return (
    <Stack spacing="sm">
      {blocks.map((block) => {
        if (block.type === 'heading') {
          const order = Math.min(Math.max(Number(block.level) || 2, 1), 6);
          return <Title key={block.id} order={order}>{block.text}</Title>;
        }

        if (block.type === 'image') {
          return (
            <div key={block.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.src} alt={block.alt || block.caption || 'image'} style={{ maxWidth: '100%', borderRadius: 8 }} />
              {block.caption ? <Text size="sm" color="dimmed">{block.caption}</Text> : null}
            </div>
          );
        }

        if (block.type === 'link') {
          return <Anchor key={block.id} href={block.href} target="_blank" rel="noreferrer">{block.text || block.href}</Anchor>;
        }

        if (block.type === 'code') {
          return (
            <Code key={block.id} block style={{ whiteSpace: 'pre-wrap', background: '#111827', color: '#e5e7eb' }}>
              <div dangerouslySetInnerHTML={{ __html: highlight(block.code, block.language) }} />
            </Code>
          );
        }

        if (block.type === 'embed') {
          return (
            <Text key={block.id} size="sm" color="dimmed">
              [Embed/{block.provider || 'youtube'}] {block.url}
            </Text>
          );
        }

        return <Text key={block.id} style={{ whiteSpace: 'pre-wrap' }}>{block.text}</Text>;
      })}
    </Stack>
  );
}
