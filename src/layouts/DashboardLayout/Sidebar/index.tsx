import { useContext } from "react";
import Scrollbar from "@core/components/Scrollbar";
import { SidebarContext } from "@core/contexts/SidebarContext";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
} from "@mui/material";

import SidebarTopSection from "./SidebarTopSection";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import Logo from "@core/components/Logos";
import { useNotifications } from "@core/contexts/NotificationsContext";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.black[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 61px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext<any>(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const {
    globalAllNotifications,
    sellerAllNotifications,
    userAllNotifications,
  } = useNotifications();

  const verifySomeNotification =
    globalAllNotifications?.length > 0 ||
    sellerAllNotifications?.length > 0 ||
    userAllNotifications?.length > 0;

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "light"
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "light" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                // width: "254px",
                padding: "10.8px 27px",
                background: "#555",
                borderRadius: "10px",
                height: "46.9px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: theme.typography.h4,
                marginTop: verifySomeNotification ? "48px" : "0px",
              }}
            >
              {/* <Logo /> */}
              Minha Loja
            </Box>
          </Box>
          <Divider
            sx={{
              my: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.black[10],
            }}
          />
          {/* <Divider
            sx={{
              my: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.black[10],
            }}
          />
          <SidebarTopSection />
          <Divider
            sx={{
              my: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.black[10],
            }}
          /> */}
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.black[10],
          }}
        />
        <SidebarFooter />
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "light"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                my: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarTopSection />
            <Divider
              sx={{
                my: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu />
          </Scrollbar>
          <SidebarFooter />
          {/* {user?.access === 1 || user?.access === 0 ? (
            <ConfirmDialog component={() => <Button>Clica Aqui</Button>}>
              <Button>Clica Aqui</Button>
            </ConfirmDialog>
          ) : null} */}
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
