import { Global } from "ecommersys";

import { callbackNoPropsResolver, callbackResolver } from "src/Error";
import { getAllProps, getAllReturn } from "ecommersys/dist/interfaces";
import {
  getSingleProps,
  sdkNoPropsResolver,
  sdkResolver,
} from "src/types/requestTypes";
import { Category, Product, Store } from "ecommersys/dist/Entities";
import { notificationTypes } from "ecommersys/dist/Entities/notification.entitie";

const getLogs = () =>
  typeof Global.logs[0].updated === "string" &&
  console.log(Global.logs[0].updated);

const getAllProducts: sdkResolver<getAllProps, getAllReturn<Product>> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.products.getAll,
    props,
    defaultCallback,
    errCallback
  );

const uploadImage: sdkResolver<FormData, string> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.uploads.uploadImage,
    props,
    defaultCallback,
    errCallback
  );

const uploadDoc: sdkResolver<FormData, string> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.uploads.uploadDoc,
    props,
    defaultCallback,
    errCallback
  );

const getAllGlobalCategories: sdkResolver<
  getAllProps,
  getAllReturn<Category>
> = async (props, defaultCallback, errCallback) => {
  return await callbackResolver(
    Global.categories.getAllGlobals,
    props,
    defaultCallback,
    errCallback
  );
};
const getAllCategories: sdkResolver<
  getAllProps,
  getAllReturn<Category>
> = async (props, defaultCallback, errCallback) => {
  return await callbackResolver(
    Global.categories.getAll,
    props,
    defaultCallback,
    errCallback
  );
};

const getSingleProduct: sdkResolver<getSingleProps, Product> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.products.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const getAllSellers: sdkResolver<getAllProps, getAllReturn<Store>> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.sellers.getAll,
    props,
    defaultCallback,
    errCallback
  );

const getSingleSellers: sdkResolver<getSingleProps, Store> = async (
  props,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.sellers.getSingle,
    props,
    defaultCallback,
    errCallback
  );

const confirmEmailToken: sdkResolver<
  { email: string; code: number },
  string
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Global.emailSender.confirmEmailToken,
    props,
    defaultCallback,
    errCallback
  );

const sendEmailToken: sdkResolver<{ email: string }, string> = async (
  email,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.emailSender.sendEmailToken,
    email,
    defaultCallback,
    errCallback
  );

const getAllNotifications: sdkNoPropsResolver<
  getAllReturn<notificationTypes>
> = async (defaultCallback, errCallback) =>
  await callbackNoPropsResolver(
    Global.notifications.getAll,
    defaultCallback,
    errCallback
  );

const readNotification: sdkResolver<{ id: string }, notificationTypes> = async (
  id,
  defaultCallback,
  errCallback
) =>
  await callbackResolver(
    Global.notifications.readNotification,
    id,
    defaultCallback,
    errCallback
  );

export const GlobalSdk = {
  getLogs,
  getAllProducts,
  getSingleProduct,
  getAllCategories,
  getAllGlobalCategories,
  getAllSellers,
  getSingleSellers,
  uploadImage,
  uploadDoc,
  confirmEmailToken,
  sendEmailToken,
  getAllNotifications,
  readNotification,
};
