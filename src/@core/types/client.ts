import { userInfo } from "ecommersys/dist/Entities";

export interface client {
  clientEmail: string;
  clientId: string;
  clientImg: string;
  clientName: string;
  clientPhone: string;
  gatewayPagId: string;
  orders: string[];
  totalBuyed: number;
}

export type ClientType = {
  clientEmail: string;
  clientId: string;
  clientImg: string;
  clientName: string;
  clientPhone: string;
  gatewayPagId: string;
  orders: string[];
  totalBuyed: number;
};

export type AdminClientType = {
  _id: string;
  access: number;
  img: string;
  isActive: boolean;
  likes: string[];
  password: string;
  statistics: string[];
  updatedAt: string;
  userInfo: userInfo;
  username: string;
  wishList: string[];
  __v: string;
  favorites: string[];
  createdAt: number;
};
