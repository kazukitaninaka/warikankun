import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  const title = '割り勘くん';
  const description = 'LINEでカンタンに割り勘ができるアプリ。';
  return (
    <Html lang="ja-JP">
      <Head>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/public/warikankun-logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
