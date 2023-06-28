import { api } from "../axiosInstance";

export const globalsRequests: UserRequests = {
  uploadImage: async (formdata: FormData) => {
    try {
      const addImg: any = await api.post("/globals/addImage", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = addImg;
      return data;
    } catch (err) {
      console.log("getUser:", err);
    }
  },
  getCnpj: async (cnpj: string): Promise<any> => {
    const cnpjReajust = cnpj
      .split("")
      .filter((item) => {
        if (!item.includes(".") && !item.includes("-") && !item.includes("/"))
          return true;
      })
      .join("")
      .toString();

    const cnpjData = await api.get(
      `https://publica.cnpj.ws/cnpj/${cnpjReajust}`
    );
    return cnpjData.data;
  },
};

export interface UserRequests {
  uploadImage(file: FormData): Promise<string>;
  getCnpj(cnpj: string): Promise<any>;
}
