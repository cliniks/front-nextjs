import { UserSdk } from "./sdk.user";
import { GlobalSdk } from "./sdk.global";
import { SellerSdk } from "./sdk.seller";
import * as AdminSdk from "./sdk.Admin";

export const sdk = {
  User: UserSdk,
  Global: GlobalSdk,
  Seller: SellerSdk,
  Admin: AdminSdk,
};
