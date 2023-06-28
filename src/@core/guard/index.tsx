import AuthGuard from "@core/components/auth/AuthGuard";
import GuestGuard from "@core/components/auth/GuestGuard";
import { Spinner } from "@core/components/Spinner";
import { ReactNode } from "react";

const Guard = ({ children, authGuard, userAccess }: GuardProps) => {
  if (!userAccess && !authGuard) return <>{children}</>;
  if (authGuard)
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;

  return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
};

export default Guard;

type GuardProps = {
  authGuard: boolean;
  userAccess: number;
  children: ReactNode;
};
