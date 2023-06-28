import { FC, useState, ChangeEvent, useEffect } from "react";

import Text from "@core/components/Text";

import {
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  Button,
  Card,
  styled,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ChevronLeftTwoToneIcon from "@mui/icons-material/ChevronLeftTwoTone";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import AdditionalInfoTab from "./AdditionalInfoTab";
import { Product } from "ecommersys/dist/Entities";
import { Add, Remove } from "@mui/icons-material";
import { useCart } from "@core/contexts/CartContext";
import { formatReal } from "@core/utils/functions";
import { useUser } from "@core/contexts/UserContext";
import { Policy } from "@core/types/policy";
import PoliciesTab from "./PoliciesTab";
import { useSellerPolicy } from "@core/contexts/SellerPolicyContext";
import Link from "next/link";

const ProductBody: FC<ProductBodyProps> = ({ product, review, policy }) => {
  const { t }: { t: any } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const theme = useTheme();
  const { incrementProduct, decrementProduct, cart, setOpen } = useCart();
  const { user } = useUser();
  const { policys, getOwnerPolicy } = useSellerPolicy();

  const verifyProduct = cart.products.find((item) => item?._id === product._id);

  const [currentTab, setCurrentTab] = useState<string>("additional_info");

  const tabs = [
    // { value: "reviews", label: t("Reviews") },
    { value: "additional_info", label: t("Additional Informations") },
    { value: "policies", label: t("Policies") },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  useEffect(() => {
    getOwnerPolicy(product.owner);
    // getSellerPolicies();
  }, []);

  if (!product) return;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item xs={12}>
        <Card>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              md={5}
              item
              sx={{
                position: "relative",
              }}
            >
              <Box
                component="span"
                sx={{
                  display: { xs: "none", md: "inline-block" },
                }}
              >
                <Divider
                  absolute
                  sx={{
                    height: "100%",
                    left: "auto",
                    right: 0,
                  }}
                  orientation="vertical"
                  flexItem
                />
              </Box>
              <Box p={4}>
                <SwiperWrapper>
                  <Box
                    mb={3}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Swiper
                      autoHeight
                      spaceBetween={2}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      navigation={{
                        nextEl: ".MuiSwipe-right",
                        prevEl: ".MuiSwipe-left",
                      }}
                    >
                      {product?.imgs?.map((value, index) => {
                        return (
                          <SwiperSlide key={value + "index"}>
                            <img
                              style={{
                                maxHeight: "350px",
                                maxWidth: "500px",
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                              src={value}
                              alt="..."
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <SwipeIndicator className="MuiSwipe-root MuiSwipe-left">
                      <ChevronLeftTwoToneIcon />
                    </SwipeIndicator>
                    <SwipeIndicator className="MuiSwipe-root MuiSwipe-right">
                      <ChevronRightTwoToneIcon />
                    </SwipeIndicator>
                  </Box>

                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    navigation={{
                      nextEl: ".MuiSwipe-right",
                      prevEl: ".MuiSwipe-left",
                    }}
                    breakpoints={{
                      500: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                    }}
                    // @ts-ignore
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                  >
                    {product.imgs?.map((value) => {
                      return (
                        <SwiperSlide key={value}>
                          <img src={value} alt="..." />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </SwiperWrapper>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box p={4} flex={1}>
                {/* <Rating
                  readOnly
                  defaultValue={product.statistics?.likes || 0}
                  precision={0.5}
                /> */}
                <Typography
                  variant="h3"
                  sx={{
                    pb: 2,
                    pt: 1,
                  }}
                  component="h3"
                >
                  {product.name}
                </Typography>
                <Typography variant="subtitle2">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </Typography>
                <Divider
                  sx={{
                    mt: 3,
                  }}
                />
                <Box
                  pt={3}
                  pb={1}
                  sx={{
                    px: { xs: 0, md: 3 },
                  }}
                >
                  <Grid container spacing={0}>
                    {/* <Grid item xs={12} sm={4} justifyContent="flex-end">
                      <Box
                        pr={3}
                        sx={{
                          pt: `${theme.spacing(1)}`,
                          pb: { xs: 1, md: 0 },
                        }}
                        alignSelf="center"
                      >
                        <b>{t("Option 1")}:</b>
                      </Box>
                    </Grid>
                    <Grid
                      sx={{
                        mb: `${theme.spacing(2)}`,
                      }}
                      item
                      xs={12}
                      sm={8}
                      md={6}
                    >
                      <FormControl
                        placeholder={t("Select ...")}
                        size="small"
                        fullWidth
                        variant="outlined"
                      >
                        <Select value={option1} onChange={handleChange1}>
                          <MenuItem value={10}>{t("Option")} 1</MenuItem>
                          <MenuItem value={20}>{t("Option")} 2</MenuItem>
                          <MenuItem value={30}>{t("Option")} 3</MenuItem>
                          <MenuItem value={30}>{t("Option")} 4</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} justifyContent="flex-end">
                      <Box
                        pr={3}
                        sx={{
                          pt: `${theme.spacing(1)}`,
                          pb: { xs: 1, md: 0 },
                        }}
                        alignSelf="center"
                      >
                        <b>{t("Option 2")}:</b>
                      </Box>
                    </Grid>
                    <Grid
                      sx={{
                        mb: `${theme.spacing(2)}`,
                      }}
                      item
                      xs={12}
                      sm={8}
                      md={6}
                    >
                      <FormControl
                        placeholder={t("Select ...")}
                        size="small"
                        fullWidth
                        variant="outlined"
                      >
                        <Select value={option2} onChange={handleChange2}>
                          <MenuItem value={10}>{t("Option")} 1</MenuItem>
                          <MenuItem value={20}>{t("Option")} 2</MenuItem>
                          <MenuItem value={30}>{t("Option")} 3</MenuItem>
                          <MenuItem value={30}>{t("Option")} 4</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={4} justifyContent="flex-end">
                      <Box
                        pr={3}
                        sx={{
                          pt: `${theme.spacing(1)}`,
                          pb: { xs: 1, md: 0 },
                        }}
                        alignSelf="center"
                      >
                        <b>{t("Quantity")}:</b>
                      </Box>
                    </Grid> */}
                    {/* <Grid
                      sx={{
                        mb: `${theme.spacing(2)}`,
                      }}
                      item
                      xs={12}
                      sm={5}
                      md={5}
                    >
                      <FormControl
                        fullWidth
                        variant="outlined"
                        style={{ display: "flex" }}
                      >
                        <TextField
                          type="number"
                          size="small"
                          value={amount}
                          onChange={(e) => setAmount(+e.target.value)}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            min: 0,
                            max: product.stockInfo.qnt,
                            defaultValue: 0,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {amount > 0 ? (
                          <Button
                            onClick={() => {
                              const possibleAmount = Math.abs(
                                +amount - +(verifyProduct?.amount || 0)
                              );
                              if (possibleAmount <= product.stockInfo.qnt) {
                                incrementProduct(product._id, possibleAmount);
                              }
                            }}
                          >
                            Adicionar
                          </Button>
                        ) : null}
                      </FormControl>
                    </Grid> */}
                  </Grid>
                </Box>

                <Grid container>
                  {user ? (
                    <>
                      <Grid item md={6} xs={12}>
                        <Typography
                          component="div"
                          variant="caption"
                          gutterBottom
                        >
                          {t("Price")}
                        </Typography>

                        {product.regularPrice &&
                        +product.regularPrice > +product.price ? (
                          <Typography
                            component="span"
                            variant={
                              +product.regularPrice > +product.price
                                ? "h4"
                                : "h3"
                            }
                            sx={{
                              pr: 2,
                              textDecorationLine:
                                +product.regularPrice > +product.price
                                  ? "line-through"
                                  : "",
                            }}
                          >
                            {formatReal(product.regularPrice)}
                          </Typography>
                        ) : null}
                        {product.price && (
                          <Typography component="span" variant="h3">
                            <Text
                              color={
                                +product.regularPrice > +product.price
                                  ? "success"
                                  : "black"
                              }
                            >
                              {formatReal(product.price)}
                            </Text>
                          </Typography>
                        )}

                        <Box
                          sx={{
                            pt: `${theme.spacing(1)}`,
                            pb: { xs: 1, md: 0 },
                            opacity: 0.4,
                          }}
                          alignSelf="center"
                        >
                          <b>{t("In Stock")}: </b>
                          <b>{product.stockInfo.qnt}</b>
                        </Box>
                      </Grid>

                      <Grid item alignSelf="center" md={6} xs={12}>
                        {verifyProduct ? (
                          <Grid
                            container
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Button
                              onClick={() => decrementProduct(product._id)}
                            >
                              <Remove fontSize="small" />
                            </Button>
                            <Box p={2}>{verifyProduct.amount}</Box>
                            <Button
                              onClick={() => {
                                incrementProduct(product._id);
                                setOpen(true);
                              }}
                            >
                              <Add fontSize="small" />
                            </Button>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            display="flex"
                            justifyContent="center"
                          >
                            <Button
                              size="medium"
                              variant="outlined"
                              onClick={() => {
                                incrementProduct(product._id);
                                setOpen(true);
                              }}
                            >
                              {t("Add to cart")}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  ) : (
                    <Button component={Link} href="/login">
                      Cadastrese ou faça login para ver o preço
                    </Button>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {review ? (
        <Grid item xs={12}>
          <Card>
            <TabsContainerWrapper>
              <Tabs
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {tabs?.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </TabsContainerWrapper>
            <Divider />
            {currentTab === "additional_info" && (
              <AdditionalInfoTab product={product} />
            )}

            {currentTab === "policies" && <PoliciesTab policies={policys} />}
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProductBody;

interface ProductBodyProps {
  product: Product;
  review: boolean;
  policy: Policy[];
}

const SwipeIndicator = styled(IconButton)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px) {
        display: none;
    }
    transition: ${theme.transitions.create(["background", "color"])};
    color: ${theme.colors.primary.main};
    background: ${theme.colors.alpha.white[100]};
    position: absolute;
    margin:-3.5rem;
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
    top: 50%;
    margin-top: ${theme.spacing(-1.5)};
    border-radius: 100px;
    z-index: 5;

    &:hover {
      background: ${theme.colors.alpha.white[100]};
      color: ${theme.colors.alpha.black[100]};
    }

    &.MuiSwipe-left {
      left: ${theme.spacing(0.5)};
    }
    
    &.MuiSwipe-right {
      right: ${theme.spacing(0.5)};
    }
`
);

const SwiperWrapper = styled(Box)(
  ({ theme }) => `
  .swiper-wrapper {
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .swiper-container-thumbs {
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide {
      width: 140px;
      display: flex;
      padding: 3px;

      img {
        width: 100%;
        height: auto;
        border-radius: ${theme.general.borderRadius};
        opacity: .7;
        transition: ${theme.transitions.create(["box-shadow", "opacity"])};
      }

      &:hover {
        cursor: pointer;

        img {
          opacity: 1;
        }
      }

      &.swiper-slide-thumb-active {
        img {
          opacity: 1;
          box-shadow: 0 0 0 3px ${theme.colors.primary.main};
        }
      }
    }
  }
`
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(2)};
  `
);
