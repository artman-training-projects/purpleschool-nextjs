import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

export default class MyDocumnet extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <link href="/favicon.ico" rel="icon" />

          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="true" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
