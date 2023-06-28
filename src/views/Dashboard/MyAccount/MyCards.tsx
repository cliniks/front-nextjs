import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { ConfirmDialog } from "@core/components/Dialogs/ConfirmDialog";
import ModalNewCards from "./ModalNewCards";
import { useUser } from "@core/contexts/UserContext";
import { sdk } from "@core/sdkProvider";
import { toast } from "react-toastify";

function MyCards({ setCartSelected }: { setCartSelected?: any }) {
  const { t }: { t: any } = useTranslation();

  const [selectedValue, setSelectedValue] = useState("3536");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    cartId: string
  ) => {
    setSelectedValue(event.target.value);

    if (setCartSelected) {
      const cartSelected = cards.find((cart) => cart._id === cartId);
      setCartSelected(cartSelected);
    }
  };

  const handleDelete = (paymentId: string) =>
    sdk.User.account.deleteMyPaymentMethod({ paymentId }, (res) => {
      const returnText = t("You successfully deleted the Payment Method");
      toast(returnText, { type: "success" });
      getMyCards();
    });

  const { getMyCards, cards } = useUser();

  useEffect(() => {
    getMyCards();
  }, []);

  return (
    <Card>
      <CardHeader title={t("Cards")} />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          {cards.map((card) => {
            return (
              <CardC
                cardId={card._id}
                creditCardBrand={card.creditCardBrand}
                number={card.creditCardNumber}
                key={card.creditCardNumber}
                handleChange={handleChange}
                handleDelete={handleDelete}
                selectedValue={selectedValue}
                showLabel={setCartSelected}
              />
            );
          })}
          <Grid item xs={12} sm={6}>
            <Tooltip arrow title={t("Click to add a new card")}>
              <ConfirmDialog
                component={(handleClose) => (
                  <ModalNewCards handleClose={handleClose} />
                )}
              >
                <CardAddAction>
                  <CardActionArea>
                    <CardContent>
                      <AvatarAddWrapper>
                        <AddTwoToneIcon fontSize="large" />
                      </AvatarAddWrapper>
                    </CardContent>
                  </CardActionArea>
                </CardAddAction>
              </ConfirmDialog>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default MyCards;

export const CardC = ({
  number,
  cardId,
  handleChange,
  handleDelete,
  selectedValue,
  creditCardBrand,
  showLabel,
}) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid item sm={12} lg={12} xl={12}>
      <CardCc
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          <CardLogo
            src={`/images/placeholders/logo/${creditCardBrand}.png`}
            alt={creditCardBrand}
          />
          <Box>
            <Typography variant="h3" fontWeight="normal">
              **** **** **** {number.split(" ")[number.split(" ")?.length - 1]}
            </Typography>
          </Box>
        </Box>
        <Box
          pt={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormControlLabel
            value="a"
            control={
              <Radio
                checked={selectedValue === number}
                onChange={(e) => handleChange(e, cardId)}
                value={number}
                color="primary"
                name="primary-card"
              />
            }
            label={showLabel ? "" : t("Primary")}
          />
          <Tooltip arrow title={t("Remove this card")}>
            <IconButtonError onClick={() => handleDelete(cardId)}>
              <DeleteTwoToneIcon fontSize="small" />
            </IconButtonError>
          </Tooltip>
        </Box>
      </CardCc>
    </Grid>
  );
};

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled("img")(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        transition: ${theme.transitions.create(["all"])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

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

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

const confirmCardType = (string) => {
  const firstNumber = string.charAt(0);
  let result = "";
  switch (firstNumber) {
    case "4":
      result = "visa";
      break;
    case "3":
      result = "american-express";
      break;
    case "5":
      result = "master";
      break;
    case "6":
      result = "discover";
  }
  return result;
};
