import { sdkNoPropsResolver, sdkResolver } from "src/types/requestTypes";
import {
  User as UserType,
  userInfo,
  StoreSolicitate,
  Cart,
  Checkout,
  Product,
  DocumentsType,
  CartResponse,
  Address,
} from "ecommersys/dist/Entities";
import { User } from "ecommersys";
import { authRes } from "ecommersys/dist/services";
import { callbackNoPropsResolver, callbackResolver } from "src/Error";
import { getAllReturn, getSingleProps } from "ecommersys/dist/interfaces";
import {
  PaymentMethodType,
  tokenizeType,
} from "ecommersys/dist/Entities/paymentMethod.entitie";
import { notificationTypes } from "ecommersys/dist/Entities/notification.entitie";

/**
 * Sdk User Methods
 * -----------------------------------
 */
const authUser: sdkResolver<
  { username: string; password: string },
  authRes
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.account.auth,
    props,
    defaultCallback,
    errCallback
  );

const getMyUser: sdkNoPropsResolver<UserType> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.account.getMyUser,
    defaultCallback,
    errCallback
  );

const createNewUser: sdkResolver<FormData, UserType> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.createNewUser,
    props,
    defaultCallback,
    errCallback
  );

const solicitSeller: sdkResolver<StoreSolicitate, StoreSolicitate> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.solicitSeller,
    props,
    defaultCallback,
    errCallback
  );

const verifyMySolicitation: sdkResolver<string, StoreSolicitate> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.verifySolicitation,
    props,
    defaultCallback,
    errCallback
  );

const updateUserImage: sdkResolver<{ id: string; img: any }, UserType> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.updateUserImage,
    props,
    defaultCallback,
    errCallback
  );

const updateUserInfo: sdkResolver<
  { id: string; data: Partial<userInfo> },
  UserType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.account.updateUserInfo,
    props,
    defaultCallback,
    errCallback
  );

const getMyAddress: sdkNoPropsResolver<getAllReturn<Address>> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.account.getMyAddress,
    defaultCallback,
    errCallback
  );

const getMyPaymentMethod: sdkNoPropsResolver<
  getAllReturn<PaymentMethodType>
> = async (defaultCallback, errCallback) =>
  await callbackNoPropsResolver(
    User.payment.myUserCards,
    defaultCallback,
    errCallback
  );

const deleteMyPaymentMethod: sdkResolver<
  { paymentId: string },
  PaymentMethodType
> = async ({ paymentId }, defaultCallback, errCallback) =>
  await callbackResolver(
    User.payment.deletePaymentMethod,
    paymentId,
    defaultCallback,
    errCallback
  );

const setDefaultAddress: sdkResolver<string, UserType> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.setDefaultAddress,
    props,
    defaultCallback,
    errCallback
  );

const addAddress: sdkResolver<Partial<Address>, Address> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.addAddress,
    props,
    defaultCallback,
    errCallback
  );

const updateAddress: sdkResolver<
  { addressId: string; data: Partial<Address> },
  Address
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.account.updateAddress,
    props,
    defaultCallback,
    errCallback
  );

const deleteAddress: sdkResolver<{ addressId: string }, Address> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.account.deleteAddress,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Cart Methods
 * -----------------------------------
 */

const clearMyCart: sdkNoPropsResolver<Cart> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.cart.clearMyCart,
    defaultCallback,
    errCallback
  );

const getMyCart: sdkNoPropsResolver<CartResponse> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.cart.getMyCart,
    defaultCallback,
    errCallback
  );

const insertAddress: sdkResolver<{ AddressId: string }, Cart> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.cart.insertAddress,
    props,
    defaultCallback,
    errCallback
  );

const addPaymentMethod: sdkResolver<tokenizeType, tokenizeType> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.payment.addPaymentMethod,
    props,
    defaultCallback,
    errCallback
  );

const insertCoupon: sdkResolver<{ couponId: string }, Cart> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.cart.insertCoupon,
    props,
    defaultCallback,
    errCallback
  );

const likeProduct: sdkResolver<string, Product> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.product.likeProduct,
    props,
    defaultCallback,
    errCallback
  );

const favoriteProduct: sdkResolver<string, Product> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.product.favoriteProduct,
    props,
    defaultCallback,
    errCallback
  );

const incrementProduct: sdkResolver<
  { productId: string; cartId: string; amount: number },
  Cart
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.cart.incrementProduct,
    props,
    defaultCallback,
    errCallback
  );

const decrementProduct: sdkResolver<
  { productId: string; cartId: string; amount: number },
  Cart
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.cart.decrementProduct,
    props,
    defaultCallback,
    errCallback
  );

const removeAddress: sdkResolver<{ AddressId: string }, Cart> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.cart.removeAddress,
    props,
    defaultCallback,
    errCallback
  );

const removeProduct: sdkResolver<{ productId: string }, Cart> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.cart.removeProduct,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Checkout Methods
 * -----------------------------------
 */
const createPayment: sdkResolver<
  { type: string; value: string; checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.checkout.createPayment,
    props,
    defaultCallback,
    errCallback
  );

const confirmPayment: sdkResolver<{ checkoutId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.checkout.confirmPayment,
    props,
    defaultCallback,
    errCallback
  );

const cancelOpen: sdkResolver<{ checkoutId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.checkout.cancelOpen,
    props,
    defaultCallback,
    errCallback
  );

const generatePayment: sdkResolver<{ orderId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.checkout.generate,
    props,
    defaultCallback,
    errCallback
  );

const getSingle: sdkResolver<{ checkoutId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.checkout.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const updatePayment: sdkResolver<
  { type: string; value: string; checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.checkout.updatePayment,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk User Products Methods
 * -----------------------------------
 */
const seeProduct: sdkResolver<{ productId: string }, Product> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.product.seeProduct,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk User Documents Methods
 * -----------------------------------
 */
const getMyDocuments: sdkNoPropsResolver<getAllReturn<DocumentsType>> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.document.getMyDocuments,
    defaultCallback,
    errCallback
  );

const addDocument: sdkResolver<Partial<DocumentsType>, DocumentsType> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    User.document.addDocument,
    props,
    defaultCallback,
    errCallback
  );

const getSingleDocument: sdkResolver<
  { documentId: string },
  DocumentsType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.document.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const updateDocument: sdkResolver<
  { documentId: string; data: Partial<DocumentsType> },
  DocumentsType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.document.updateDocument,
    props,
    defaultCallback,
    errCallback
  );

const deleteDocument: sdkResolver<
  { documentId: string },
  DocumentsType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    User.document.deleteDocument,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk User Notifications Methods
 * -----------------------------------
 */

const getNotifications: sdkNoPropsResolver<notificationTypes[]> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    User.notifications.myUserNotifications,
    defaultCallback,
    errCallback
  );

export const UserSdk = {
  dashboard: {},
  account: {
    authUser,
    getMyUser,
    createNewUser,
    solicitSeller,
    verifyMySolicitation,
    updateUserImage,
    updateUserInfo,
    setDefaultAddress,
    getMyAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    getMyPaymentMethod,
    deleteMyPaymentMethod,
  },
  cart: {
    clearMyCart,
    getMyCart,
    insertAddress,
    insertCoupon,
    incrementProduct,
    decrementProduct,
    removeAddress,
    removeProduct,
  },
  checkout: {
    createPayment,
    confirmPayment,
    cancelOpen,
    generatePayment,
    getSingle,
    updatePayment,
  },
  documents: {
    getMyDocuments,
    addDocument,
    getSingleDocument,
    updateDocument,
    deleteDocument,
  },
  order: {},
  product: {
    seeProduct,
    likeProduct,
    favoriteProduct,
  },
  notify: {
    getNotifications,
  },
};
