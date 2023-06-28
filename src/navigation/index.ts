// ** Type import
import { adminItems } from "./adminItems";
import { clientItems } from "./clientItems";
import { attendantItems } from "./attendantItems";
import { partnerItems } from "./partnerItems";

const navigation = (type: any) => {
  const navItems = {
    admin: adminItems,
    client: clientItems,
    attendant: attendantItems,
    partner: partnerItems,
  };

  return navItems[type];
};

export default navigation;
