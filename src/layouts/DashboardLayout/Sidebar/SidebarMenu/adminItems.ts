import { AnalyticsTwoTone, StorefrontTwoTone } from "@mui/icons-material";
import { MenuItems, sellerItems } from "./items";

export const adminItems: MenuItems[] = [
  {
    heading: "Administração",
    items: [
      {
        name: "Minha Área",
        icon: AnalyticsTwoTone,
        link: "dashboard",
        items: [
          {
            name: "Inicio",
            link: "admin/resume",
          },
          {
            name: "Acompanhamento",
            items: [
              {
                name: "Clientes",
                link: "admin/clients",
              },
              {
                name: "Pedidos",
                link: "admin/orders",
              },
              {
                name: "Lojas",
                link: "admin/stores",
              },
            ],
          },
          {
            name: "Área de Criação",
            items: [
              {
                name: "Categorias",
                link: "admin/categories",
              },
              {
                name: "Coupons",
                link: "admin/coupons",
                disabled: false,
              },
            ],
          },
          {
            name: "Gerenciamento",
            items: [
              {
                name: "Files",
                link: "admin/files",
              },
              {
                name: "Lojas",
                link: "admin",
                items: [
                  { name: "Solicitações", link: "admin/store/solicitations" },
                ],
              },
              {
                name: "Regras de comissão",
                link: "admin/commission",
                disabled: false,
              },
              {
                name: "Notificações",
                link: "admin/notifications",
                disabled: false,
              },
            ],
          },

          // {
          //   name: "Banking",
          //   link: "admin/banking",
          //   disabled: true,
          // },
        ],
      },
    ],
  },
  ...sellerItems,
];
