import { UserContext } from "@core/contexts/UserContext";
import { useContext } from "react";

export const useUser = () => useContext(UserContext);
