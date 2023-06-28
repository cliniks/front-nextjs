import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, Grid } from "@mui/material";
import { useCart } from "@core/contexts/CartContext";
// import { CartProduct } from "@core/components/Cards/CartProduct";
// import { CouponBox } from "../Dashboard/Checkout/coupon";
import { formatReal } from "@core/utils/functions";
import Link from "next/link";
import { useUser } from "@core/hooks/contexstHooks";

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 20,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function CartShop() {
  const theme = useTheme();

  const { user } = useUser();
  const { cart, getMyCart, open, setOpen } = useCart();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const list = () => (
    <Box role="presentation" sx={{ zIndex: 999999999 }}>
      <Divider />
      <Box
        sx={{
          overflow: "hidden",
          zIndex: 999999999,
          textAlign: "left",
          display: "grid",
          alignItems: "space-between",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              p: 2,
            }}
          >
            Produtos adicionados
          </Typography>
        </Box>
        <List
          dense
          sx={{
            maxWidth: "100%",
            minHeight: "41vh",
            maxHeight: "41vh",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {cart.products?.map((value) => {
            return (
              <Box key={value._id}>
                {/* <CartProduct product={value} /> */}
                <Divider sx={{ my: 1 }} />
              </Box>
            );
          })}
        </List>
        <Grid container display="grid" spacing={2} px={3} py={1}>
          <Divider sx={{ my: 0.5 }} />
          {/* <CouponBox /> */}
          <Divider sx={{ my: 0.5 }} />
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          {cart.totalDiscount && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 3,
              }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Descontos
              </Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                {formatReal(cart.totalDiscount?.toFixed(2).toString())}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
              SubTotal
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
              {formatReal(cart.totalPrice?.toFixed(2).toString())}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Button variant="contained" sx={{ mb: 2 }}>
              Visualizar o Carrinho
            </Button> */}
            <Button
              variant="contained"
              component={Link}
              href="/dashboard/user/checkout"
              onClick={handleDrawerClose}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
        zIndex: 999999999,
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Box>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list()}
      </Box>
    </Drawer>
  );
}
