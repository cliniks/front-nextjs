import { toast } from "react-toastify";

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  toast("Código copiado com sucesso!", { type: "success" });
};
