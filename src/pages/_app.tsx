import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layouts/MainLayout"; // adjust path / default vs named
import { appWithTranslation } from "next-i18next";
import { Inter, Philosopher } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"], // Asegúrate de cargar los pesos que usarás
  variable: "--font-philosopher",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout font={`${inter.variable} ${philosopher.variable} font-arial`}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default appWithTranslation(MyApp);
