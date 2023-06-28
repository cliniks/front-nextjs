import { api } from "../axiosInstance";

const productsRequests: { getProducts: Function; getSingleProduct: Function } =
  {
    getProducts: async () => {
      const { data } = await api.get("/products/all");
      return data;
    },
    getSingleProduct: async (id: string) => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
  };
export { productsRequests };
