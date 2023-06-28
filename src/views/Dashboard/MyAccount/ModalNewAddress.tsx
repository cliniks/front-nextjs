import { useTranslation } from "react-i18next";
import { useUser } from "@core/contexts/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  InputLabel,
  TextField,
  Container,
} from "@mui/material";

function ModalNewAddress({ handleClose }: { handleClose: Function }) {
  const { t }: { t: any } = useTranslation();

  const {
    handleInputsAddress,
    handleSubmitNewAddress,
    singleAddress,
    handleSearchAddressForCEP,
  } = useUser();

  return (
    <UploadBox>
      <Grid item md={12} sm={12} xs={12}>
        <TypographyPrimary variant="h4" gutterBottom>
          {t("Add new address")}
        </TypographyPrimary>
        <TypographySecondary variant="body1">
          {t("Here you can register another address to use at checkout")}
        </TypographySecondary>
      </Grid>

      <InputLabel>
        Ao digitar seu CEP vamos tentar identificar seu endereço
        automaticamente.
      </InputLabel>

      <Container>
        <Grid container spacing={1} my={3}>
          <Grid item md={8} sm={12} xs={12}>
            <TextField
              name="zipCode"
              label="Cep"
              required
              fullWidth
              value={singleAddress.zipCode}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <Button
              fullWidth
              type="submit"
              onClick={handleSearchAddressForCEP}
              variant="contained"
              style={{ height: "50px" }}
            >
              <SearchIcon sx={{ mr: "5px" }} />
              {t("Search")}
            </Button>
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="address"
              label="Logradouro"
              required
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.address}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="number"
              type="number"
              label="Número"
              required
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.number}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="city"
              label="Cidade"
              required
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.city}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="state"
              label="Estado"
              required
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.state}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="country"
              label="País"
              required
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.country}
              onChange={handleInputsAddress}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <TextField
              autoComplete="false"
              name="complement"
              label="Complemento"
              fullWidth
              sx={{ mt: "15px" }}
              value={singleAddress.complement}
              onChange={handleInputsAddress}
            />
          </Grid>
        </Grid>
      </Container>

      <Button
        fullWidth
        type="submit"
        onClick={() => {
          handleSubmitNewAddress();
          handleClose();
        }}
        variant="contained"
      >
        {t("Add Address")}
      </Button>
    </UploadBox>
  );
}

export default ModalNewAddress;

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
        width: 40vw;
        min-width:400px;
    `
);
