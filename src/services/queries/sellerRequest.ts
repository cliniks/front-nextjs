import { api } from "../axiosInstance";

const sellerRequest: { dashboard: Function; getMySeller: Function } = {
  dashboard: async () => {
    try {
      const getMyDashboard: any = await api.get("/sellers/dashboard");
      const { data } = getMyDashboard;
      return data;
    } catch (err) {
      console.log("dashboard:", err);
    }
  },
  getMySeller: async () => {
    try {
      const getMySeller: any = await api.get("/sellers/");
      const { data } = getMySeller;
      return data;
    } catch (err) {
      console.log("getMySeller:", err);
    }
  },
};
export { sellerRequest };

export interface SellerRequests {
  dashboard(): Promise<any>;
  getMySeller(): Promise<any>;
}
