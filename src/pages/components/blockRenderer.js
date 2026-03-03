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

function buildQuickChartUrl(block) {
  const type = ['pie', 'bar', 'line'].includes(block.chartType) ? block.chartType : 'pie';
  const config = {
    type,
    data: {
      labels: block.labels || [],
      datasets: [{
        label: block.title || 'Dataset',
        data: block.values || [],
      }],
    },
    options: {
      plugins: {
        legend: { display: true },
        title: { display: Boolean(block.title), text: block.title || '' },
      },
    },
  };

  const encoded = encodeURIComponent(JSON.stringify(config));
  return `https://quickchart.io/chart?c=${encoded}`;
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
          const maxW = Number(block.maxWidth) || 760;
          return (
            <div key={block.id} style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt={block.alt || block.caption || 'image'}
                style={{
                  width: '100%',
                  maxWidth: maxW,
                  height: 'auto',
                  borderRadius: 8,
                  display: 'inline-block',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.12)',
                }}
              />
              {block.caption ? <Text size="sm" color="dimmed" mt={6}>{block.caption}</Text> : null}
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

        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag key={block.id} style={{ paddingLeft: 20, margin: 0 }}>
              {(block.items || []).map((item, i) => (
                <li key={`${block.id}-${i}`}>
                  <Text component="span">{item}</Text>
                </li>
              ))}
            </Tag>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={block.id} style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {(block.headers || []).map((h, i) => (
                      <th key={`${block.id}-h-${i}`} style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(block.rows || []).map((row, r) => (
                    <tr key={`${block.id}-r-${r}`}>
                      {row.map((cell, c) => (
                        <td key={`${block.id}-c-${r}-${c}`} style={{ border: '1px solid #ddd', padding: 8 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'chart') {
          const chartUrl = buildQuickChartUrl(block);
          return (
            <div key={block.id} style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={chartUrl} alt={block.title || 'chart'} style={{ width: '100%', maxWidth: 760, borderRadius: 8, display: 'inline-block' }} />
            </div>
          );
        }

        return <Text key={block.id} style={{ whiteSpace: 'pre-wrap' }}>{block.text}</Text>;
      })}
    </Stack>
  );
}
