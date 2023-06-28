import { api } from "../../services/axiosInstance";

const validateToken: any = async (accessToken?: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const getTokenVerifyed = await api.post("/auth/verifyToken", { token });
    // const getTokenVerify = sdk.Global.
    return getTokenVerifyed.data;
  } catch (err) {
    throw new Error("Não foi possível reconhecer esse token");
  }
};

export { validateToken };
