import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Tooltip,
  styled,
  lighten,
  IconButton,
} from "@mui/material";
import { ConfirmDialog } from "@core/components/Dialogs/ConfirmDialog";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useUser } from "@core/contexts/UserContext";
import Scrollbar from "@core/components/Scrollbar";
import ModalNewAddress from "./ModalNewAddress";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { sdk } from "@core/sdkProvider";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Addresses() {
  const { t }: { t: any } = useTranslation();
  const { addresses, getMyAddress, handleSetDefault, user } = useUser();

  useEffect(() => {
    getMyAddress();
  }, []);

  const handleDelete = (addressId: string) => {
    sdk.User.account.deleteAddress({ addressId }, (res) => {
      const returnText = t("You successfully deleted the address");
      toast(returnText, { type: "success" });
      getMyAddress();
    });
  };

  const ListaAddressComponent = () => {
    return (
      <FormControl
        sx={{
          padding: 1,
          width: "100%",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <FormLabel id="radio-buttons-addresses-label">
          {t("Addresses")}
        </FormLabel>
        <RadioGroup value={user.userInfo.defaultAddress}>
          {addresses.map((addr, indice) => {
            return (
              <Box
                key={"address" + addr._id + indice}
                sx={{
                  display: "grid",
                  minHeight: { xs: 0, md: 80 },
                  width: "100%",
                  minWidth: "310px",
                }}
                pl={1}
              >
                <FormControlLabel
                  id="formControlAddress"
                  name="formControlAddress"
                  control={<Radio />}
                  onClick={(e) => handleSetDefault(addr._id, e)}
                  value={addr._id}
                  label={`${addr.address} , ${addr.number}`}
                  sx={{ minWidth: "310px" }}
                />
                <Box
                  pt={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="subtitle1">
                    {`${addr.city}, ${addr.state}, ${
                      addr.zipCode ? addr.zipCode : ""
                    }`}
                  </Typography>

                  <Tooltip arrow title={t("Remove this card")}>
                    <IconButtonError onClick={() => handleDelete(addr._id)}>
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButtonError>
                  </Tooltip>
                </Box>

                <Divider sx={{ m: 1 }} />
              </Box>
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={12}>
        <Card>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "space-between",
            }}
          >
            <CardHeader
              style={{ flex: 1 }}
              title={t("Shipping Addresses")}
              subheader={addresses?.length + " " + t("saved addresses")}
            />
            <ConfirmDialog
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: "1rem",
                // display: "flex",
                // justifyContent: "flex-end",
              }}
              component={(handleClose) => (
                <ModalNewAddress handleClose={handleClose} />
              )}
            >
              <Button
                sx={{
                  height: "60px",
                  whiteSpace: "nowrap",
                  p: 1,
                }}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                {t("New Address")}
              </Button>
            </ConfirmDialog>
          </Box>
          <Divider />
          <Scrollbar>
            <ListaAddressComponent />
          </Scrollbar>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Addresses;

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);
