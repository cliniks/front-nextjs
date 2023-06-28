import { useEffect } from "react";

import PageHeader from "./PageHeader";
import PageTitleWrapper from "@core/components/PageTitleWrapper";

import { Grid } from "@mui/material";

import Results from "./Results";
import { Footer } from "@core/components/Footer/BloomFooter";

import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";
import { useSellerProducts } from "@core/contexts/SellerProductsContext";
import { cp } from "fs";
import Head from "next/head";
import { useRouter } from "next/router";

function ManagementProducts() {
  const { t }: L = useTranslation();
  const { getSellerProducts, query } = useSellerProducts();

  const { query: params } = useRouter();

  useEffect(() => {
    getSellerProducts(query, +params.id);
  }, []);

  return (
    <>
      <Head>
        <title>{t("Products - Management")}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementProducts;
