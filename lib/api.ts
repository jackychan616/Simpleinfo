import { readdirSync } from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), '_posts');

export const getPostSlugs = () => readdirSync(postsDirectory);

export const getPostBySlug = (slug: string, fields: string[] = []) => {};
