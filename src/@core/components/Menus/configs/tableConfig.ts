export const headerConfig: { name: string }[] = [
  { name: "Code" },
  { name: "Type" },
  { name: "Amount" },
  { name: "Store" },
  { name: "Limit of use" },
  { name: "Expiration date" },
  { name: "Actions" },
];

export const headerConfigCLients: { name: string }[] = [
  { name: "Nome" },
  { name: "User" },
  { name: "E-mail" },
  { name: "Store" },
  { name: "Localization" },
  { name: "Requests" },
  { name: "Money spent" },
  { name: "Last wish" },
  { name: "Actions" },
];

export const headerConfigPedidos: { name: string }[] = [
  { name: "Pedido" },
  { name: "Comprado" },
  { name: "Vendas brutas" },
  { name: "Datas" },
  { name: "Actions" },
];

export const HaderListagemPedidosGeral: { name: string }[] = [
  { name: "Pedido" },
  { name: "Compras" },
  { name: "Endereço de Cobrança" },
  { name: "Endereço de Entrega" },
  { name: "Vendas brutas" },
  { name: "Taxas de ADM" },
  { name: "Datas" },
  { name: "Actions" },
];
export const ConfigHeaderCLients: headerTypeClients = {
  _id: "Code",
  name: "Nome",
  user: "User",
  e_mail: "E-mail",
  store: "Store",
  localization: "Localization",
  requests: "Requests",
  money_spent: "Money spent",
  last_wish: "Last wish",
  actions: "Actions",
};

type headerTypeClients = {
  _id: string;
  name: string;
  user: string;
  e_mail: string;
  store: string;
  localization: string;
  requests: string;
  money_spent: string;
  last_wish: string;
  actions: string;
};
