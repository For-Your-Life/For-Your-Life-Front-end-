/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  const API_URL = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  return (
    <Html>
      <Head>
        <script
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_URL}&libraries=services,clusterer,drawing`}
        />

        {/* <script type="text/javascript" src="test.js"></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
