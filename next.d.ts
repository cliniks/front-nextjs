import type { ReactElement, ReactNode } from "react";
import type {
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

declare module "next" {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    userAccess?: number;
    authGuard?: boolean;
    guestGuard?: boolean;
    setConfig?: () => void;
    getLayout?: (page: ReactElement) => ReactNode;
  };
  declare module "*.png";
  declare module "*.svg";
  declare module "*.jpeg";
  declare module "*.jpg";
  declare module "*.webp";
}
