import { useState, useEffect } from "react";

import PageTitleWrapper from "@core/components/PageTitleWrapper";

import { Grid } from "@mui/material";
import { Footer } from "@core/components/Footer/BloomFooter";
import PageHeader from "./PageHeader";
import ProductBody from "./ProductBody";
import { useProducts } from "@core/contexts/productsContext";
import { useUser } from "@core/contexts/UserContext";
import { api } from "@/services/axiosInstance";
import { getAllProps } from "ecommersys/dist/interfaces";
import Head from "next/head";
import { useRouter } from "next/router";
import { Policy } from "@core/types/policy";

function ManagementProductSingle({ productProp, closeBtn, review = true }) {
  const { product, getSingleProduct, setProduct } = useProducts();

  const { id } = useRouter().query;
  const { user } = useUser();
  const [policy, setPolicy] = useState<Policy[]>();
  const [query, setQuery] = useState<getAllProps>({
    filter: { fields: "", key: "", value: "" },
    page: 0,
    size: 10,
  });
  const getStore = async () => {
    const queryParam = {
      ...query,
      filter: {
        key: "owner",
        value: product?.owner,
      },
    };
    console.log(api.defaults.url);
    const response = await api.get("/sellers/policies/all", {
      params: queryParam,
    });
    setPolicy(response.data.result);
  };

  useEffect(() => {
    if (productProp) {
      setProduct(productProp);
    } else {
      if (id) {
        getSingleProduct({ key: "_id", value: id as string });
      }
    }
    getStore();
  }, [productProp]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          product={product}
          productProp={productProp}
          closeBtn={closeBtn}
        />
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
          <ProductBody product={product} review={review} policy={policy} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementProductSingle;
