import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
// import Text from "src/components/Text";

import { useTranslation } from "react-i18next";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { ProductDialog } from "@core/components/Dialogs/ProductDialog";
import { useCart } from "@core/contexts/CartContext";
import { Add, Remove } from "@mui/icons-material";
import { formatReal } from "@core/utils/functions";
import { toast } from "react-toastify";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@core/hooks/contexstHooks";
import { useProducts } from "@core/contexts/productsContext";

const CardProduct = ({ product }: { product: any }) => {
  const { t }: { t: any } = useTranslation();
  const { user } = useUser();
  const { product: Product, handleFavoriteProduct } = useProducts();
  const { incrementProduct, decrementProduct, cart, setOpen } = useCart();

  const theme = useTheme();

  const ref = useRef<any>(null);

  const [favorite, setFavorite] = useState(false);

  const favoriteProduct = (id) => {
    handleFavoriteProduct(id);

    if (favorite === false) {
      setFavorite(true);
    }
    if (favorite === true) {
      setFavorite(false);
    }
  };
  useEffect(() => {
    if (product?.statistics?.favorites?.includes(user?._id)) {
      setFavorite(true);
    }
  }, []);
  if (!product) return <CircularProgress />;

  const prod = product || Product;

  const verifyProduct = cart.products.find((item) => item?._id === prod._id);

  return (
    <Grid p={2} item xs={12} sm={12} md={4} lg={4} xl={4}>
      <Card
        sx={{
          height: 490,
          maxHeight: 600,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <AvatarWrapper
          p={0.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ProductDialog data={prod}>
            <Avatar src={prod.imgs[0]} variant="rounded" />
          </ProductDialog>
        </AvatarWrapper>
        <Box textAlign="center" px={2}>
          <Typography
            variant="h3"
            sx={{ fontSize: "20px", textTransform: "uppercase" }}
          >
            {prod.name?.length <= 20
              ? prod.name
              : prod.name.substr(0, 20) + "..."}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: prod.description.substring(0, 40) + "...",
              }}
            />
          </Typography>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: "10px",
                textTransform: "uppercase",
              }}
            >
              {prod.categories.map((category) =>
                category === "" || category === "undefined"
                  ? ""
                  : category.split("/")[1] + " "
              )}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: "auto" }}>
          {user ? (
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box display="flex" justifyContent="center">
                <Box>
                  {prod.regularPrice && +prod.regularPrice > +prod.price ? (
                    <Typography
                      component="span"
                      variant={+prod.regularPrice > +prod.price ? "h4" : "h3"}
                      sx={{
                        pr: 2,
                        textDecorationLine:
                          +prod.regularPrice > +prod.price
                            ? "line-through"
                            : "",

                        fontSize: "12px",
                      }}
                    >
                      {formatReal(prod.regularPrice)}
                    </Typography>
                  ) : null}
                  {prod.price && (
                    <Typography
                      component="span"
                      variant="h3"
                      sx={{ fontSize: "22px" }}
                    >
                      {/* <Text
                        color={
                          +prod.regularPrice > +prod.price ? "success" : "black"
                        }
                      >
                        {formatReal(prod.price)}
                      </Text> */}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box pb={1} display="flex" justifyContent="center">
                {verifyProduct ? (
                  <Grid
                    container
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button onClick={() => decrementProduct(prod._id)}>
                      <Remove fontSize="small" />
                    </Button>
                    <Box p={2}>{verifyProduct.amount}</Box>
                    <Button
                      onClick={() => {
                        if (prod.stockInfo.qnt === 1) {
                          toast("Produto não esta disponivel", {
                            type: "error",
                          });
                          return;
                        }
                        setOpen(true);
                        incrementProduct(prod._id);
                      }}
                    >
                      <Add fontSize="small" />
                    </Button>
                  </Grid>
                ) : (
                  <Button
                    ref={ref}
                    variant="outlined"
                    onClick={() => {
                      if (prod.stockInfo.qnt === 0) {
                        toast("Produto não esta disponivel", {
                          type: "error",
                        });
                        return;
                      }
                      setOpen(true);
                      incrementProduct(prod._id);
                    }}
                  >
                    {t("Add to cart")}
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Button fullWidth component={Link} href="/login">
              Cadastrese ou faça login para ver o preço
            </Button>
          )}

          <Divider />
          <Box
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButtonError
              onClick={() => favoriteProduct(prod._id)}
              size="small"
            >
              <FavoriteTwoToneIcon
                color={favorite ? "error" : "disabled"}
                fontSize="small"
              />
            </IconButtonError>
            <Typography variant="subtitle2">
              {t("In Stock")}:{" "}
              <Typography component="span" color="text.primary" variant="h4">
                {prod.stockInfo.qnt}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default CardProduct;

const AvatarWrapper = styled(Box)(
  () => `
  .MuiAvatar-root {
    height: auto;
    width: 10rem;

    &:hover {
      opacity: .8;
    }
  }
`
);
const IconButtonError = styled(IconButton)(
  () => `
   color: red;

   &:hover {
    background: white;
  }
`
);
