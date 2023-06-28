import { sdk } from "../sdkProvider";
// import { t } from "i18next";
import { SetStateAction, createContext, useContext, useState } from "react";

import { notificationTypes } from "ecommersys/dist/Entities/notification.entitie";
import { useUser } from "@core/contexts/UserContext";

const NotificationsContext = createContext<props>(null);

export const NotificationsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [globalAllNotifications, setGlobalAllNotifications] = useState<
    Partial<notificationTypes>[]
  >([]);
  const [sellerAllNotifications, setSellerAllNotifications] = useState<
    Partial<notificationTypes>[]
  >([]);
  const [userAllNotifications, setUserAllNotifications] = useState<
    Partial<notificationTypes>[]
  >([]);
  const [notification, setNotification] = useState<Partial<notificationTypes>>(
    {}
  );
  const [userAllNotificationsTimeline, setUserAllNotificationsTimeline] =
    useState<Partial<notificationTypes>[]>([]);

  const { user } = useUser();

  const dateNow = new Date();

  const handleGetGlobalAllNotifications = async () => {
    sdk.Global.getAllNotifications((res) => {
      if (res.result) {
        setUserAllNotificationsTimeline((state) => [...state, ...res.result]);

        const activeNotify = res.result.filter((notify) => {
          if (
            notify.isActive &&
            notify.direction === "global" &&
            !notify.isRead.includes(user._id) &&
            new Date(notify.startDate).getTime() <= dateNow.getTime() &&
            new Date(notify.endDate).getTime() >= dateNow.getTime()
          ) {
            return true;
          }
        });
        if (activeNotify?.length > 0) {
          setGlobalAllNotifications(activeNotify);
        }
      }
    });
  };

  const handleGetSellerAllNotifications = async () => {
    if (user.storeId === "" || typeof user.storeId === "undefined") return;

    sdk.Seller.notify.getNotifications((res) => {
      if (res) {
        const activeNotify = res.filter((notify) => {
          if (
            notify.isActive &&
            !notify.isRead.includes(user.storeId) &&
            new Date(notify.startDate).getTime() <= dateNow.getTime() &&
            new Date(notify.endDate).getTime() >= dateNow.getTime()
          ) {
            return true;
          }
        });
        if (activeNotify?.length > 0) {
          setSellerAllNotifications(activeNotify);
        }
      }
    });
  };

  const handleGetUserAllNotifications = async () => {
    sdk.User.notify.getNotifications((res) => {
      if (res) {
        setUserAllNotificationsTimeline((state) => [...state, ...res]);
        const activeNotify = res.filter((notify) => {
          if (
            notify.isActive &&
            !notify.isRead.includes(user._id) &&
            new Date(notify.startDate).getTime() <= dateNow.getTime() &&
            new Date(notify.endDate).getTime() >= dateNow.getTime()
          ) {
            return true;
          }
        });
        if (activeNotify?.length > 0) {
          setUserAllNotifications(activeNotify);
        }
      }
    });
  };

  const handleReadNotification = (id: { id: string }) => {
    sdk.Global.readNotification(id, (res) => {
      setNotification({});
      setGlobalAllNotifications(
        globalAllNotifications.filter((notify) => notify._id !== id.toString())
      );
      setSellerAllNotifications(
        sellerAllNotifications.filter((notify) => notify._id !== id.toString())
      );
      setUserAllNotifications(
        userAllNotifications.filter((notify) => notify._id !== id.toString())
      );
    });
  };

  const values: props = {
    globalAllNotifications,
    sellerAllNotifications,
    userAllNotifications,
    handleGetGlobalAllNotifications,
    handleGetSellerAllNotifications,
    handleGetUserAllNotifications,
    handleReadNotification,
    userAllNotificationsTimeline,
    notification,
    setNotification,
  };

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

type props = {
  globalAllNotifications: Partial<notificationTypes>[];
  sellerAllNotifications: Partial<notificationTypes>[];
  userAllNotifications: Partial<notificationTypes>[];
  handleGetGlobalAllNotifications: any;
  handleGetSellerAllNotifications: any;
  handleGetUserAllNotifications: any;
  handleReadNotification: any;
  userAllNotificationsTimeline: Partial<notificationTypes>[];
  notification: Partial<notificationTypes>;
  setNotification: React.Dispatch<SetStateAction<Partial<notificationTypes>>>;
};
