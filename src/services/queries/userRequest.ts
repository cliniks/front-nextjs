import { removeUserToken } from "@core/utils/token";
import { api } from "../axiosInstance";

const userRequests: UserRequests = {
  getMyUser: async () => {
    try {
      const getMy: any = await api.get("/users/getMyUser");
      const { data } = getMy;
      return data;
    } catch (err) {
      console.log("getUser:", err);
      removeUserToken();
    }
  },
  getUser: async (key: string, value: any) => {
    try {
      const getOne: any = await api.get("/users", { params: { key, value } });
      const { data } = getOne;
      return data;
    } catch (err) {
      console.log("getUser:", err);
      removeUserToken();
    }
  },
  updateMyUserInfo: async (data: Object) => {
    try {
      return "";
    } catch (err) {
      return err;
    }
  },
  updateMyImage: async (img: Object) => {
    try {
      return "";
    } catch (err) {
      return err;
    }
  },
};

export { userRequests };

export interface UserRequests {
  getMyUser(): Promise<any>;
  getUser(key: string, value: any): Promise<any>;
  updateMyUserInfo(data: Object): Promise<any>;
  updateMyImage(img: Object): Promise<any>;
}
