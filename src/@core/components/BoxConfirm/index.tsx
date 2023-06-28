import { Close } from "@mui/icons-material";
import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";

export const BoxConfirm = ({ title, confirmDelete, handleClose }: props) => {
  const { t }: L = useTranslation();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={5}
    >
      <AvatarError>
        <Close />
      </AvatarError>

      <Typography
        align="center"
        sx={{
          pt: 4,
          px: 6,
        }}
        variant="h3"
      >
        {t(`Do you really want to delete this ${title}`)}?
      </Typography>

      <Typography
        align="center"
        sx={{
          pt: 2,
          pb: 4,
          px: 6,
        }}
        fontWeight="normal"
        color="text.secondary"
        variant="h4"
      >
        {t("You won't be able to revert after deletion")}
      </Typography>

      <Box>
        <Button
          variant="text"
          size="large"
          sx={{
            mx: 1,
          }}
          onClick={() => {
            handleClose();
          }}
        >
          {t("Cancel")}
        </Button>
        <ButtonError
          onClick={() => {
            confirmDelete();
            handleClose();
          }}
          size="large"
          sx={{
            mx: 1,
            px: 3,
          }}
          variant="contained"
        >
          {t("Delete")}
        </ButtonError>
      </Box>
    </Box>
  );
};

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

type props = {
  confirmDelete: Function;
  handleClose: Function;
  title: string;
};
