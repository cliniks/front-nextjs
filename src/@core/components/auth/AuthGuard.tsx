// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useUser } from "@core/contexts/UserContext";
import { getUserToken } from "@core/utils/token";
import { api } from "@/services/axiosInstance";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const { isAuthenticated, user, getMyUser, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (!user) logout();
    }
  }, [isAuthenticated, user]);

  const verifyUser = async () => {
    const getToken = getUserToken();
    if (!getToken) {
      router.push({
        pathname: "/login",
      });
      return;
    }

    if (user) return;

    const getUser = await api.post("auth/verifyToken", { token: getToken });

    if (!getUser.data) {
      console.log("usuário não encontrado");
      router.push({
        pathname: "/login",
      });
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    verifyUser();
  }, [router.route]);

  // if (loading || user === null) {
  //   return fallback;
  // }

  return <>{children}</>;
};

export default AuthGuard;
