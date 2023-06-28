import { AccountBox, AnalyticsTwoTone } from "@mui/icons-material";
import { MenuItems } from "./items";
import { userItems } from "./userItems";

const user = userItems[0].items[0].items;

export const sellerItems: MenuItems[] = [
  {
    heading: "Perfil Lojista",
    items: [
      {
        name: "Sua Loja",
        icon: AnalyticsTwoTone,
        link: "/dashboard/",
        items: [
          {
            name: "Dashboard",
            link: "/dashboard/seller/inicio",
          },
          {
            name: "Visualizar loja",
            link: "/dashboard/seller/store",
          },
          {
            name: "Área de criação",
            items: [
              {
                name: "Produtos",
                link: "/dashboard/seller/products",
              },
              // {
              //   name: "Cupons",
              //   link: "/dashboard/seller/coupons",
              // },
            ],
          },
          {
            name: "Acompanhamento",
            items: [
              {
                name: "Pedidos",
                link: "/dashboard/seller/orders",
              },
              // {
              //   name: "Vendas",
              //   link: "invoices",
              // },
              {
                name: "Clientes",
                link: "/dashboard/seller/clients",
              },
              {
                name: "Chatbox",
                link: "/dashboard/seller/chatbox",
              },
              {
                name: "Relatórios",
                link: "/dashboard/seller/reports",
                disabled: true,
              },
            ],
          },

          {
            name: "Cadastro de Políticas",
            link: "/dashboard/seller/policies",
          },

          // {
          //   name: "Calendar",
          //   link: "applications/calendar",
          // },
        ],
      },
    ],
  },
  {
    heading: "Perfil Cliente",
    items: [{ name: "Sua Conta", icon: AccountBox, items: user }],
  },
];
