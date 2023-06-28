import { ChangeEvent, useRef, useState } from "react";

import {
  alpha,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Tabs,
  Card,
  Popover,
  useTheme,
  styled,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";

import RouterLink from "next/link";

import Scrollbar from "@core/components/Scrollbar";
import Text from "@core/components/Text";

import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import { useTranslation } from "react-i18next";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import { useNotifications } from "@core/contexts/NotificationsContext";

import { showDateTimeString } from "@core/utils/functions";

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const { userAllNotificationsTimeline } = useNotifications();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t("Notifications")}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiBadge-badge": {
              background: theme.colors.success.main,
              animation: "pulse 1s infinite",
              transition: `${theme.transitions.create(["all"])}`,
            },
          }}
        >
          <IconButtonWrapper
            sx={{
              background: alpha(theme.colors.primary.main, 0.1),
              transition: `${theme.transitions.create(["background"])}`,
              color: theme.colors.primary.main,

              "&:hover": {
                background: alpha(theme.colors.primary.main, 0.2),
              },
            }}
            color="primary"
            ref={ref}
            onClick={handleOpen}
          >
            <NotificationsActiveTwoToneIcon fontSize="small" />
          </IconButtonWrapper>
        </Badge>
      </Tooltip>
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
        <Box minWidth={440} maxWidth={440} p={2}>
          <BoxComposed
            mb={2}
            sx={{
              borderRadius: `${theme.general.borderRadius}`,
              background: `${theme.colors.gradients.pink2}`,
            }}
          >
            <BoxComposedBg
              sx={{
                opacity: 0.7,
                background: `${theme.colors.gradients.pink2}`,
              }}
            />
            <BoxComposedImage
              sx={{
                opacity: 0.2,
                backgroundImage:
                  'url("/static/images/placeholders/covers/1.jpg")',
              }}
            />
            <BoxComposedContent py={3}>
              <Typography
                textAlign="center"
                sx={{
                  pb: 0.5,
                }}
                variant="h4"
              >
                {t("Notifications")}
              </Typography>

              <Typography textAlign="center" variant="subtitle2">
                Você tem{" "}
                {userAllNotificationsTimeline?.length > 1 &&
                userAllNotificationsTimeline?.length === 0
                  ? `${userAllNotificationsTimeline?.length} mensagens`
                  : `${userAllNotificationsTimeline?.length} mensagem`}
              </Typography>
            </BoxComposedContent>
          </BoxComposed>
        </Box>
        <Divider />
        <Box
          sx={{
            height: 220,
          }}
        >
          <Scrollbar>
            <Box p={3}>
              {userAllNotificationsTimeline.map((notify) => (
                <Card
                  key={notify._id}
                  sx={{
                    overflow: "visible",
                    position: "relative",
                    p: 2,
                    mb: "5px",
                  }}
                  variant="outlined"
                >
                  <DividerVertialPrimary />
                  <Box display="grid">
                    <Typography
                      color="text.primary"
                      variant="h4"
                      fontWeight="bold"
                      mb="3px"
                    >
                      {notify.title}
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="h4"
                      fontWeight="normal"
                    >
                      {notify.message}
                    </Typography>
                  </Box>
                  <Box mt={1.5} display="flex" alignItems="center">
                    {notify.path && (
                      <LabelPrimary sx={{ mr: 1 }}>
                        <Link
                          color="#FFFF"
                          component={RouterLink}
                          target="_blank"
                          href={`${notify.path}`}
                        >
                          {t("Abrir")}
                        </Link>
                      </LabelPrimary>
                    )}

                    <Text flex color="success">
                      <AccessTimeTwoToneIcon
                        sx={{
                          mr: 0.5,
                        }}
                        fontSize="small"
                      />
                      {showDateTimeString(notify.startDate)}
                    </Text>
                  </Box>
                </Card>
              ))}
            </Box>
          </Scrollbar>
        </Box>

        <Box
          p={2}
          sx={{
            textAlign: "center",
          }}
        ></Box>
      </Popover>
    </>
  );
}

export default HeaderNotifications;

const BoxComposed = styled(Box)(
  () => `
  position: relative;
`
);

const BoxComposedContent = styled(Box)(
  ({ theme }) => `
  position: relative;
  z-index: 7;

  .MuiTypography-root {
      color: ${theme.palette.primary.contrastText};

      & + .MuiTypography-root {
          color: ${alpha(theme.palette.primary.contrastText, 0.7)};
      }
  }
  
`
);

const BoxComposedImage = styled(Box)(
  () => `
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  filter: grayscale(80%);
  background-size: cover;
  height: 100%;
  width: 100%;
  border-radius: inherit;
`
);

const BoxComposedBg = styled(Box)(
  () => `
  position: absolute;
  left: 0;
  top: 0;
  z-index: 6;
  height: 100%;
  width: 100%;
  border-radius: inherit;
`
);

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
      overflow: visible !important;

      .MuiTabs-scroller {
          overflow: visible !important;
      }

      .MuiButtonBase-root {
          text-transform: uppercase;
          font-size: ${theme.typography.pxToRem(12)};

          &:last-child {
            margin-right: 0;
          }
      }
  `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color: ${theme.colors.success.main};
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
      margin: 0 auto ${theme.spacing(2)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(42)};
      }
`
);

const LabelPrimary = styled(Box)(
  ({ theme }) => `
    font-weight: bold;
    border-radius: ${theme.general.borderRadiusSm};
    background: ${theme.colors.primary.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    padding: ${theme.spacing(0.5, 1.5)};
    color: ${theme.palette.primary.contrastText};
`
);

const DividerVertialPrimary = styled(Box)(
  ({ theme }) => `
  height: 60%;
  width: 6px;
  left: -3px;
  border-radius: 50px;
  position: absolute;
  top: 20%;
  background: ${theme.colors.primary.main};
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  border-radius: ${theme.general.borderRadiusLg};
`
);
