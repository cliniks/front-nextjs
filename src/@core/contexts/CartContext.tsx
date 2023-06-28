import { CartResponse, Coupon } from "ecommersys/dist/Entities";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { sdk } from "@core/sdkProvider";

import { useSDK } from "./sdkContext";
import { api } from "@/services/axiosInstance";
import { useWebsocket } from "./WebsocketContext";
import { useRouter } from "next/router";
import { useUser } from "@core/hooks/contexstHooks";

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const { user } = useUser();
  const { connected } = useSDK();
  const [cart, setCart] = useState<CartResponse>(initialCart);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [pix, setPix] = useState<PixReturn>(null);
  const [boleto, setBoleto] = useState<Object | null>(null);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [billingType, setBillingType] = useState<billingTypes>("PIX");
  const [transaction, setTransaction] = useState(null);
  const [statusPaymentConfirm, setStatusPaymentConfirm] =
    useState<boolean>(false);
  const [uploadInjectable, setUploadInjectable] = useState<
    Partial<uploadInjectableType>[]
  >([]);
  const [shipping, setShipping] = useState<Partial<shippingType>[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useRouter();
  const { socket } = useWebsocket();

  useEffect(() => {
    console.log(open);
  }, [open]);

  const getMyCart = async () => {
    if (connected) {
      await sdk.User.cart.getMyCart(
        (res: any) => {
          setCart(res);
        },
        () => {}
      );
    }
  };

  const updateCarCount = (condition: string, index: number) => {
    if (index) {
      const updateProduct = Array.from(cart.products);
      updateProduct[index] = {
        ...updateProduct[index],
        amount:
          condition === "increment"
            ? updateProduct[index].amount + 1
            : condition === "remove"
            ? updateProduct[index].amount - updateProduct[index].amount
            : updateProduct[index].amount - 1,
      };

      if (updateProduct[index].amount === 0) updateProduct.splice(index, 1);

      let totalPrice = cart.totalPrice;

      totalPrice = updateProduct[index]
        ? condition === "increment"
          ? totalPrice + +updateProduct[index].price
          : totalPrice - +updateProduct[index].price
        : null;

      setCart((state) => ({ ...state, products: updateProduct, totalPrice }));
    } else {
      getMyCart();
    }
  };

  const incrementProduct = (productId: string, qnt?: number) => {
    const quantity = qnt ? qnt : 1;

    quantity >= 1
      ? sdk.User.cart.incrementProduct(
          { productId, cartId: cart._id, amount: quantity },
          () => {
            const productIndex = cart.products?.findIndex(
              (product) => product._id === productId
            );
            updateCarCount("increment", productIndex === -1 ? 0 : productIndex);
          },
          () => {
            toast("Erro ao adicionar o produto!", { type: "error" });
          }
        )
      : toast("Produto não esta disponivel", {
          type: "error",
        });
  };

  const decrementProduct = (productId: string, qnt?: number) => {
    sdk.User.cart.decrementProduct(
      { productId, cartId: cart._id, amount: qnt || 1 },
      (res: any) => {
        // updateCarCount("decrement", index);
        const productIndex = cart.products.findIndex(
          (product) => product._id === productId
        );
        updateCarCount("decrement", productIndex);
      }
    );
  };

  const removeProduct = async (productId: string, qnt?: number) => {
    await api.patch(`/carts/removeProduct/${cart._id}`, {
      cartId: cart._id,
      productId: productId,
    });
    const productIndex = cart.products.findIndex(
      (product) => product._id === productId
    );
    updateCarCount("remove", productIndex);
  };

  const insertCoupon = (id: string) => {
    sdk.User.cart.insertCoupon(
      { couponId: id },
      (res: any) => {
        getMyCart();
      },
      () => {
        toast("Não foi possível validar cupom inserido", { type: "warning" });
      }
    );
  };

  const confirmPaymentPix = (paymentId: string) => {
    socket
      .off(`confirmPix/${paymentId}`)
      .on(`confirmPix/${paymentId}`, (data) => {
        setStatusPaymentConfirm(
          ["CONFIRMED", "RECEIVED"].includes(data.payment.status)
        );
        socket.off(`confirmPix/${paymentId}`);

        setTimeout(() => {
          navigate.replace(
            `/dashboard/user/requests/${data.payment.externalReference}`
          );
        }, 1000);
      });
  };

  const handleGenPag = async (
    cardPaymentSelected?: string,
    installmentSelected?: number
  ) => {
    setLoadingTransaction(true);

    const cardData = {
      cardToken: cardPaymentSelected || "",
      installmentCount: installmentSelected || "",
    };

    try {
      const gen = await api.post("/sales/genPayment", {
        billingType,
        documents: uploadInjectable,
        ...cardData,
        shipping,
      });

      setTransaction(gen.data);

      if (billingType === "BOLETO") {
        setBoleto(gen.data);
        setLoadingTransaction(false);
        setStatusPaymentConfirm(true);
        toast("Boleto gerado com sucesso!", { type: "success" });
      }

      if (billingType === "CREDIT_CARD") {
        if (["CONFIRMED"].includes(gen.data.generatePayment.status)) {
          setLoadingTransaction(false);
          setStatusPaymentConfirm(true);

          setTimeout(() => {
            navigate.replace(
              `/dashboard/user/requests/${gen.data.insertOnRepo.id}`
            );
          }, 3000);
        }

        toast("Compra efetuada com sucesso!", { type: "success" });
      }

      if (billingType === "PIX") {
        confirmPaymentPix(gen.data.insertOnRepo._id);
        setLoadingTransaction(false);
        setPix(gen.data.getQRCodePix);
      }
    } catch (err: any) {
      console.log("err", err.response);
      setLoadingTransaction(false);
      toast("Erro ao Concluir Pagamento!", { type: "error" });
    }
  };

  useEffect(() => {
    if (user?._id) getMyCart();
  }, [user]);

  const values: CartValues = {
    cart,
    getMyCart,
    incrementProduct,
    decrementProduct,
    coupons,
    insertCoupon,
    pix,
    boleto,
    setCoupons,
    setPix,
    transaction,
    loadingTransaction,
    setLoadingTransaction,
    billingType,
    setBillingType,
    handleGenPag,
    statusPaymentConfirm,
    uploadInjectable,
    setUploadInjectable,
    shipping,
    setShipping,
    setOpen,
    open,
    removeProduct,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

type CartValues = {
  cart: CartResponse | null;
  getMyCart: () => void;
  incrementProduct: (productId: string, qnt?: number) => void;
  decrementProduct: (productId: string, qnt?: number) => void;
  removeProduct: (productId: string, qnt?: number) => void;
  coupons: Coupon[] | null;
  setCoupons: React.Dispatch<SetStateAction<Coupon[]>>;
  insertCoupon: (id: string) => void;
  pix: PixReturn | null;
  boleto: any;
  transaction: any;
  setPix: React.Dispatch<SetStateAction<PixReturn>>;
  loadingTransaction: boolean;
  setLoadingTransaction: React.Dispatch<SetStateAction<boolean>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  billingType: billingTypes | null;
  setBillingType: React.Dispatch<SetStateAction<billingTypes>>;
  handleGenPag: (
    cardPaymentSelected?: string,
    installmentSelected?: number
  ) => void;
  statusPaymentConfirm: boolean;
  uploadInjectable: Partial<uploadInjectableType>[];
  setUploadInjectable: React.Dispatch<
    SetStateAction<Partial<uploadInjectableType>[]>
  >;
  shipping: Partial<shippingType>[];
  setShipping: React.Dispatch<SetStateAction<Partial<shippingType>[]>>;
};

const initialCart: CartResponse = {
  owner: "",
  isActive: false,
  totalPrice: 0,
  products: [],
  coupons: [],
  totalDiscount: 0,
};

export type PixReturn = {
  success: true;
  encodedImage: string;
  expirationDate: string;
  payload: string;
};

export type billingTypes =
  | "BOLETO"
  | "CREDIT_CARD"
  | "UNDEFINED"
  | "TRANSFER"
  | "DEPOSIT"
  | "PIX";

export type uploadInjectableType = {
  docId: string;
  productId: string[];
  docUrl: string;
};

export type shippingType = {
  storeId: string;
  shippingSelected: Object;
};

const initialValues = {
  cart: null,
  getMyCart: () => null,
  incrementProduct: (productId: string, qnt?: number) => null,
  decrementProduct: (productId: string, qnt?: number) => null,
  removeProduct: (productId: string, qnt?: number) => null,
  coupons: [],
  setCoupons: () => null,
  insertCoupon: (id: string) => null,
  pix: null,
  boleto: null,
  transaction: null,
  setPix: () => null,
  loadingTransaction: false,
  setLoadingTransaction: () => null,
  setOpen: () => null,
  open: false,
  billingType: null,
  setBillingType: () => null,
  handleGenPag: () => null,
  statusPaymentConfirm: false,
  uploadInjectable: [],
  setUploadInjectable: () => null,
  shipping: [],
  setShipping: () => null,
};

const CartContext = createContext<CartValues>(initialValues);

export const useCart = () => CartContext && useContext(CartContext);
