import { useState, ChangeEvent, useEffect } from "react";

import {
  TextField,
  Grid,
  CardHeader,
  Tab,
  Box,
  Tabs,
  Typography,
  Divider,
  FormControl,
  Checkbox,
  Tooltip,
  InputAdornment,
  FormControlLabel,
  IconButton,
  InputLabel,
  Select,
  Card,
  styled,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import { useSellerProducts } from "@core/contexts/SellerProductsContext";
import { decompilePrice, formatReal } from "@core/utils/functions";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `
);

function AdditionalInfo() {
  const { product, updateProductState } = useSellerProducts();
  const [currentTab, setCurrentTab] = useState<string>("general");
  const { t }: { t: any } = useTranslation();

  const tabs = [
    { value: "general", label: t("General") },
    { value: "inventory", label: t("Inventory") },
    { value: "shipping", label: t("Shipping") },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Card>
      <Box display={"flex"} alignItems={"center"} sx={{ p: 1 }}>
        <CardHeader title={t("Additional Informations")} />
        <Button variant="contained" sx={{ maxHeight: 40 }}>
          {t("Help!")}
        </Button>
      </Box>
      <Divider />
      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>
      <Divider />
      <Box p={3}>
        {/* {currentTab === "general" && ( */}
        <Grid
          container
          style={{ display: currentTab === "general" ? "flex" : "none" }}
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="regularPrice"
              value={formatReal(product.regularPrice)}
              onChange={(e) => {
                updateProductState({
                  target: {
                    name: "regularPrice",
                    value: decompilePrice(e.target.value),
                  },
                });
              }}
              variant="outlined"
              label={t("Regular price")}
              placeholder={t("Regular price here ...")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="price"
              value={formatReal(product.price)}
              onChange={(e) => {
                updateProductState({
                  target: {
                    name: "price",
                    value: decompilePrice(e.target.value),
                  },
                });
              }}
              variant="outlined"
              label={t("Sale price")}
              placeholder={t("Sale price here ...")}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="tax_status">{t("Tax Status")}</InputLabel>
              <Select
                native
                label={t("Tax Status")}
                inputProps={{
                  name: "tax_status",
                }}
              >
                <option value={1}>{t("Taxable")}</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="tax_class">{t("Tax Class")}</InputLabel>
              <Select
                native
                label={t("Tax Class")}
                defaultValue={1}
                disabled
                inputProps={{
                  name: "tax_status",
                }}
              >
                <option value={1}>{t("Standard")}</option>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        {/* )} */}
        {/* {currentTab === "inventory" && ( */}
        <Grid
          container
          style={{ display: currentTab === "inventory" ? "flex" : "none" }}
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                name="sku"
                value={product.stockInfo.sku}
                onChange={updateProductState}
                variant="outlined"
                label={t("SKU")}
                placeholder={t("Stock quantity here ...")}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                name="qnt"
                onChange={updateProductState}
                value={product.stockInfo.qnt}
                variant="outlined"
                label={t("Stock Quantity")}
                placeholder={t("Stock quantity here ...")}
              />
            </Box>
          </Grid>
        </Grid>
        {/* )} */}
        {/* {currentTab === "shipping" && ( */}
        <Grid
          style={{ display: currentTab === "shipping" ? "flex" : "none" }}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              {t(
                `Attention: The values ​​declared here affect the value of the freight, so be precise in the information declared here`
              )}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                onChange={updateProductState}
                value={product.shippingInfo.weight}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                fullWidth
                name="weight"
                variant="outlined"
                label={t("Weight")}
                placeholder={t("Write weight ...")}
              />
              <Tooltip
                arrow
                placement="top"
                title={t(
                  "Declare the weight of the package in KGs. If grams, use decimal. Ex: 500 g = 0.5"
                )}
              >
                <IconButton
                  size="small"
                  sx={{
                    ml: 1,
                  }}
                  color="primary"
                >
                  <HelpOutlineTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              onChange={updateProductState}
              value={product.shippingInfo.height}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">CM</InputAdornment>
                ),
              }}
              fullWidth
              name="height"
              variant="outlined"
              label={t("Height")}
              placeholder={t("Write Height ...")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              onChange={updateProductState}
              value={product.shippingInfo.width}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">CM</InputAdornment>
                ),
              }}
              fullWidth
              name="width"
              variant="outlined"
              label={t("width")}
              placeholder={t("Write width ...")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">CM</InputAdornment>
                ),
              }}
              onChange={updateProductState}
              value={product.shippingInfo?.length}
              fullWidth
              name="length"
              variant="outlined"
              label={t("Length")}
              placeholder={t("Write Length ...")}
            />
          </Grid>
        </Grid>
        {/* )} */}
      </Box>
    </Card>
  );
}

export default AdditionalInfo;
