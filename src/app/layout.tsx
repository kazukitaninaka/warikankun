import Layout from '@components/Layout';
import Providers from '@components/Providers';

const title = '割り勘くん';
const description = 'LINEでカンタンに割り勘できるアプリ。';

export const metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? 'https://warikankun.vercel.app'
      : 'http://localhost:3000',
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
