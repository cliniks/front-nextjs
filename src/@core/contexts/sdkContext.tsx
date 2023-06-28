import { createContext, useContext, useState } from "react";
import ecommersys from "ecommersys";
import { sdk } from "@core/sdkProvider";
import { toast } from "react-toastify";

export const SDKProvider = ({ children }: React.PropsWithChildren) => {
  const [connected, setConnected] = useState(false);
  const SDK = new ecommersys();
  const Global = sdk.Global;
  const Seller = sdk.Seller;
  const User = sdk.User;

  const initialize = async () => {
    const connect = await SDK.connect({
      appToken: process.env.NEXT_PUBLIC_ECOMMERSYS_APP_TOKEN,
    });
    console.log(connect);
    if (connect.isError) return toast("não foi possível conectar");
    setConnected(connect.isSuccess);
  };

  const values = { connected, Global, Seller, User, initialize };
  return <SDKContext.Provider value={values}>{children}</SDKContext.Provider>;
};

type contextSDKTypes = {
  connected: boolean;
  Global: typeof sdk.Global | null;
  Seller: typeof sdk.Seller | null;
  User: typeof sdk.User | null;
  initialize: () => Promise<any>;
};

const initialValues = {
  connected: false,
  Global: null,
  Seller: null,
  User: null,
  initialize: () => null,
};

const SDKContext = createContext<contextSDKTypes>(initialValues);

export const useSDK = () => SDKContext && useContext(SDKContext);
