import React from "react";
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { formatReal } from "@core/utils/functions";
import { Delete, Edit } from "@mui/icons-material";
import { id } from "date-fns/locale";
import { useAdminStores } from "@core/contexts/AdminStoresContext";

const RulesPayment = ({ type }) => {
  const {
    getStoreClient,
    store,
    handleUptadeStoreValues,
    handleDeletePaymentRule,
    setInstallmentValue,
    setPaymentmentCount,
    paymentCount,
    installmentValue,
    getStore,
    setIndexPayment,
    edit,
    setEdit,
    handleEditInstallmentRules,
  } = useAdminStores();
  const { t }: { t: any } = useTranslation();

  const handleChangeAddNewPayment = () => {
    handleUptadeStoreValues(
      store?.installmentRules?.length === 0
        ? 2
        : store?.installmentRules?.length + 2
    );

    setPaymentmentCount("");
  };

  const handleEditPaymentRule = async (index: string) => {
    store.installmentRules.map((rule) => {
      if (rule._id === index) {
        setIndexPayment(index);
        setInstallmentValue(rule.installmentValue);
        setPaymentmentCount(`${rule.installmentCount}`);
      }
    });

    setEdit(true);
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
            {t("Payment rules ")}
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              disabled
              value={
                !paymentCount
                  ? t("Parcela nº ") + (store.installmentRules.length + 2)
                  : t("Parcela nº ") + paymentCount
              }
              onChange={(e) => {
                setPaymentmentCount(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              label={t("Min value for Payment")}
              fullWidth
              value={formatReal(installmentValue)}
              onChange={(e) => {
                setInstallmentValue(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} display="flex" justifyContent="right">
            {!edit ? (
              <Button
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  marginRight: "20px",
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  handleChangeAddNewPayment();
                }}
              >
                <Typography> {t("Add Rule")}</Typography>
              </Button>
            ) : null}

            {edit ? (
              <Button
                style={{ paddingLeft: "80px", paddingRight: "80px" }}
                size="large"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  handleEditInstallmentRules(id);
                }}
              >
                <Typography> {t("Save")}</Typography>
              </Button>
            ) : null}
          </Grid>

          {store?.installmentRules?.map((storeRules) => {
            return (
              <>
                <Grid item xs={12} md={2}>
                  <TextField
                    disabled
                    fullWidth
                    label={t("Payment Installments")}
                    value={storeRules?.installmentCount}
                  />
                </Grid>

                <Grid item xs={12} md={9}>
                  <TextField
                    label={t("Min value for Payment")}
                    fullWidth
                    disabled
                    value={formatReal(storeRules?.installmentValue)}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={1}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={t("Edit")} arrow>
                    <IconButton
                      onClick={() => {
                        handleEditPaymentRule(storeRules?._id);
                      }}
                      color="primary"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("Delet")} arrow>
                    <IconButton
                      onClick={() => {
                        handleDeletePaymentRule(
                          store.installmentRules.indexOf(storeRules)
                        );
                      }}
                      color="primary"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Card>
    </Grid>
  );
};

export default RulesPayment;
