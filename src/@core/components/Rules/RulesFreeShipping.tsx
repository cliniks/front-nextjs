import React from "react";
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { decompilePrice, formatReal } from "@core/utils/functions";
import { useAdminStores } from "@core/contexts/AdminStoresContext";

const RulesFreeShipping = ({ type }) => {
  const {
    getStore,
    getStoreClient,
    handleSubmit,
    store,
    handleUptadeStoreShipping,
  } = useAdminStores();

  const { t }: { t: any } = useTranslation();

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    handleUptadeStoreShipping({
      target: {
        name: "hasFreeShipping",
        value: event.target.checked,
      },
    });
  };

  useEffect(() => {
    if (type === "client") {
      getStoreClient();
    }

    if (type === "admin") {
      getStore();
    }
  }, []);

  return (
    <Grid item xs={12} mt={5}>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {t("Delivery Rules ")}
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={2}>
            <FormControlLabel
              value="start"
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label={t("Is Free shipping ?")}
              labelPlacement="start"
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              disabled={!checked}
              label={t("Min value Delivery")}
              value={formatReal(`${store?.freeShippingMinPrice?.value}`)}
              onChange={(e) => {
                handleUptadeStoreShipping({
                  target: {
                    name: "value",
                    value: decompilePrice(e.target.value),
                  },
                });
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} display="flex" justifyContent="right">
            <Button
              style={{ paddingLeft: "80px", paddingRight: "80px" }}
              size="large"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              <Typography> {t("Save")}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default RulesFreeShipping;
