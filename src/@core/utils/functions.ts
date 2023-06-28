export const converToLocalTime = (serverDate: any) => {
  const verifyDate =
    typeof serverDate === "string" ? new Date(serverDate) : serverDate;
  var dt = new Date(Date.parse(verifyDate));
  var localDate = dt;

  var gmt = localDate;
  var min = gmt.getTime() / 1000 / 60; // convert gmt date to minutes
  var localNow = new Date().getTimezoneOffset(); // get the timezone
  // offset in minutes
  var localTime = min - localNow; // get the local time

  var dateStr: Date = new Date(localTime * 1000 * 60);
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'

  return dateStr.toISOString().split(".")[0];
};

export const convertDateToDisplay = (data: string | Date) => {
  const verifyDate = typeof data === "string" ? new Date(data) : data;

  return verifyDate.toISOString().split("T")[0];
};

export const convertDateTimeToDisplay = (data: string | Date) => {
  const verifyDate =
    typeof data === "string"
      ? new Date(new Date(data).toString().split("GMT")[0] + " UTC")
      : data;

  return verifyDate.toISOString().split(".")[0];
};

export const showDateString = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

export const showDateTimeString = (date: Date) => {
  const dateString = new Date(date).toLocaleDateString();
  const hoursString = new Date(date).toLocaleTimeString();

  return `${dateString} ${hoursString}`;
};

export const convertDateForDatabase = (date: Date) => {
  new Date(date).toISOString();
};

export const formatReal = (price: string) => {
  if (typeof price === "string") {
    const adjustPrice = price?.split(".")[0] || "0";
    return monetaryFormatterReal(adjustPrice);
  }
};

export const decompilePrice = (price: string) => {
  let newPrice = price?.replace(/\D/g, "");

  let clean = newPrice
    .replace(/R\$\s*/g, "")
    .replace(".", "")
    .replace(",", "");

  return clean;
};

export const convertNumberWithDecimals = (str: string) => {
  var re = /\b(\d+)(\d{2})\b/;
  var subst = "$1.$2";
  var result = str.replace(re, subst);
  return result;
};

const monetaryFormatterReal = (price: string) => {
  const updatePrice = decompilePrice(price);
  const priceFormats = definePriceFormats(updatePrice);
  const { bilhao, milhao, milhar, real, centavo } = priceFormats;
  const hasBilhao = bilhao ? bilhao + "." : "";
  const hasMilhao = milhao ? milhao + "." : "";
  const hasMilhar = milhar ? milhar + "." : "";
  const hasReal =
    (!centavo || centavo?.length <= 2) && !real ? "0," : real + ",";
  const hasCentavo =
    centavo?.length < 1 ? "00" : centavo?.length < 2 ? "0" + centavo : centavo;

  return `R$ ${hasBilhao}${hasMilhao}${hasMilhar}${hasReal}${hasCentavo}`;
};

const definePriceFormats = (price: string) => {
  let centavo: string[] = [];
  let real: string[] = [];
  let milhar: string[] = [];
  let milhao: string[] = [];
  let bilhao: string[] = [];

  const priceArray = price.split("");
  const validateZero = validateIfFirstIsZero(priceArray);
  const formatedArray = invertArray(validateZero);

  formatedArray.map((nbr, i) => {
    if (i < 2) centavo.unshift(nbr);
    if (i >= 2 && i < 5) real.unshift(nbr);
    if (i >= 5 && i < 8) milhar.unshift(nbr);
    if (i >= 8 && i < 11) milhao.unshift(nbr);
    if (i >= 11 && i < 13) bilhao.unshift(nbr);
  });

  const f = (array: Array<string>) => array.toString().replaceAll(",", "");

  return {
    bilhao: f(bilhao),
    milhao: f(milhao),
    milhar: f(milhar),
    real: f(real),
    centavo: f(centavo),
  };
};

const invertArray = (arr: Array<string>) => {
  let formatedArray: string[] = [];
  for (let i = arr?.length; i > 0; i--) {
    formatedArray.push(arr[i - 1]);
  }
  return formatedArray;
};

const validateIfFirstIsZero = (arr: Array<string>) => {
  if (arr?.length > 3 && arr[0] === "0") arr.splice(0, 1);
  return arr;
};

export const maskCpfCnpj = (v: string) => {
  v = v.replace(/\D/g, "");

  if (v?.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    v = v.substring(0, 14); // limita em 14 números
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
};

export const pathCurrentOrNextNavigate = (
  url?: "user" | "seller" | "admin"
) => {
  const pathNavigate = window.location.href;

  const validateingPastUrl = ["user", "seller", "admin"].includes(
    url as "user" | "seller" | "admin"
  )
    ? url
    : "";

  if (pathNavigate.includes("dashboard/user"))
    return `/${window.location.pathname.split("/")[1]}/${
      validateingPastUrl || "user"
    }`;
  else if (pathNavigate.includes("dashboard/seller"))
    return `/${window.location.pathname.split("/")[1]}/${
      validateingPastUrl || "seller"
    }`;
  else if (pathNavigate.includes("dashboard/admin"))
    return `/${window.location.pathname.split("/")[1]}/${
      validateingPastUrl || "admin"
    }`;
  else {
    return window.location.origin;
  }
};

export const currentTypeUserNavigate = () => {
  const pathNavigate = window.location.href;

  if (pathNavigate.includes("dashboard/user")) return "user";

  if (pathNavigate.includes("dashboard/seller")) return "seller";

  if (pathNavigate.includes("dashboard/admin")) return "admin";

  return "global";
};

export const translateTextTable = (text: string) => {
  if (text === "RECEIVED") {
    return "Recebido";
  }
  if (text === "CONFIRMED") {
    return "Confirmado";
  }
  if (text === "OVERDUE") {
    return "Atrasado";
  }
  if (text === "PENDING") {
    return "Pendente";
  }
  if (text === "undefined") {
    return "Pendente";
  }

  if (text === "Waiting") {
    return "Aguardando";
  }

  if (text === "Active") {
    return "Ativo";
  }

  if (text === "Validate") {
    return "Validar";
  }

  if (text === "released") {
    return "Em Rota";
  }

  if (text === "delivered") {
    return "Entregue";
  }

  if (text === "") {
    return "Aguardando...";
  }
};

export const statusActive = (text: boolean) => {
  if (text === true) {
    return "Ativo";
  }
  if (text === false) {
    return "Desativado";
  }
};

export const handleTelefone = (tel) => {
  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;

  var str = tel.replace(/[^0-9]/g, "");

  var telefole = "";

  if (str?.length === 13) {
    telefole = tel.replace(/[^0-9]/g, "").slice(2, 13);
  }
  if (str?.length === 11) {
    telefole = tel.replace(/[^0-9]/g, "").slice(0, 11);
  }

  console.log(telefole);
  const result = telefole.replace(regex, "($1)$2-$3");

  return result;
};
