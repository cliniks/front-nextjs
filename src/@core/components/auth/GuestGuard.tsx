import { ReactNode, ReactElement, useEffect } from "react";

import { useRouter } from "next/router";
import { useUser } from "@core/hooks/contexstHooks";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, [router.route]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
