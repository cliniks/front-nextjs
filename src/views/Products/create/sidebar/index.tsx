import { Suspense, lazy, useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Switch,
  Divider,
  Grid,
  CardHeader,
  Card,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { ProductDialog } from "src/components/Dialogs/ProductDialog";
import { ProductType } from "src/models/product";
import SuspenseLoader from "src/components/SuspenseLoader";
import { ImageBox } from "./Images";
import { useSellerProducts } from "src/contexts/SellerProductsContext";
import { CategoriesBox } from "./Categories";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SingleProduct = Loader(
  lazy(() => import("src/components/Dashboard/Products/single"))
);

function Sidebar() {
  const { getCategories, product, submitValues, updateProductState } =
    useSellerProducts();
  const { t }: { t: any } = useTranslation();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box>
      <Card
        sx={{
          m: 2,
        }}
      >
        <CardHeader title={t("Publish")} />
        <Divider />
        <Grid
          container
          p={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  onChange={updateProductState}
                  checked={product.isActive}
                />
              }
              label={t("Active Product")}
            />
          </Grid>
        </Grid>
        <Divider />

        <Box p={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <ProductDialog
                data={product}
                review={false}
                Component={<SingleProduct productProp={product} />}
              >
                <Button fullWidth variant="outlined" size="small">
                  {t("Preview")}
                </Button>
              </ProductDialog>
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={() => submitValues()}
                fullWidth
                variant="contained"
              >
                {t("Publish now")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <CategoriesBox />
      <ImageBox />
    </Box>
  );
}

export default Sidebar;
