import { Admin } from "ecommersys";
import {
  GlobalCommissionType,
  StoreSolicitate,
  categoryCommissionType,
  productCommissionType,
  storeCommissionType,
} from "ecommersys/dist/Entities";
import { notificationTypes } from "ecommersys/dist/Entities/notification.entitie";
import {
  getAllProps,
  getAllReturn,
  getSingleProps,
} from "ecommersys/dist/interfaces";
import { callbackResolver } from "@/Error";
import { sdkResolver } from "@core/types/requestTypes";

export const getAllSellerSolicitations: sdkResolver<
  getAllProps,
  getAllReturn<StoreSolicitate>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.getAllSellerSolicitation,
    props,
    defaultCallback,
    errCallback
  );
export const getSingleSellerSolicitations: sdkResolver<
  getSingleProps,
  StoreSolicitate
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.getSingleSellerSolicitation,
    props,
    defaultCallback,
    errCallback
  );
export const confirmSolicitation: sdkResolver<
  { solicitationId: string },
  getAllReturn<StoreSolicitate>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.confirmSellerSolicitation,
    props,
    defaultCallback,
    errCallback
  );
export const rejectSolicitation: sdkResolver<
  { solicitationId: string },
  getAllReturn<StoreSolicitate>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.rejectSolicitation,
    props,
    defaultCallback,
    errCallback
  );

// Global commission
export const comissionGlobalGetAll: sdkResolver<
  getAllProps,
  getAllReturn<GlobalCommissionType>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Global.getAll,
    props,
    defaultCallback,
    errCallback
  );

export const comissionGlobalGetSingle: sdkResolver<
  getSingleProps,
  GlobalCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Global.getSingle,
    props,
    defaultCallback,
    errCallback
  );

export const comissionGlobalUpdateOne: sdkResolver<
  { commissionId: string; data: Partial<GlobalCommissionType> },
  GlobalCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Global.updateOne,
    props,
    defaultCallback,
    errCallback
  );
// END | Global commission

// Store commission

export const comissionStoreGetAll: sdkResolver<
  getAllProps,
  getAllReturn<storeCommissionType>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Store.getAll,
    props,
    defaultCallback,
    errCallback
  );

export const comissionStoreGetSingle: sdkResolver<
  getSingleProps,
  storeCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Store.getSingle,
    props,
    defaultCallback,
    errCallback
  );

export const comissionStoreAdd: sdkResolver<
  Partial<storeCommissionType>,
  storeCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Store.add,
    props,
    defaultCallback,
    errCallback
  );

export const comissionStoreUpdateOne: sdkResolver<
  { commissionId: string; data: Partial<storeCommissionType> },
  storeCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Store.updateOne,
    props,
    defaultCallback,
    errCallback
  );

// Category commission

export const comissionCategoriesByStore: sdkResolver<
  string,
  categoryCommissionType[]
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Category.getByStore,
    props,
    defaultCallback,
    errCallback
  );

export const comissionCategoryGetAll: sdkResolver<
  getAllProps,
  getAllReturn<categoryCommissionType>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Category.getAll,
    props,
    defaultCallback,
    errCallback
  );

export const comissionCategoryGetSingle: sdkResolver<
  getSingleProps,
  categoryCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Category.getSingle,
    props,
    defaultCallback,
    errCallback
  );

export const comissionCategoryAdd: sdkResolver<
  Partial<categoryCommissionType>,
  categoryCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Category.add,
    props,
    defaultCallback,
    errCallback
  );

export const comissionCategoryUpdateOne: sdkResolver<
  { commissionId: string; data: Partial<categoryCommissionType> },
  categoryCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Category.updateOne,
    props,
    defaultCallback,
    errCallback
  );

// Products commission

export const comissionProductsByStore: sdkResolver<
  string,
  productCommissionType[]
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Product.getByStore,
    props,
    defaultCallback,
    errCallback
  );

export const comissionProductAdd: sdkResolver<
  Partial<productCommissionType>,
  productCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Product.add,
    props,
    defaultCallback,
    errCallback
  );

export const comissionProductUpdateOne: sdkResolver<
  { commissionId: string; data: Partial<productCommissionType> },
  productCommissionType
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.commission.Product.updateOne,
    props,
    defaultCallback,
    errCallback
  );

// Notifications

export const notificationGetAll: sdkResolver<
  getAllProps,
  getAllReturn<notificationTypes>
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.notification.getAll,
    props,
    defaultCallback,
    errCallback
  );

export const notificationGetSingle: sdkResolver<
  getSingleProps,
  notificationTypes
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.notification.getSingle,
    props,
    defaultCallback,
    errCallback
  );

export const notificationAdd: sdkResolver<
  Partial<notificationTypes>,
  notificationTypes
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.notification.add,
    props,
    defaultCallback,
    errCallback
  );

export const notificationUpdateOne: sdkResolver<
  { notifyId: string; data: Partial<notificationTypes> },
  notificationTypes
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.notification.update,
    props,
    defaultCallback,
    errCallback
  );

export const notificationDelete: sdkResolver<
  { notifyId: string },
  notificationTypes
> = async (props, defaultCallback, errCallback) =>
  await callbackResolver(
    Admin.notification.delete,
    props,
    defaultCallback,
    errCallback
  );
