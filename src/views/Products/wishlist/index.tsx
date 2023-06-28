import { useState, useEffect } from "react";

import PageHeader from "./PageHeader";
import PageTitleWrapper from "@core/components/PageTitleWrapper";

import { Grid } from "@mui/material";

import Results from "./Results";
import { Footer } from "@core/components/Footer/BloomFooter";

import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";
import { sdk } from "@core/sdkProvider";
import Head from "next/head";

function ManagementProducts() {
  const [products, setProducts] = useState([]);
  const { t }: L = useTranslation();

  const getSellerProducts = () =>
    sdk.Seller.dashboard.product.getMyProducts(
      {
        filter: {
          fields: "name",
        },
      },
      (res) => {
        setProducts(res.result);
        console.log("listProducts", res);
      }
    );

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <>
      <Head>
        <title>{t("Purchase")}</title>
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
          <Results products={products} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementProducts;
