import { FC, useEffect, useState } from "react";
import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  BoxProps,
} from "@mui/material";
import SidebarMenuItem from "./item";
import {
  MenuItem,
  MenuItems,
  adminItems,
  sellerItems,
  userItems,
} from "./items";
import { useTranslation } from "react-i18next";
import { useUser } from "@core/contexts/UserContext";
import { sdk } from "@core/sdkProvider";
import { useRouter } from "next/router";

const renderSidebarMenuItems = ({
  name,
  items,
  path,
}: {
  name: string;
  items: MenuItem[];
  path: string;
}) => (
  <SubMenuWrapper typeMenu={name}>
    <List component="div">
      {items.reduce((ev, item) => reduceChildRoutes({ ev, item, path }), [])}
    </List>
  </SubMenuWrapper>
);

const reduceChildRoutes = ({
  ev,
  path,
  item,
}: {
  ev: any;
  path: string;
  item: MenuItem;
}): Array<JSX.Element> => {
  const key = item.name;
  const router = useRouter();

  const exactMatch = item.link ? router.route === path : false;

  if (item.items) {
    const partialMatch = item.link ? !!path.includes(item.link) : false;

    ev.push(
      <SidebarMenuItem
        key={key}
        active={partialMatch}
        open={partialMatch}
        name={item.name}
        disabled={item.disabled}
        icon={item.icon}
        link={item.link}
        badge={item.badge}
        badgeTooltip={item.badgeTooltip}
      >
        {renderSidebarMenuItems({
          name: item.name,
          path,
          items: item.items,
        })}
      </SidebarMenuItem>
    );
  } else {
    ev.push(
      <SidebarMenuItem
        key={key}
        active={exactMatch}
        name={item.name}
        disabled={item.disabled}
        link={item.link}
        badge={item.badge}
        badgeTooltip={item.badgeTooltip}
        icon={item.icon}
      />
    );
  }

  return ev;
};

function SidebarMenu() {
  const { user } = useUser();
  const { t }: { t: any } = useTranslation();
  const [menuAccess, setMenuAccess] = useState<MenuItems[]>(userItems);
  const router = useRouter();

  // useEffect(userAccessValidation, [user]);
  useEffect(() => {
    const access = { 1: userItems, 2: sellerItems, 99: adminItems };
    if (user.access === 2 || user.access === 99) {
      sdk.Seller.store.getMyStore((res) => {
        if (res.isActive) setMenuAccess(access[user.access]);
      });
    }
  }, [user]);

  return (
    <>
      {menuAccess.map((section) => (
        <>
          <MenuWrapper key={section.heading} typeMenu={section.heading}>
            <List
              component="div"
              subheader={
                <ListSubheader component="div" disableSticky>
                  {t(section.heading)}
                </ListSubheader>
              }
            >
              {renderSidebarMenuItems({
                name: section.heading,
                items: section.items,
                path: router.pathname,
              })}
            </List>
          </MenuWrapper>
        </>
      ))}
    </>
  );
}

export default SidebarMenu;

interface MyBox extends BoxProps {
  typeMenu: string;
}

export const MyBoxComponent: FC<MyBox> = (props) => <Box {...props} />;

const MenuWrapper = styled(MyBoxComponent)(
  (props) => `
  .MuiList-root {
    padding: ${props.theme.spacing(1)};

    & > .MuiList-root { 
      padding: 0 ${props.theme.spacing(0)} ${props.theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${props.theme.typography.pxToRem(12)};
      color: ${
        props?.typeMenu === "Administração"
          ? "#fff"
          : props.theme.colors.alpha.black[50]
      };
      padding: ${props.theme.spacing(0, 2.5)};
      line-height: 1.4;
      ${
        props?.typeMenu === "Administração"
          ? `
        color:#fff;
        background: #8d30e4;
        padding-top: 20px;
        padding-bottom: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      `
          : ""
      }
       
      }
    }
`
);

const SubMenuWrapper = styled(MyBoxComponent)(
  (props) => `
    .MuiList-root {

      ${
        props?.typeMenu === "Administração"
          ? `
        color:#fff;
        background: #aa53fc;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

      `
          : ""
      }

      

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${props.theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${props.theme.colors.primary.main};
            font-size: ${props.theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${
              props?.typeMenu === "Administração"
                ? "#fff"
                : props.theme.palette.primary.dark
            };
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${
            props?.typeMenu === "Administração"
              ? "#fff"
              : props.theme.palette.primary.dark
          };
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${props.theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${props.theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${
              props?.typeMenu === "Administração"
                ? "#fff"
                : props.theme.colors.alpha.black[30]
            };
            font-size: ${props.theme.typography.pxToRem(20)};
            margin-right: ${props.theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${
              props?.typeMenu === "Administração"
                ? "#fff"
                : props.theme.colors.alpha.black[50]
            };
            margin-left: auto;
            opacity: .8;
            font-size: ${props.theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(
              props.theme.colors.alpha.black[100],
              0.06
            )};

            color: ${
              props?.typeMenu === "Administração"
                ? "#fff"
                : props.theme.colors.alpha.black[100]
            };

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${
                props?.typeMenu === "Administração"
                  ? "#fff"
                  : props.theme.colors.alpha.black[100]
              };
              
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${props.theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${props.theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${props.theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${props.theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${props.theme.colors.alpha.black[100]};
                opacity: 0;
                transition: ${props.theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${props.theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }

     
    }
`
);
