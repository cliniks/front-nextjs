import axios from "axios";
import { getUserToken } from "../@core/utils/token";

export const Bearer = `Bearer ${
  process.env.NEXT_PUBLIC_ECOMMERSYS_APP_TOKEN ||
  process.env.ECOMMERSYS_APP_TOKEN
}`;

export const ApiUrl = process.env.NEXT_PUBLIC_HOST;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
  // baseURL: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH,DELETE",
    Authorization: Bearer,
  },
});

const updateHeaders = (headers: { [key: string]: string }) => {
  Object.keys(headers).map((item) => {
    api.defaults.headers[item] = headers[item];
  });
};

const updateBaseUrl = (url: string) => (api.defaults.url = url);

api.interceptors.request.use(
  (config: any) => {
    const token = getUserToken();

    if (config.headers === undefined) config.headers = {};

    if (token) {
      config.headers["x-access-token"] = token;
    }

    config.headers["Authorization"] = Bearer;

    return config;
  },
  (error: any) => console.log(error)
);

export { api, updateHeaders, updateBaseUrl };
