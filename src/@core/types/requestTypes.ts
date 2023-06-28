import { getAllProps } from "ecommersys/dist/interfaces";

export type sdkResolver<P, R> = (
  props: P,
  defaultCallback?: callback<R>,
  errorCallback?: Function
) => Promise<R>;

export type sdkNoPropsResolver<R> = (
  defaultCallback: callback<R>,
  errorCallback?: Function
) => Promise<R>;

export type getSingleProps = {
  key?: string;
  value?: string;
};

export type sdkGetAllProps = {
  defaultCallback: Function;
  getAllProps?: getAllProps;
};

export interface callback<R> {
  (res: R): any;
}
