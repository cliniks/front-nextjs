import { lazy, Suspense } from "react";
import SuspenseLoader from "@core/components/SuspenseLoader";

export const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// export const LoginPage = Loader(lazy(() => import("../../pages/login")));

// export const HomePage = Loader(lazy(() => import("../../pages/home")));

// export const Lojas = Loader(lazy(() => import("../../pages/lojas")));

// export const RegisterPage = Loader(lazy(() => import("../../pages/register")));

// export const Banking = Loader(
//   lazy(() => import("src/components/Dashboard/Banking"))
// );

// export const Product = Loader(
//   lazy(() => import("src/components/Dashboard/Products"))
// );

// export const CreateProduct = Loader(
//   lazy(() => import("src/components/Dashboard/Products/create"))
// );
export const SingleProduct = Loader(
  lazy(() => import("@/views/Products/single"))
);
// export const ShopProducts = Loader(
//   lazy(() => import("src/components/Dashboard/Products/shop"))
// );
// export const WishList = Loader(
//   lazy(() => import("src/components/Dashboard/Products/wishlist"))
// );
// export const Politics = Loader(
//   lazy(() => import("src/components/Dashboard/Products/politics"))
// );

// //Dashboard admin
// export const HomeDashboardAdmin = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Home"))
// );

// //cupons
// export const Coupons = Loader(
//   lazy(() => import("src/components/Dashboard/Coupons"))
// );
// export const CreateCoupons = Loader(
//   lazy(() => import("src/components/Dashboard/Coupons/create"))
// );

// //categories
// export const Categories = Loader(
//   lazy(() => import("src/components/Dashboard/Categories"))
// );
// export const CreateCategories = Loader(
//   lazy(() => import("src/components/Dashboard/Categories/create"))
// );

// //Políticas
// export const Policies = Loader(
//   lazy(() => import("src/components/Dashboard/Policies"))
// );
// export const CreatePolicies = Loader(
//   lazy(() => import("src/components/Dashboard/Policies/create"))
// );

// //clientes
// export const Clients = Loader(
//   lazy(() => import("src/components/Dashboard/Clients"))
// );
// export const ShowClient = Loader(
//   lazy(() => import("src/components/Dashboard/Clients/show"))
// );

// export const ShowClientOrder = Loader(
//   lazy(() => import("src/components/Dashboard/Clients/orders"))
// );

// //adminClientes
// export const adminClients = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Clients"))
// );
// export const adminShowClient = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Clients/show"))
// );

// export const adminShowClientEdit = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Clients/client"))
// );

// export const adminShowClientInvoice = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Clients/Invoice"))
// );

// export const adminShowClientOrder = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Clients/orders"))
// );

// //adminOders
// export const adminOrders = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Orders"))
// );
// export const adminShowOrderst = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Orders/single"))
// );
// export const adminShowInvoice = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Orders/Invoice"))
// );

// //Stores
// export const Stores = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores"))
// );
// export const ShowStores = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores/show"))
// );
// export const EditStores = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores/store"))
// );

// export const ShowOrder = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores/single"))
// );
// export const ShowInvoices = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores/Invoice"))
// );

// //pedidos
// export const Pedidos = Loader(
//   lazy(() => import("src/components/Dashboard/Orders"))
// );
// export const SinglePedidos = Loader(
//   lazy(() => import("src/components/Dashboard/Orders/single"))
// );
// export const Purchase = Loader(
//   lazy(() => import("src/components/Dashboard/Orders/purchase"))
// );
// export const StatusOrders = Loader(
//   lazy(() => import("src/components/Dashboard/Orders/status"))
// );

// export const InvoiceOrders = Loader(
//   lazy(() => import("src/components/Dashboard/Orders/Invoice"))
// );

// //Commissions
// export const Commission = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Commission"))
// );

// //Notifications
// export const Notifications = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Notifications"))
// );

// export const CreateNotifications = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Notifications/create"))
// );
// //Requests
// export const Requests = Loader(
//   lazy(() => import("src/components/Dashboard/Requests"))
// );
// export const SingleRequests = Loader(
//   lazy(() => import("src/components/Dashboard/Requests/single"))
// );

// export const InvoiceOrdersRequests = Loader(
//   lazy(() => import("src/components/Dashboard/Requests/Invoice"))
// );

export const Loja = Loader(lazy(() => import("@/views/Store")));

// //pedidos
// export const productStore = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/Stores/product"))
// );

// //ChatBox
// export const ChatBox = Loader(
//   lazy(() => import("src/components/Dashboard/Chatbox"))
// );

// //Checkout
// export const Checkout = Loader(
//   lazy(() => import("src/components/Dashboard/Checkout"))
// );

// //MyAccount
// export const MyAccount = Loader(
//   lazy(() => import("src/components/Dashboard/MyAccount"))
// );
// export const EditAccount = Loader(
//   lazy(() => import("src/components/Dashboard/MyAccount/EditProfilePage"))
// );

// export const StoreInfo = Loader(
//   lazy(() => import("src/components/Dashboard/MyAccount/StoreInfo"))
// );

// export const HomeDashboard = Loader(
//   lazy(() => import("src/components/Dashboard/Home"))
// );
// export const Files = Loader(
//   lazy(() => import("src/components/Dashboard/FileManager"))
// );

// export const AdminFiles = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/FileManager"))
// );

// export const Solicitations = Loader(
//   lazy(() => import("src/components/Dashboard/Admin/ListSellerSolicitation"))
// );

// export const SolicitationsView = Loader(
//   lazy(
//     () => import("src/components/Dashboard/Admin/ListSellerSolicitation/single")
//   )
// );

// export const Messenger = Loader(
//   lazy(() => import("src/components/Dashboard/Chatbox"))
// );

// export const Calendar = Loader(
//   lazy(() => import("src/components/Dashboard/Calendar"))
// );
