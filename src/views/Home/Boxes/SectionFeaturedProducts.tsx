import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { imgs } from "@core/assets/imgs";
import { getAllProps } from "ecommersys/dist/interfaces";
import { useSDK } from "@core/contexts/sdkContext";
import CardProduct from "@core/components/Cards/ProductCard";

const SectionFeaturedProducts = (props: BoxProps) => {
  const { connected, Global } = useSDK();
  const [products, setProducts] = useState([]);
  const [reqConfig, setReqConfig] = useState<getAllProps>({
    page: 0,
    size: 200,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });

  const getProducts = () =>
    Global.getAllProducts(reqConfig, (res) => {
      setProducts(res.result);
    });

  useEffect(() => {
    if (connected) {
      getProducts();
    }
  }, [connected]);

  const productsFiltered = products
    .filter((item) => item.imgs?.length > 0)
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
    .filter((_, index) => index < 9);

  return (
    <section {...props}>
      <Box className="titleBox">
        <img src={imgs.dots.src} alt="dots" />

        <Typography variant="h1">
          Produtos em <b>Destaque</b>
        </Typography>
      </Box>
      <Grid sx={{ width: "100%" }} container>
        {/* {productsFiltered?.map((item: any, key: number) => {
          return (
            <CardProduct key={item._id || "product" + key} product={item} />
          );
        })} */}
      </Grid>
    </section>
  );
};

type BoxProps = {
  className: string;
};

SectionFeaturedProducts.defaultProps = {
  className: "home_box6",
};

export { SectionFeaturedProducts };
