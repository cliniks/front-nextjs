import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "@core/contexts/UserContext";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  TextField,
  useTheme,
  Container,
} from "@mui/material";
import { maskCpfCnpj } from "@core/utils/functions";

function ModalNewCards({ handleClose }: { handleClose: Function }) {
  const { t }: { t: any } = useTranslation();

  const theme = useTheme();

  const [continueState, setContinueState] = useState(true);

  const {
    handleSubmitNewPaymentMethod,
    handleInputsCard,
    handleInputsCreditCardHolderInfo,
    user,
    card,
    setCard,
    addresses,
  } = useUser();

  const defaultAddress = addresses.find(
    (item) => item._id === user.userInfo.defaultAddress
  );

  useEffect(() => {
    if (addresses?.length > 0 && user) {
      const myDefaltAddress = defaultAddress.zipCode;
      setCard((state) => ({
        ...state,
        creditCardHolderInfo: {
          ...state.creditCardHolderInfo,
          name: user.userInfo.name,
          cpfCnpj: user.userInfo.cnpj || user.userInfo.cpf,
          addressComplement: defaultAddress.address.toString(),
          addressNumber: defaultAddress.number.toString(),
          email: user.userInfo.email,
          phone: user.userInfo.phone,
          mobilePhone: user.userInfo.phone,
          postalCode: `${myDefaltAddress}`,
        },
      }));
    }
  }, [addresses, user]);

  return (
    <Box>
      {!continueState ? (
        <Grid container spacing={1} sx={{ p: 3 }}>
          <Grid item md={12} sm={12} xs={12}>
            <TypographyPrimary variant="h4" gutterBottom>
              {t("Add new Card")}
            </TypographyPrimary>
            <TypographySecondary variant="body1">
              {t("Here you can register another card to use at checkout")}
            </TypographySecondary>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Grid item sx={{ marginTop: "10px", marginBottom: "30px" }}>
              <Grid md={12} sm={12} xs={12}>
                <TextField
                  name="number"
                  label="Numero do Cartão"
                  value={card.creditCard.number}
                  required
                  onChange={handleInputsCard}
                  fullWidth
                  sx={{ mt: "15px" }}
                />
              </Grid>

              <Grid
                sx={{ display: "flex", justifyContent: "space-between" }}
                md={12}
                sm={12}
                xs={12}
              >
                <Grid md={6} sm={12} xs={12} mr={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 1,
                      border: 1,
                      borderColor: "RGBA(133, 133, 133,0.5)",
                      mt: 1.5,
                      height: 53,
                      pl: 1,
                      pr: 1,
                    }}
                  >
                    <TextField
                      name="expiryMonth"
                      label="Mes validade (00)"
                      required
                      value={card.creditCard.expiryMonth}
                      variant="standard"
                      onChange={(e: any) =>
                        e.target.value?.length <= 2 && handleInputsCard(e)
                      }
                      fullWidth
                      sx={{ pr: 1 }}
                    />
                    <TextField
                      name="expiryYear"
                      label="Ano validade (0000)"
                      variant="standard"
                      value={card.creditCard.expiryYear}
                      required
                      fullWidth
                      onChange={(e: any) =>
                        e.target.value?.length <= 4 && handleInputsCard(e)
                      }
                    />
                  </Box>
                </Grid>

                <Grid md={6} sm={12} xs={12}>
                  <TextField
                    name="ccv"
                    label="CVV"
                    required
                    value={card.creditCard.ccv}
                    fullWidth
                    onChange={(e: any) =>
                      e.target.value?.length <= 3 && handleInputsCard(e)
                    }
                    sx={{ mt: "15px" }}
                  />
                </Grid>
              </Grid>

              <Grid md={12} sm={12} xs={12}>
                <TextField
                  name="holderName"
                  label="Nome do Cartão"
                  value={card.creditCard.holderName}
                  required
                  fullWidth
                  onChange={handleInputsCard}
                  sx={{ mt: "15px" }}
                />
              </Grid>
            </Grid>

            <Grid item md={12} mt="20px">
              <Button
                fullWidth
                sx={{ background: theme.colors.primary.light, color: "white" }}
                type="submit"
                onClick={() => {
                  handleClose();
                  handleSubmitNewPaymentMethod();
                }}
              >
                {t("Add Card")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Container sx={{ p: 2 }}>
          <Typography variant="h4">
            {t("Vamos checar algumas informações ante de proseguir.")}
          </Typography>

          <Grid container spacing={1} my={3}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="name"
                label="Nome"
                value={card.creditCardHolderInfo.name}
                required
                onChange={handleInputsCreditCardHolderInfo}
                fullWidth
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="email"
                label="Email"
                value={card.creditCardHolderInfo.email}
                required
                onChange={handleInputsCreditCardHolderInfo}
                fullWidth
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="cpfCnpj"
                value={maskCpfCnpj(card.creditCardHolderInfo.cpfCnpj)}
                label="cpfCnpj"
                required
                onChange={handleInputsCreditCardHolderInfo}
                fullWidth
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="addressComplement"
                value={card.creditCardHolderInfo.addressComplement}
                label="Endereço"
                required
                fullWidth
                onChange={handleInputsCreditCardHolderInfo}
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="addressNumber"
                value={card.creditCardHolderInfo.addressNumber}
                label="Number"
                required
                fullWidth
                onChange={handleInputsCreditCardHolderInfo}
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="postalCode"
                value={card?.creditCardHolderInfo?.postalCode}
                label="Cep"
                required
                fullWidth
                onChange={handleInputsCreditCardHolderInfo}
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="phone"
                label="phone"
                value={card.creditCardHolderInfo.phone}
                required
                fullWidth
                onChange={handleInputsCreditCardHolderInfo}
                sx={{ mt: "15px" }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="mobilePhone"
                label="mobilePhone"
                value={card.creditCardHolderInfo.mobilePhone}
                defaultValue={user.userInfo.phone}
                required
                fullWidth
                onChange={handleInputsCreditCardHolderInfo}
                sx={{ mt: "15px" }}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            sx={{
              background: theme.colors.primary.light,
              color: "white",
              py: 1,
            }}
            type="submit"
            onClick={() => setContinueState(false)}
          >
            {t("Continuar")}
          </Button>
        </Container>
      )}
    </Box>
  );
}

export default ModalNewCards;

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
        color: #aa53fc;
      `
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
        color: #aa53fc;
      `
);

const UploadBox = styled(Box)(
  ({ theme }) => `
        border-radius: ${theme.general.borderRadius};
        padding: ${theme.spacing(2)};
        background: #fbfbfc;
      
    `
);
