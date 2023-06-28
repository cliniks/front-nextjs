import ecommersys from "ecommersys";

export const sdkManager = new ecommersys();

export const initializeSDK = async () =>
  await sdkManager.connect({
    appToken: process.env.NEXT_PUBLIC_ECOMMERSYS_APP_TOKEN,
  });
