import { getUserToken } from "./token";
import decode from "jwt-decode";

const getUserId = () => {
  const token = getUserToken();
  const decoded = decode<any>(token ? token : "");
  const userId = decoded._id;
  return { userId };
};

export { getUserId };
