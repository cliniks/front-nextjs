import { useState, useEffect } from "react";

import PageHeader from "./PageHeader";
import Sidebar from "./Sidebar";
import { styled, Box, Grid, IconButton, Drawer, useTheme } from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import type { ProductType } from "@core/types/product";
import Results from "./Results";
import Scrollbar from "@core/components/Scrollbar";
import HeaderProduct from "./HeaderProduct";
import { sdk } from "@core/sdkProvider";
import { getAllProps } from "ecommersys/dist/interfaces";
import { Store } from "ecommersys/dist/Entities";
import { useUser } from "@core/contexts/UserContext";
import { useRouter } from "next/router";
import Head from "next/head";

function ProductsShop() {
  const theme = useTheme();

  const { id } = useRouter().query;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [products, setProducts] = useState<ProductType[]>([]);
  const [store, setStore] = useState<Store>();
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState<searchType>({
    search: {
      page: 0,
      size: 200,
      filter: {
        key: "owner",
        value: id,
        fields: "",
      },
    },
    totalItems: 0,
  });

  const getProducts = (props?: productSearchValues) => {
    setLoading(true);
    const prepareQuery = {
      key: `owner ${verifyValue(props?.minPrice, "minPrice")}${verifyValue(
        props?.maxPrice,
        "maxPrice"
      )}${verifyCategory(props?.categories).keys}`,
      value: `${id} ${verifyValue(props?.minPrice)}${verifyValue(
        props?.maxPrice
      )}${verifyCategory(props?.categories).value}`,
    };
    if (id === user?.storeId || !id) {
      sdk.Seller.dashboard.product.getMyProducts(
        { ...searchParams.search, filter: prepareQuery },
        (res) => {
          setProducts(res.result);
          setLoading(false);
        }
      );
    } else {
      sdk.Global.getAllProducts(
        { ...searchParams.search, filter: prepareQuery },
        (res) => {
          setProducts(res.result);
          setLoading(false);
        }
      );
    }
  };

  const getSellerCategories = () => {
    sdk.Global.getAllGlobalCategories(
      {
        page: searchParams.search.page,
        size: searchParams.search.size,
        filter: {
          fields: searchParams.search.filter.fields,
        },
      },
      (res) => {
        setCategories(res.result);
      },
      (err) => console.log(err)
    );
  };

  const getStore = () => {
    if (id === user?.storeId || !id) {
      sdk.Seller.store.getMyStore((res) => setStore(res));
    } else {
      sdk.Global.getAllSellers(
        { page: 0, size: 10, filter: { key: "_id", value: id } },
        (res: any) => {
          setStore(res.result[0]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    getSellerCategories();
    // getProducts();
    getStore();
  }, [id]);

  return (
    <>
      <Head>
        <title>{store?.name || "Loja"}</title>
      </Head>

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
        <Grid display="flex" alignItems="center" item xs={12}>
          <IconButtonToggle
            sx={{
              mr: 1,
              display: { md: "none", xs: "flex" },
            }}
            color="primary"
            onClick={handleDrawerToggle}
            size="small"
          >
            <MenuTwoToneIcon />
          </IconButtonToggle>
          <Box flex={1} mt={2}>
            <PageHeader store={store} />
          </Box>
        </Grid>
        <Grid display="flex" alignItems="center" item xs={12}>
          <Box flex={1} mt={-3}>
            <HeaderProduct store={store} setStore={setStore} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Sidebar
            subCategories={subCategories}
            categories={categories}
            setLoading={setLoading}
            getProducts={getProducts}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          {products && (
            <Results
              products={products}
              loading={loading}
              searchParams={searchParams}
              setLoading={setLoading}
              setProducts={setProducts}
            />
          )}
        </Grid>
      </Grid>
      <DrawerWrapperMobile
        sx={{
          display: { md: "none", xs: "flex" },
        }}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Scrollbar>
          <Sidebar
            subCategories={subCategories}
            categories={categories}
            setLoading={setLoading}
            getProducts={getProducts}
          />
        </Scrollbar>
      </DrawerWrapperMobile>
      {/* <Footer /> */}
    </>
  );
}

export default ProductsShop;

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

export type searchType = { search: getAllProps; totalItems: number };

export type productSearchValues = {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  evaluations?: number;
};

const verifyCategory = (array) => {
  if (array?.length > 0) {
    let keys = "";
    let value = "";
    array.map((item) => {
      keys = keys + "categories" + " ";
      value = value + item + " ";
    });
    return { keys, value };
  }
  return { keys: "", value: "" };
};
const verifyValue = (value: any, res?: string) =>
  value === undefined ? "" : `${res ? res : value} `;
