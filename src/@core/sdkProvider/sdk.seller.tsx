import { Seller } from "ecommersys";
import {
  Category,
  Checkout,
  Coupon,
  Product,
  Store,
  StorePolicy,
} from "ecommersys/dist/Entities";
import { notificationTypes } from "ecommersys/dist/Entities/notification.entitie";
import {
  filterProps,
  getAllProps,
  getAllReturn,
} from "ecommersys/dist/interfaces";
import { callbackNoPropsResolver, callbackResolver } from "src/Error";
import {
  getSingleProps,
  sdkNoPropsResolver,
  sdkResolver,
} from "src/types/requestTypes";

/**
 * Sdk Dashboard Categories Methods
 * -----------------------------------
 */
const getMyCategories: sdkResolver<
  getAllProps,
  getAllReturn<Category>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.category.getMyCategories,
    props,
    defaultCallback,
    errCallback
  );

const createSingleCategory: sdkResolver<Category, Category> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.category.create,
    props,
    defaultCallback,
    errCallback
  );

const getSingleCategory: sdkResolver<getSingleProps, Category> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.category.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const updateSingleCategory: sdkResolver<
  { categoryId: string; data: Partial<Category> },
  Category
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.category.update,
    props,
    defaultCallback,
    errCallback
  );

const cancelSingleCategory: sdkResolver<
  { categoryId: string },
  Category
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.category.cancel,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Dashboard Products Methods
 * -----------------------------------
 */
const getMyProducts: sdkResolver<getAllProps, getAllReturn<Product>> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.product.getMyProducts,
    props,
    defaultCallback,
    errCallback
  );

const createSingleProduct: sdkResolver<Product, Product> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.product.create,
    props,
    defaultCallback,
    errCallback
  );

const updateSingleProduct: sdkResolver<
  { productId: string; data: Partial<Product> },
  Product
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.product.update,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Dashboard Cupons Methods
 * -----------------------------------
 */
const getMyCoupons: sdkResolver<getAllProps, getAllReturn<Coupon>> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.coupon.getMyCoupons,
    props,
    defaultCallback,
    errCallback
  );

const createSingleCoupon: sdkResolver<Coupon, Coupon> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.coupon.create,
    props,
    defaultCallback,
    errCallback
  );

const getSingleCoupon: sdkResolver<getSingleProps, Coupon> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.coupon.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const updateSingleCoupon: sdkResolver<
  { couponId: string; data: Partial<Coupon> },
  Coupon
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.coupon.update,
    props,
    defaultCallback,
    errCallback
  );

const cancelSingleCoupon: sdkResolver<{ couponId: string }, Coupon> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.coupon.cancel,
    props,
    defaultCallback,
    errCallback
  );

const utilizeCoupon: sdkResolver<{ couponId: string }, Coupon> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.coupon.utilize,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Dashboard Checkout Methods
 * -----------------------------------
 */
const generateCheckout: sdkResolver<{ orderId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.checkout.generate,
    props,
    defaultCallback,
    errCallback
  );

const createCheckoutPayment: sdkResolver<
  { type: string; value: string; checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.checkout.createPayment,
    props,
    defaultCallback,
    errCallback
  );

const getSingleCheckout: sdkResolver<{ checkoutId: string }, Checkout> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.dashboard.checkout.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const confirmCheckoutPayment: sdkResolver<
  { checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.checkout.confirmPayment,
    props,
    defaultCallback,
    errCallback
  );

const updateCheckoutPayment: sdkResolver<
  { type: string; value: string; checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.checkout.updatePayment,
    props,
    defaultCallback,
    errCallback
  );

const cancelCheckoutOpen: sdkResolver<
  { checkoutId: string },
  Checkout
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.dashboard.checkout.cancelOpen,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Store Methods
 * -----------------------------------
 */
const getMyStore: sdkNoPropsResolver<Store> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    Seller.store.getMyStore,
    defaultCallback,
    errCallback
  );

const updateSellerInfo: sdkResolver<
  { id: string; data: Partial<Store> },
  Store
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Seller.store.updateSellerInfo,
    props,
    defaultCallback,
    errCallback
  );

const updateStoreBanner: sdkResolver<FormData, Store> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.store.updateStoreBanner,
    props,
    defaultCallback,
    errCallback
  );

const updateStoreImage: sdkResolver<FormData, Store> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Seller.store.updateStoreImage,
    props,
    defaultCallback,
    errCallback
  );

/**
 * Sdk Dashboard Policies Methods
 * -----------------------------------
 */
const getMyPolicies: sdkResolver<
  getAllProps,
  getAllReturn<StorePolicy>
> = async (props, defaultCallback) =>
  await callbackResolver(
    Seller.dashboard.policy.getMyPolicies,
    props,
    defaultCallback
  );

const createSinglePolicy: sdkResolver<StorePolicy, StorePolicy> = async (
  props,
  defaultCallback
) =>
  await callbackResolver(
    Seller.dashboard.policy.create,
    props,
    defaultCallback
  );

const getSinglePolicy: sdkResolver<getSingleProps, StorePolicy> = async (
  props,
  defaultCallback
) =>
  await callbackResolver(
    Seller.dashboard.policy.getSingle,
    props,
    defaultCallback
  );

const updateSinglePolicy: sdkResolver<
  {
    policyId: string;
    data: Partial<StorePolicy>;
  },
  StorePolicy
> = async (props, defaultCallback) =>
  await callbackResolver(
    Seller.dashboard.policy.update,
    props,
    defaultCallback
  );

const deleteSinglePolicy: sdkResolver<
  { policyId: string },
  StorePolicy
> = async (props, defaultCallback) =>
  await callbackResolver(
    Seller.dashboard.policy.delete,
    props,
    defaultCallback
  );

const getNotifications: sdkNoPropsResolver<notificationTypes[]> = async (
  defaultCallback,
  errCallback
) =>
  await callbackNoPropsResolver(
    Seller.notifications.mySellerNotifications,
    defaultCallback,
    errCallback
  );

export const SellerSdk = {
  dashboard: {
    category: {
      getMyCategories,
      getSingleCategory,
      createSingleCategory,
      updateSingleCategory,
      cancelSingleCategory,
    },
    product: {
      getMyProducts,
      createSingleProduct,
      updateSingleProduct,
    },
    coupon: {
      getMyCoupons,
      getSingleCoupon,
      createSingleCoupon,
      updateSingleCoupon,
      cancelSingleCoupon,
      utilizeCoupon,
    },
    checkout: {
      generateCheckout,
      createCheckoutPayment,
      getSingleCheckout,
      confirmCheckoutPayment,
      updateCheckoutPayment,
      cancelCheckoutOpen,
    },

    policy: {
      getMyPolicies,
      getSinglePolicy,
      createSinglePolicy,
      updateSinglePolicy,
      deleteSinglePolicy,
    },
  },
  notify: { getNotifications },
  store: { getMyStore, updateStoreBanner, updateSellerInfo, updateStoreImage },
};
