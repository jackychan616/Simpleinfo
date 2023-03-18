import { readFileSync, readdirSync, statSync } from 'fs';
import { PostType } from 'interfaces/post';
import path from 'path';

import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHTML from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

const walkSync = (dir: string, ...r: string[]) => {
  const list: string[] = [];

  const rDir = path.join(dir, ...r);

  readdirSync(rDir).forEach((file) => {
    if (statSync(path.join(rDir, file)).isFile()) {
      list.push(path.join(...r, file));
    } else list.push(...walkSync(dir, file));
  });

  return list;
};

export const getPostSlugs = () => walkSync(postsDirectory);

export const getPostByName = (name: string): PostType => {
  name = name.replace(/\.md$/, '');

  const { data, content } = matter(
    readFileSync(path.join(postsDirectory, `${name}.md`))
  );

  return {
    ...data,
    content,
    name,
  };
};

export const getAllPosts = () => {
  const posts = getPostSlugs();

  console.log(posts);

  return posts
    .map((slug) => getPostByName(slug))
    .sort((a, b) => ((a?.date || 0) > (b?.date || 0) ? -1 : 1));
};

export const markdownToHtml = (markdown: string) => {
  return remark()
    .use(remarkHTML)
    .process(markdown)
    .then((d) => d.toString());
};
