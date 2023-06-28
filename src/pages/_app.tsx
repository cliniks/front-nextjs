import { ContextInjectionProvider } from "@core/contexts/ContextInjection";
import { HomeLayout } from "@/layouts/home";
import themeConfig from "@core/configs/themeConfig";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/sass/principal.scss";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/bundle";
import Guard from "@core/guard";
import {
  ApiUrl,
  Bearer,
  updateBaseUrl,
  updateHeaders,
} from "@/services/axiosInstance";

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;

  const guestGuard = Component.guestGuard ?? false;

  const authGuard = Component.authGuard ?? false;

  const userAccess = Component.userAccess ?? 0;

  const setConfig = Component.setConfig ?? undefined;

  const getLayout =
    Component.getLayout ?? ((page) => <HomeLayout>{page}</HomeLayout>);

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name="description" content={`${themeConfig.templateName}`} />
        <meta
          name="keywords"
          content="cliniks, marketplace, e-commerce, clinicas, clinica, saude"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main>
        <ContextInjectionProvider>
          <Guard authGuard={authGuard} userAccess={userAccess}>
            {getLayout(<Component {...pageProps} />)}
          </Guard>
        </ContextInjectionProvider>
      </main>
    </>
  );
}

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};
