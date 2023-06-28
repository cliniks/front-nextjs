import { useRef, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import type { ApexOptions } from "apexcharts";
import Text from "@core/components/Text";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import { formatReal } from "@core/utils/functions";
import { useRouter } from "next/router";
import { useUser } from "@core/contexts/UserContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function HeaderUserbox() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const router = useRouter();

  const { user, logout } = useUser();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const Box1Options: ApexOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Last Week",
      "Last Month",
      "Last Year",
      "Last Decade",
    ],
    theme: {
      mode: theme.palette.mode === "dark" ? "light" : "dark",
    },
    stroke: {
      colors: [theme.colors.error.main],
      curve: "smooth",
      width: 3,
    },
    grid: {
      padding: {
        right: 5,
        left: 5,
        bottom: 5,
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "Orders:";
          },
        },
      },
      marker: {
        show: true,
      },
    },
    colors: [theme.colors.error.main],
  };
  const Box1Data = [
    {
      name: "Revenue",
      data: [],
    },
  ];

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        <UserAvatar alt={user.userInfo.name} src={user.img} />
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.userInfo.name} src={user.img} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.userInfo.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.userInfo.lastName}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <MenuListWrapperPrimary disablePadding>
          <MenuItem>
            <Link
              href="/dashboard/user/myAccount"
              onClick={handleClose}
              // primary={`${t("My account")} / ${t("Profile settings")}`}
            >{`${t("My account")} / ${t("Profile settings")}`}</Link>
            <ChevronRightTwoToneIcon
              sx={{
                color: `${theme.colors.alpha.black[30]}`,
                opacity: 0.8,
              }}
            />
          </MenuItem>
        </MenuListWrapperPrimary>
        <Divider />
        <Box m={1}>
          <Box px={2} pt={1} pb={0.5} display="flex" alignItems="flex-start">
            <Text color="warning">
              <MonetizationOnTwoToneIcon fontSize="large" />
            </Text>
            <Box ml={1}>
              <Typography variant="h3">{formatReal("0")}</Typography>
              <Typography noWrap variant="subtitle2">
                {t("total value")}
              </Typography>
            </Box>
          </Box>
          <Chart
            options={Box1Options}
            series={Box1Data}
            type="line"
            height={60}
          />
        </Box>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t("Sign out")}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme?.colors?.alpha.white[100]} solid 2px;
`
);

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  &:hover {
    background: ${theme.colors.primary.main};
  }
`
);

const UserAvatar = styled(Avatar)(
  ({ theme }) => `
        height: 90%;
        width: 90%;
        border-radius: ${theme.general.borderRadiusLg};
`
);

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);
