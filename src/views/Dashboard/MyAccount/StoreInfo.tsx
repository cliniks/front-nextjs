import React from "react";
import {
  Button,
  Card,
  Grid,
  Avatar,
  TextField,
  Typography,
  IconButton,
  Box,
  styled,
  Divider,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import Label from "@core/components/Label";

import axios from "axios";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";

import RulesPayment from "@core/components/Rules/RulesPayment";
import RulesFreeShipping from "@core/components/Rules/RulesFreeShipping";
import { useAdminStores } from "@core/contexts/AdminStoresContext";

const StoreInfo = ({ handleClose }: { handleClose?: () => void }) => {
  const {
    getStoreClient,
    handleSubmit,
    store,
    handleUptadeStore,
    handleUptadeStoreValues,
    handleUptadeStoreShipping,
    setStore,
    handleDeletePaymentRule,
    setInstallmentValue,
    setPaymentmentCount,
    paymentCount,
    installmentValue,
  } = useAdminStores();

  const { t }: { t: any } = useTranslation();
  const [loading, setLoading] = useState(false);

  const mask = (v: string) => {
    v = v.replace(/\D/g, "");

    if (v?.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return v;
  };

  const handleFile = (type, e) => {
    const file = e.target.files[0];
    const form = new FormData();

    form.append("image", file);

    if (type === "banner") {
      handleUptadeStore({
        target: {
          name: type,
          value: form,
        },
      });
    }
    if (type === "profile") {
      handleUptadeStore({
        target: {
          name: type,
          value: form,
        },
      });
    }
  };

  function handleChangeCep(event) {
    const { value } = event.target;

    handleUptadeStore({ target: { value: cep(value), name: "zipCode" } });
    // console.log(mask(value));
  }
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

  const getCep = async (value) => {
    setLoading(true);

    const cpfReajust = value
      .split("")
      .filter((item) => {
        if (!item.includes(".") && !item.includes("-") && !item.includes("/"))
          return true;
      })
      .join("")
      .toString();

    try {
      const getMycep = await axios
        .get(`https://viacep.com.br/ws/${cpfReajust}/json/`)
        .then((res) => {
          if (res.data) {
            return res.data;
          } else {
            toast(
              "Não foi possível encontrar seu endereço, digite de forma manual.",
              { type: "error", autoClose: 3000 }
            );
          }
        })
        .catch((err) => {
          toast(
            "Não foi possível encontrar seu endereço, digite de forma manual.",
            { type: "error", autoClose: 3000 }
          );
          setLoading(false);
        });

      setStore((state) => ({
        ...state,
        storeInfo: {
          ...state.storeInfo,
          address: getMycep.logradouro,
          zipCode: getMycep.cep,
          city: getMycep.localidade,
          district: getMycep.bairro || "",
          complement: getMycep.complemento,
          state: getMycep.uf,
          number: getMycep.numero,
        },
      }));

      setLoading(false);
    } catch (error) {}
  };

  const cep = (cepFormat: string) => {
    cepFormat = cepFormat.replace(/\D/g, "");
    cepFormat = cepFormat.replace(/(\d{5})(\d)/, "$1-$2");
    cepFormat = cepFormat.replace(/(-\d{3})\d+?$/, "$1");

    return cepFormat;
  };

  const handleClickCep = (cep) => {
    getCep(cep);
  };

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
        setInstallmentValue(rule.installmentValue);
        setPaymentmentCount(`${rule.installmentCount}`);
      }
    });
  };

  useEffect(() => {
    getStoreClient();
  }, []);

  return (
    <Grid
      container
      spacing={1}
      // width="97%"
      component={Card}
      p={3}
      // m={2}
      sx={{ overflow: "auto" }}
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <Grid item xs={12}>
        <Box style={{ position: "relative" }}>
          <CardCover>
            <CardMedia image={store?.banner} />
            <CardCoverAction>
              <Input
                accept="image/*"
                id="change-cover"
                onChange={(e) => handleFile("banner", e)}
                multiple={false}
                type="file"
              />
              <label htmlFor="change-cover">
                <Button
                  startIcon={<UploadTwoToneIcon />}
                  variant="contained"
                  component="span"
                >
                  <Typography> {t("Change cover")}</Typography>
                </Button>
              </label>
            </CardCoverAction>
          </CardCover>
          <AvatarWrapper>
            <Avatar variant="rounded" alt={store?.name} src={store?.img} />
            <ButtonUploadWrapper>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
                onChange={(e) => handleFile("profile", e)}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span" color="primary">
                  <UploadTwoToneIcon />
                </IconButton>
              </label>
            </ButtonUploadWrapper>
          </AvatarWrapper>
          <Box py={2} pl={2}>
            <Typography gutterBottom variant="h4">
              {store?.name}
            </Typography>
            <Typography variant="subtitle2">{store?.segments}</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} my={2}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Store Details")}
              </Typography>
              {/* <Typography variant="subtitle2">
                {t("Manage informations related to your personal details")}
              </Typography> */}
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {t("Name")}:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color="black">
                    <b>{store?.storeInfo?.enterpriseSocial}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    {store?.storeInfo?.cpf ? (
                      <Typography color="black">{t("Cpf")}</Typography>
                    ) : null}
                    {store?.storeInfo?.cnpj ? (
                      <Typography color="black">{t("Cnpj")}</Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Grid item xs={12} md={6}>
                      {store?.storeInfo?.cpf ? (
                        <Typography color="black">
                          {mask(store?.storeInfo?.cpf)}
                        </Typography>
                      ) : null}

                      {store?.storeInfo?.cnpj ? (
                        <Typography color="black">
                          {mask(store?.storeInfo?.cnpj)}{" "}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <Typography> {t("Email")}:</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Typography color="black">
                      <b>{store?.storeInfo?.email}</b>
                    </Typography>
                    <Box pl={1} component="span">
                      <Label color="success">{t("Primary")}</Label>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} mt={5}>
        <Card>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {t("Store Adress")}
            </Typography>
          </Box>

          <Divider />

          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  CEP
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  inputProps={{ maxLength: 18 }}
                  onChange={(e) => {
                    handleUptadeStore({
                      target: {
                        name: "zipCode",
                        value: e.target.value,
                      },
                    });
                  }}
                  value={store?.storeInfo?.zipCode}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) =>
                          handleClickCep(store?.storeInfo?.zipCode)
                        }
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Cnpj"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("Adress")}
                value={store?.storeInfo?.address}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "address",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("Number")}
                value={store?.storeInfo?.number}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "number",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("Complement")}
                value={store?.storeInfo?.complement}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "complement",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("Neighborhood")}
                value={store?.storeInfo?.district}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "district",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("City")}
                value={store?.storeInfo?.city}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "city",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("State")}
                value={store?.storeInfo?.state}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "state",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t("Phone")}
                value={store?.storeInfo?.phone}
                onChange={(e) => {
                  handleUptadeStore({
                    target: {
                      name: "phone",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} display="flex" justifyContent="right">
              <Button
                style={{ paddingLeft: "80px", paddingRight: "80px" }}
                size="large"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  handleSubmit(handleClose);
                }}
              >
                {t("Save")}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <RulesFreeShipping type="client"></RulesFreeShipping>

      <RulesPayment type="client"></RulesPayment>
    </Grid>
  );
};

export default StoreInfo;

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: absolute;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(30)};
    
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const Input = styled("input")({
  display: "none",
});
