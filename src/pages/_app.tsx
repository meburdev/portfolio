import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layouts/MainLayout"; // adjust path / default vs named
import { appWithTranslation } from "next-i18next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout font={`${inter.variable}`}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default appWithTranslation(MyApp);
