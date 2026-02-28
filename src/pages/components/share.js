import { Button, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconBrandFacebook, IconCheck, IconCopy, IconShare } from '@tabler/icons-react';
import { buildCanonicalUrl } from '../../lib/seo';

export function Sharebutton({ url }) {
  const shareUrl = buildCanonicalUrl(url || '/');

  return (
    <Menu shadow="md" width={200} position="right-end">
      <Menu.Target>
        <Button leftIcon={<IconShare size={16} />} compact variant="outline">分享</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component="button"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            showNotification({
              message: 'Copied',
              icon: <IconCheck size={16} />,
            });
          }}
          icon={<IconCopy size={16} />}
        >
          複製鏈結
        </Menu.Item>
        <Menu.Item
          icon={<IconBrandFacebook size={16} />}
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
        >
          分享至facebook
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default function SharePagePlaceholder() {
  return null;
}
