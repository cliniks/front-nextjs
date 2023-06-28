export const headerConfigProdutos: headerTypeProdutos = {
  name_product: "Product name",
  sku: "SKU",
  price: "Price",
  stock: "Stock",
  rating: "Rating",
  orders: "Orders",
  categories: "Categories",
  changedIn: "Changed in",
  actions: "Actions",
};

type headerTypeProdutos = {
  name_product: string;
  sku: string;
  price: string;
  stock: string;
  actions: string;
  rating: string;
  categories: string;
  changedIn: string;
  orders: string;
};
