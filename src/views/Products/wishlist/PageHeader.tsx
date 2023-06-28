import { useTranslation } from "react-i18next";

import { Grid, Typography, Button } from "@mui/material";
import { pathCurrentOrNextNavigate } from "@core/utils/functions";
import Link from "next/link";

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t("Wishlist")}
        </Typography>
        <Typography variant="subtitle2">
          {t("This is your wishlist ...")}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
          component={Link}
          href={`${pathCurrentOrNextNavigate()}/products/list`}
          variant="contained"
        >
          {t("Products")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
