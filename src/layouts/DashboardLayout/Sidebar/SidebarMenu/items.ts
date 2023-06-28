import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import { SignalCellularAlt } from "@mui/icons-material";

export interface MenuItem {
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;
  disabled?: boolean;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: "",
    items: [
      {
        name: "Dashboard",
        icon: SignalCellularAlt,
        link: "/dashboard",
        items: [
          {
            name: "Início",
            link: "inicio",
          },
          {
            name: "Produtos",
            link: "products",
          },
          {
            name: "Checkout",
            link: "checkout",
          },
          {
            name: "Cupons",
            link: "coupons",
            items: [
              {
                name: "Listar",
                link: "/dashboard/coupons",
              },
              {
                name: "Criar",
                link: "/dashboard/coupons/create",
              },
            ],
          },

          {
            name: "Categorias",
            link: "categories",
            items: [
              {
                name: "Listar",
                link: "/dashboard/categories/list",
              },
              {
                name: "Criar",
                link: "/dashboard/categories/create",
              },
            ],
          },
          {
            name: "Clientes",
            link: "clients",
          },
          {
            name: "Solicitations",
            link: "solicitations",
          },
          {
            name: "Orders",
            link: "orders",
            items: [
              // {
              //   name: "Listar",
              //   link: "/dashboard/orders",
              // },
              {
                name: "Faturas",
                link: "/dashboard/orders/faturas",
              },
            ],
          },
          {
            name: "Pagamentos",
            link: "banking",
          },

          {
            name: "Loja do Vendedor",
            link: "store",
          },

          {
            name: "Cadastro de Políticas",
            link: "policies",
          },

          {
            name: "Chatbox",
            link: "chatbox",
          },
          {
            name: "Relatórios",
            link: "reports",
          },
        ],
      },
      // {
      //   name: "Learning",
      //   link: "/dashboard/learning",
      // },
      // {
      //   name: "Tasks",
      //   link: "/dashboard/tasks",
      // },
    ],
  },
  {
    heading: "Configuração",
    items: [
      {
        name: "Usuário",
        icon: AssignmentIndTwoToneIcon,
        link: "/management/users",
        items: [
          // {
          //   name: "List",
          //   link: "management/users/list",
          // },
          {
            name: "User Profile",
            link: "management/users/single",
          },
        ],
      },
      // {
      //   name: "Projects",
      //   icon: AccountTreeTwoToneIcon,
      //   link: "/management/projects/list",
      // },
      {
        icon: StorefrontTwoToneIcon,
        name: "Ser Vendedor",
        link: "management/commerce/beASeller",
      },
    ],
  },
];

export * from "./sellerItems";

export * from "./userItems";

export * from "./adminItems";

export default menuItems;
