import { ToastContainer } from "react-toastify";
import ThemeProviderWrapper from "@/theme/ThemeProvider";
import { SDKProvider } from "./sdkContext";
import { AuthProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { WebsocketProvider } from "./WebsocketContext";
import CartShop from "@core/components/Drawers/CartShop";
import { CssBaseline } from "@mui/material";
import { ProductsProvider } from "./productsContext";
import { NotificationsProvider } from "./NotificationsContext";

export const ContextInjectionProvider = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <>
      <ThemeProviderWrapper>
        <CssBaseline />
        <SDKProvider>
          <AuthProvider>
            <ProductsProvider>
              <WebsocketProvider>
                <NotificationsProvider>
                  <CartProvider>
                    <CartShop />
                    {children}
                    <ToastContainer
                      position="top-right"
                      autoClose={1000}
                      hideProgressBar={false}
                      newestOnTop={true}
                      closeOnClick
                    />
                  </CartProvider>
                </NotificationsProvider>
              </WebsocketProvider>
            </ProductsProvider>
          </AuthProvider>
        </SDKProvider>
      </ThemeProviderWrapper>
    </>
  );
};
