import { Box, Drawer, Grid, useTheme, IconButton, styled } from "@mui/material";
import { MutableRefObject, useEffect, useState } from "react";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { useTranslation } from "react-i18next";
import AdditionalInfo from "./AdditionalInfo";
import GeneralSection from "./GeneralSection";
import { useParams } from "react-router-dom";
import { L } from "src/types/languageType";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import Sidebar from "./sidebar";
import { useSellerProducts } from "src/contexts/SellerProductsContext";

function ManagementProductCreate() {
  const { getProduct } = useSellerProducts();
  const theme = useTheme();

  const { id } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { t }: L = useTranslation();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const sidebarContent = <Sidebar />;

  return (
    <>
      <Helmet>
        <title>{t(id ? "Edit Product" : "Create Product")}</title>
      </Helmet>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
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
            <Grid item xs={12}>
              <AdditionalInfo />
            </Grid>
          </Grid>
        </MainContentWrapper>
        <Box
          component="span"
          sx={{
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <DrawerWrapperMobile
            variant="temporary"
            anchor={theme.direction === "rtl" ? "left" : "right"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            {sidebarContent}
          </DrawerWrapperMobile>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: "none", lg: "inline-block" },
          }}
        >
          <DrawerWrapper
            variant="permanent"
            anchor={theme.direction === "rtl" ? "left" : "right"}
            open
          >
            {sidebarContent}
          </DrawerWrapper>
        </Box>
      </Box>
    </>
  );
}

export default ManagementProductCreate;

const DrawerWrapper = styled(Drawer)(
  ({ theme }) => `
    width: 400px;
    flex-shrink: 0;
    z-index: 3;
    
    & > .MuiPaper-root {
        width: 400px;
        height: calc(100% - ${theme.header.height});
        position: absolute;
        top: ${theme.header.height};
        right: 0;
        z-index: 3;
        background: ${theme.colors.alpha.white[10]};
    }
`
);

const DrawerWrapperMobile = styled(Drawer)(
  ({ theme }) => `
    width: 360px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 360px;
        z-index: 3;
        background: ${theme.colors.alpha.white[30]};
  }
`
);

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
