import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUser } from "@core/contexts/UserContext";
import { Store } from "ecommersys/dist/Entities";

function PageHeader({ store }: { store?: Store }) {
  const { t }: { t: any } = useTranslation();
  // const { user } = useUser();

  // if (!user) return <></>;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              {store?.name || t("Storefront")}
            </Typography>
            <Typography variant="subtitle2">
              {store?.name
                ? null
                : t("This is a list of all commerce products")}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
