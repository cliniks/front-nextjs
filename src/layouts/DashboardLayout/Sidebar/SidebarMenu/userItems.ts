import { AnalyticsTwoTone } from "@mui/icons-material";
import { MenuItems } from "./items";

export const userItems: MenuItems[] = [
  {
    heading: "Perfil Cliente",
    items: [
      {
        name: "Minha Conta",
        icon: AnalyticsTwoTone,
        link: "/dashboard",
        items: [
          {
            name: "Perfil",
            link: "/dashboard/user/myAccount",
          },
          {
            name: "Pedidos",
            link: "/dashboard/user/requests",
          },
          {
            name: "File Manager",
            link: "/dashboard/user/files",
          },
          {
            name: "Chatbox",
            link: "/dashboard/user/chatbox",
          },
          {
            name: "Ser Vendedor",
            link: "/dashboard/user/storeSolicitation",
          },
          // {
          //   name: "Banking",
          //   link: "banking",
          // },
        ],
      },
    ],
  },
  // {
  //   heading: "Configuração",
  //   items: [
  //     {
  //       icon: StorefrontTwoTone,
  //       name: "Ser Vendedor",
  //       // link: "beSeller",
  //     },
  //   ],
  // },
];
