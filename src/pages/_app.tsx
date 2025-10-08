import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from '@/layouts/MainLayout'; // adjust path / default vs named
import { appWithTranslation } from 'next-i18next'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default appWithTranslation(MyApp);