import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import { Box, Drawer, Grid, useTheme, IconButton, styled } from "@mui/material";

import GeneralSection from "./GeneralSection";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { useTranslation } from "react-i18next";
import { L } from "src/types/languageType";

const MainContentWrapper = styled(Box)(
  () => `
  flex-grow: 1;
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

function ManagementProductCreate() {
  const theme = useTheme();
  const [product, setProduct] = useState<Product>({
    name: "1",
    description: "",
    value: "",
    weigth: "",
    status: false,
    group: [],
    subgrupo: [],
    img: {},
    sizes: { qnt: "", sizeType: "" },
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { t }: L = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("Create Product - Commerce Management")}</title>
      </Helmet>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitting");
        }}
        mb={3}
        display="flex"
      >
        <MainContentWrapper>
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
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <PageHeader />
                <Box
                  component="span"
                  sx={{
                    display: { lg: "none", xs: "inline-block" },
                  }}
                >
                  <IconButtonToggle
                    sx={{
                      ml: 2,
                    }}
                    color="primary"
                    onClick={handleDrawerToggle}
                    size="small"
                  >
                    <MenuTwoToneIcon />
                  </IconButtonToggle>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <GeneralSection />
            </Grid>
          </Grid>
        </MainContentWrapper>
      </Box>
    </>
  );
}

export default ManagementProductCreate;

export type Product = {
  name: string;
  description: string;
  value: string;
  weigth: string;
  status: boolean;
  group: string[];
  subgrupo: string[];
  img: {};
  sizes: {
    qnt: string;
    sizeType: string;
  };
};
