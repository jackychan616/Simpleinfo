import Head from 'next/head';

import Layout from '#/layout';
import { PostType } from 'interfaces/post';
import { getAllPosts, getPostByName, markdownToHtml } from 'lib/api';

export interface Props {
  post: PostType;
  html: string;
}

export default function Post({ html: __html, post }: Props) {
  // date?: string;
  // author?: string;
  return (
    <Layout>
      <article>
        <Head>
          <title>{post.title} | Simple Info</title>
          <meta name="description" content={post.description} />
          <meta name="author" content={post.author} />
          <meta http-equiv="last-modified" content={post.date} />
        </Head>
        <div dangerouslySetInnerHTML={{ __html }}></div>
      </article>
    </Layout>
  );
}

export const getStaticProps = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<{ props: Props }> => {
  const post = getPostByName(id);

  return { props: { post, html: await markdownToHtml(post.content || '') } };
};

export const getStaticPaths = () => {
  return {
    paths: getAllPosts().map(({ name }) => ({ params: { id: name } })),
    fallback: false,
  };
};
