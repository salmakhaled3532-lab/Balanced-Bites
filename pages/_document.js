import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans bg-white text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
