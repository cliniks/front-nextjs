import { FC } from "react";

import {
  Breadcrumbs,
  Box,
  Grid,
  Link,
  Typography,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { ProductType } from "@core/types/product";
import { Close } from "@mui/icons-material";

interface PageHeaderProps {
  product: ProductType;
  productProp?: any;
  closeBtn?: Function;
}

const PageHeader: FC<PageHeaderProps> = ({
  product,
  productProp,
  closeBtn,
}) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Product Details")}
            </Typography>
            {/* <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                {t("Dashboard")}
              </Link>
              <Link
                component={RouterLink}
                color="inherit"
                to="/dashboard/products"
              >
                {t("Products")}
              </Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs> */}
          </Box>
        </Box>
      </Grid>

      <Grid item display={"flex"}>
        {product._id && (
          <Grid item>
            <Button
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              component={Link}
              size="large"
              startIcon={<StorefrontTwoToneIcon />}
              href={`/store/${product.owner}`}
              variant="contained"
            >
              {t("Shop Storefront")}
            </Button>
          </Grid>
        )}

        {productProp ? (
          <Tooltip arrow placement="top" title={t("Go back")}>
            <IconButton
              onClick={() => closeBtn()}
              color="primary"
              sx={{
                p: 1,
                mr: 1,
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        ) : null}
      </Grid>
    </Grid>
  );
};

PageHeader.propTypes = {
  // @ts-ignore
  product: PropTypes.object.isRequired,
};

export default PageHeader;
