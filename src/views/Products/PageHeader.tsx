import { useTranslation } from "react-i18next";
import RouterLink from "next/link";

import { Grid, Typography, Button } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { pathCurrentOrNextNavigate } from "@core/utils/functions";

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t("Products")}
        </Typography>
        <Typography variant="subtitle2">
          {t(
            `On this screen you manage (insert/change/delete) all products, images, values, dimensions, category of your store.`
          )}
          <br></br>
          {t(
            `Take care at this stage, because your customer will see it in your store as stated here`
          )}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
          component={RouterLink}
          href={`${pathCurrentOrNextNavigate()}/products/create`}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {t("Register Product")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
