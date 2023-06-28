import { useRef, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  Popover,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import { pathCurrentOrNextNavigate } from "@core/utils/functions";
import { useUser } from "@core/contexts/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
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
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
);

function SidebarTopSection() {
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

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: 2,
        pt: 1,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: "auto",
        }}
        alt={user.userInfo.name}
        src={user.img}
      />

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`,
        }}
      >
        {`${user.userInfo.name} ${user.userInfo.lastName}`}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: `${theme.colors.alpha.trueWhite[70]}`,
        }}
      ></Typography>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: theme.spacing(0),
          color: `${theme.colors.alpha.trueWhite[70]}`,
          top: theme.spacing(0),
          background: `${theme.colors.alpha.trueWhite[10]}`,

          "&:hover": {
            color: `${theme.colors.alpha.trueWhite[100]}`,
            background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
          },
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <UnfoldMoreTwoToneIcon fontSize="small" />
      </IconButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
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
            <UserBoxLabel className="popoverTypo" variant="body1">
              {user.userInfo.name}
            </UserBoxLabel>
            <UserBoxDescription
              className="popoverTypo"
              variant="body2"
            ></UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            href={`${pathCurrentOrNextNavigate()}/management/users/single/1`}
            component={Link}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Profile")} />
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            href={`${pathCurrentOrNextNavigate()}
            }/applications/mailbox/inbox`}
            component={Link}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Inbox")} />
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            href={`${pathCurrentOrNextNavigate()}
            }/applications/projects-board`}
            component={Link}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Projects")} />
          </ListItem>
        </List>
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
    </Box>
  );
}

export default SidebarTopSection;
