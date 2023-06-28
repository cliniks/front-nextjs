/**
 *
 * Callback que tratará a comunicação direta com o SDK, retornando somente o dado puro ou disparando o erro relacionado.
 *
 */

import { toast } from "react-toastify";

export const sdkErrorHandling = async (fn: Function, ...args: any) => {
  try {
    // Execução do callback encaminhado como primeiro parâmetro incrementando todos os paramêtros adicionais a esse callback.
    const resolver = await fn.apply(null, args);

    // Disparo do erro para ser resolvido na função que tenha chamado o sdkErrorHandling.
    if (
      resolver.isError ||
      Object.keys(resolver).includes("isError") ||
      resolver.code === 500
    ) {
      throw new Error(resolver.isError || "internal server error");
    }

    // Retorno caso sucesso.
    return resolver.isSuccess;
  } catch (err: any) {
    throw new Error(err.toString());
  }
};

/**
 * Callback de verificação da resolução da comunicação com o SDK como primeiro parâmetro
 * e trazendo como segundo parâmetro a possibilidade de inserção de um gerenciamento mais preciso
 * encaminhando o resultado do primeiro callback como parâmetro principal do segundo callback.
 */

export const callbackResolver = async (
  fn: Function,
  props: any,
  callbackHandling?: Function,
  errorCallback?: Function
) => {
  try {
    // Aguardo da resolução do primeiro callback.
    const resolver = await sdkErrorHandling(fn, props);
    callbackHandling && callbackHandling(resolver);
    // Execução do segundo callback com encaminhamento do retorno do primeiro callback como parâmetro.
    return resolver;
  } catch (err: any) {
    errorCallback
      ? errorCallback(err)
      : toast(err?.message || "Erro interno do servidor.", { type: "error" });

    // trigger what to do
  }
};

export const callbackNoPropsResolver = async (
  fn: Function,
  callbackHandling: Function,
  errCallback?: Function
) => {
  try {
    // Aguardo da resolução do primeiro callback.
    const resolver = await sdkErrorHandling(fn);
    callbackHandling(resolver);
    // Execução do segundo callback com encaminhamento do retorno do primeiro callback como parâmetro.
    return resolver;
  } catch (err: any) {
    errCallback
      ? errCallback(err)
      : toast(err?.message || "Erro interno do servidor.", { type: "error" });
  }
};
