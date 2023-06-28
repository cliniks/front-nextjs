import { Box } from "@mui/material";
import HeaderNotifications from "./Notifications";
import LanguageSwitcher from "./LanguageSwitcher";
import Chat from "./Chat";
import Carshop from "./CarShop";

function HeaderButtons() {
  return (
    <Box>
      <Carshop />
      <HeaderNotifications />
      <LanguageSwitcher />
      <Chat />
    </Box>
  );
}

export default HeaderButtons;
