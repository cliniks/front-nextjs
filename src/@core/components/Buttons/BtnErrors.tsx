import { styled, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

export const BtnError = ({
  children,
  onClick,
}: {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { t }: L = useTranslation();
  return (
    <ButtonError
      onClick={onClick}
      size="large"
      sx={{
        mx: 1,
        px: 3,
      }}
      variant="contained"
    >
      {t(children)}
    </ButtonError>
  );
};
