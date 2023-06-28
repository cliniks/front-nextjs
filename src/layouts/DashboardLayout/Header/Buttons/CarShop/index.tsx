import { useRef } from "react";

import {
  IconButton,
  Badge,
  alpha,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useCart } from "@core/contexts/CartContext";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  border-radius: ${theme.general.borderRadiusLg};
`
);

function Carshop() {
  const { t }: { t: any } = useTranslation();
  const { pathname } = useRouter();
  const theme = useTheme();
  const { setOpen } = useCart();
  const ref = useRef<any>(null);

  return (
    <>
      {!pathname.includes("checkout") ? (
        <Tooltip arrow title={t("ShopCar")}>
          <Badge
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{ mr: 1 }}
          >
            <IconButtonWrapper
              color="warning"
              ref={ref}
              sx={{
                background: alpha(theme.colors.error.main, 0.2),
                transition: `${theme.transitions.create(["background"])}`,
                color: alpha(theme.colors.primary.main, 0.5),

                "&:hover": {
                  background: alpha(theme.colors.primary.main, 0.3),
                  color: alpha(theme.colors.error.main, 0.3),
                },
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <ShoppingCart></ShoppingCart>
            </IconButtonWrapper>
          </Badge>
        </Tooltip>
      ) : null}
    </>
  );
}

export default Carshop;
