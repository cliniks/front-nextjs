export interface Product {
  id?: string;
  name?: string;
  price?: number;
  sale_price?: number;
  stock?: number;
  rating?: number;
  images?: string[];
  orders?: number;
  summary?: string;
  description?: string;
  categories?: string[];
}

export type ProductType = {
  _id?: string;
  name: string;
  description: string;
  price: string;
  imgs: string[];
  partners: string[];
  virtualProduct: boolean;
  shippingInfo: {
    height: String;
    width: String;
    weight: String;
  };
  owner: string;
  discount: discountType[];
  status: boolean;
  categories: string[];
  statistics: {
    likes: number;
    likers: string[];
    views: number;
    favorite: number;
    favorites: string[];
    buys: number;
  };
  stockInfo: {
    qnt: number;
    sku: string;
    SoldIndividually: boolean;
  };
  tags: string[];
  hangTags: string[];
  register?: Date;
};

export type discountType = {
  key: string[];
  type: string;
  active: boolean;
  percentage: number;
};
