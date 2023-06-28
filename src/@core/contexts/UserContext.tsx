import React, {
  useState,
  createContext,
  useEffect,
  ChangeEvent,
  useContext,
} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  tokenizeType,
  PaymentMethodType,
} from "ecommersys/dist/Entities/paymentMethod.entitie";
import { Address, User } from "ecommersys/dist/Entities";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";
import { sdkManager } from "@core/configs/ecommersys.config";
import { useSDK } from "@core/contexts/sdkContext";
import { sdk } from "@core/sdkProvider";
import { validateToken } from "@core/utils/validateToken";
import {
  getUserToken,
  removeUserToken,
  updateUserToken,
} from "@core/utils/token";
import { api } from "@/services/axiosInstance";

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    sdkManager.userToken(accessToken);
  } else {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers["x-access-token"];
  }
};

const initialValues = {
  loading: true,
  user: null,
  isAuthenticated: false,
  setUser: () => null,
  setCard: () => null,
  getMyUser: () => null,
  register: () => null,
  login: () => null,
  logout: () => null,
  handleSubmitNewPaymentMethod: () => null,
  notRememberToken: false,
  setNotRememberToken: () => null,
  singleAddress: null,
  card: null,
  handleInputsCreditCardHolderInfo: () => null,
  handleInputsCard: () => null,
  handleInputsAddress: () => null,
  handleSubmitNewAddress: () => null,
  getMyAddress: () => null,
  getMyCards: () => null,
  addresses: [],
  cards: [],
  handleSearchAddressForCEP: () => null,
  setPaymantMethod: () => null,
  handleSetDefault: () => null,
  handleUpdateUserImage: () => null,
};

export const UserContext = createContext<userValues>(initialValues);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [notRememberToken, setNotRememberToken] = useState();
  const [UserData, setUserData] = useState<UserData>(InitialUserData);
  const { t }: { t: any } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [addresses, setAddresses] = useState<Partial<Address>[]>([
    InitialAddress,
  ]);

  const [paymantMethod, setPaymantMethod] =
    useState<tokenizeType>(InitialPaymantMethod);

  const [cards, setCards] = useState<Partial<PaymentMethodType>[]>([
    InitialCards,
  ]);

  const [card, setCard] = useState<Partial<tokenizeType>>(InitialPaymantMethod);

  const [singleAddress, setSingleAddress] =
    useState<Partial<Address>>(InitialAddress);

  const { initialize: initializeSDK } = useSDK();

  const theme = useTheme();

  const handleInputsCard = (event: any): void => {
    setCard((state) => ({
      ...state,
      creditCard: {
        ...state.creditCard,
        [event.target.name]: event?.target?.value,
      },
    }));
  };

  const handleInputsCreditCardHolderInfo = (event: any): void => {
    setCard((state) => ({
      ...state,
      creditCardHolderInfo: {
        ...state.creditCardHolderInfo,
        [event.target.name]: event?.target?.value,
      },
    }));
  };

  const handleInputsAddress = (event: any): void => {
    setSingleAddress((state) => ({
      ...state,
      [event.target.name]: event?.target?.value,
    }));
  };

  const getMyCards = () => {
    sdk.User.account.getMyPaymentMethod((res: any) => {
      setCards(res.result);
    });
  };

  const getMyAddress = () => {
    sdk.User.account.getMyAddress((res: any) => {
      setAddresses(res.result);
    });
  };

  const handleSubmitNewAddress = () => {
    console.log(singleAddress);

    const singlesAddressKeys = Object.keys(singleAddress);

    const isSingleAddressCompleted =
      singlesAddressKeys.filter(
        (objKey) => singleAddress[objKey as keyof Address]
      )?.length === singlesAddressKeys?.length;

    if (!isSingleAddressCompleted) {
      toast(`Ops, todos os campos devem ser preenchidos!`, {
        type: "error",
        autoClose: 3000,
      });
      return;
    }

    sdk.User.account.addAddress(singleAddress, (res: any) => {
      getMyAddress();
    });

    toast("Endereço cadastrado com sucesso.", {
      type: "success",
      autoClose: 3000,
    });
  };

  const handleSubmitNewPaymentMethod = () => {
    let paymantMethodCard = paymantMethod;

    paymantMethodCard.customer = UserData.user.gatewayPagId;
    paymantMethodCard.creditCard = card.creditCard;
    paymantMethodCard.creditCardHolderInfo = card.creditCardHolderInfo;

    console.log(paymantMethodCard);
    sdk.User.account.addPaymentMethod(
      paymantMethodCard,
      (res: any) => {
        const returnText = t("You successfully add the Payment Method");
        toast(returnText, { type: "success" });
        getMyCards();
      },
      (err: any) => {
        const returnText = t(
          `Unable to add card. Check the information and try again!`
        );
        toast(returnText, { type: "error" });
      }
    );
  };

  const handleSearchAddressForCEP = async () => {
    await axios
      .get(`https://viacep.com.br/ws/${singleAddress.zipCode}/json/`)
      .then((res: any) => {
        if (res.data) {
          setSingleAddress((state) => ({
            ...state,
            address: res.data.logradouro,
            number: res.data.siafi,
            city: res.data.localidade,
            state: res.data.uf,
            zipCode: res.data.cep,
            district: res.data.bairro,
            country: "Brasil",
          }));
        } else {
          toast(
            "Não foi possível encontrar seu endereço, digite de forma manual.",
            { type: "error", autoClose: 3000 }
          );
        }
      })
      .catch((err: any) => {
        toast(
          "Não foi possível encontrar seu endereço, digite de forma manual.",
          { type: "error", autoClose: 3000 }
        );
      });
  };

  const initialize = async (accessToken: string): Promise<void> => {
    console.log("Olá! estou iniciando os serviços");
    setLoadingMessage("Iniciando serviços...");
    await initializeSDK();

    const doNotHaveLogged = () => {
      setLoading(false);
    };
    if (!accessToken) {
      console.log("não tem accessToken");

      return doNotHaveLogged();
    } else {
      setSession(getUserToken());
      try {
        const validate = await validateToken(accessToken);
        console.log("validando token");
        setLoadingMessage("Sua sessão está iniciada, validando dados.");

        if (!validate) {
          console.log("não foi validado");

          removeUserToken();
          return doNotHaveLogged();
        }
        const user: User = await getMyUser();

        if (!user) {
          console.log("não foi encontrado user, deletando token");
          removeUserToken();
          toast("não foi encontrado usuário", { type: "error" });
          throw new Error("não foi encontrado usuário");
        }

        setTimeout(() => {
          setUserData((storeData) => {
            storeData = { isAuthenticated: true, user };
            return storeData;
          });

          setLoading(false);
        }, 2000);
      } catch (err: any) {
        console.log(err);
        removeUserToken();
        setUserData((storeData) => {
          storeData = { isAuthenticated: false, user: null };
          return storeData;
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const accessToken = getUserToken();
    initialize(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMyUser = async () =>
    await sdk.User.account.getMyUser(async (result: User) => {
      setUserData((userD: any) => ({ ...userD, user: result }));
      return result;
    });

  const updateUser = async (data: any, key?: string) => {
    // setUserData((storeData) => {
    //   const update = key ? { ...storeData.user, [key]: data } : data;
    //   storeData = { ...storeData, user: update };
    //   return storeData;
    // });
    // const updateUser = await sdk.User.account.updateUserInfo(
    //   UserData.user._id,
    //   {
    //     [key]: data,
    //   }
    // );
    // if (updateUser.isError) throw new Error(updateUser.isError);
  };

  const handleSetDefault = (
    id: string,
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log({ id });
    if (UserData.user.userInfo.defaultAddress !== id) {
      sdk.User.account.setDefaultAddress(id, () => {
        toast("Endereço atualizado com sucesso!", { type: "success" });
        getMyUser();
      });
    }
  };

  const login = async ({
    username,
    password,
    loading,
  }: {
    username: string;
    password: string;
    loading?: any;
  }): Promise<void> => {
    // const response = await api.post("auth", { username, password });

    if (!username || !password) {
      throw new Error("Preencha todos os dados para continuar");
    }
    await sdk.User.account.authUser(
      { password, username },
      async (response: any) => {
        const { accessToken } = response;

        setSession(accessToken);
        updateUserToken(accessToken);

        // await initialize(accessToken);

        toast.update(loading, {
          render: "Autenticado com sucesso! Seja bem-vindo!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        setUserData((storeData) => {
          storeData.isAuthenticated = true;
          return storeData;
        });

        setTimeout(() => {
          document.location.reload();
        }, 1000);
      },
      (err: any) => {
        console.log(err);
        toast.update(loading, {
          render: "Login ou Senha inválidos...",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    );
  };

  const logout = async (): Promise<void> => {
    setSession(null);
    setUserData((storeData) => {
      storeData = { isAuthenticated: false, user: null };
      return storeData;
    });
  };

  const register = async (AuthData: Omit<AuthData, "check">): Promise<void> => {
    const form = new FormData();
    for (let data in AuthData) {
      if (data !== "userInfo") {
        form.append(data, AuthData[data as "password" | "username"]);
      } else {
        for (let userData in AuthData.userInfo) {
          form.append(
            `${data}[${userData}]`,
            AuthData.userInfo[userData as keyof AuthData["userInfo"]]
          );
        }
      }
    }
    const response = await api.post("/users", AuthData);
    // await User.account.createNewUser(form);

    // if (response.isError) throw new Error("não foi possível criar usuário");
    // api.post("addUser", AuthData);

    // window.localStorage.setItem("accessToken", accessToken);

    setUserData((storeData) => {
      storeData = { isAuthenticated: false, user: response.data };
      return storeData;
    });
  };

  const handleUpdateUserImage = (e: any) =>
    sdk.User.account.updateUserImage(
      { id: UserData.user._id, img: e[0] },
      () => {
        toast("Imagem de perfil atualizada com sucesso!", { type: "success" });
        getMyUser();
      }
    );

  const values: userValues = {
    loading,
    user: UserData.user,
    isAuthenticated: UserData.isAuthenticated,
    setUser: updateUser,
    getMyUser,
    register,
    login,
    logout,
    notRememberToken,
    setNotRememberToken,
    singleAddress,
    handleInputsAddress,
    handleSubmitNewAddress,
    getMyAddress,
    addresses,
    handleSearchAddressForCEP,
    handleSetDefault,
    handleUpdateUserImage,
    handleSubmitNewPaymentMethod,
    handleInputsCard,
    handleInputsCreditCardHolderInfo,
    card,
    cards,
    getMyCards,
    setCard,
    setPaymantMethod,
  };

  return (
    <UserContext.Provider value={values}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          opacity: loading ? 1 : 0,
          position: "absolute",
          transition: "all 2s ease",
          pointerEvents: loading ? "auto" : "none",
          zIndex: 1000,
          backgroundColor: "#FFFF",
        }}
      >
        {loading && (
          <>
            <CircularProgress
              size={100}
              style={{ color: theme.colors.primary.dark }}
            />
            <p style={{ color: "#aaa", fontFamily: "Roboto" }}>
              {loadingMessage}
            </p>
          </>
        )}
      </div>
      {children}
    </UserContext.Provider>
  );
};

type userValues = {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  setUser: Function;
  setCard: React.Dispatch<React.SetStateAction<Partial<tokenizeType>>>;
  getMyUser: Function;
  register: Function;
  login: Function;
  logout: Function;
  handleSubmitNewPaymentMethod: () => void;
  notRememberToken: boolean;
  setNotRememberToken: Function;
  singleAddress: Partial<Address> | null;
  card: Partial<tokenizeType> | null;
  handleInputsCreditCardHolderInfo: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  handleInputsCard: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputsAddress: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitNewAddress: () => void;
  getMyAddress: () => void;
  getMyCards: () => void;
  addresses: Partial<Address>[];
  cards: Partial<PaymentMethodType>[];
  handleSearchAddressForCEP: () => void;
  setPaymantMethod: React.Dispatch<React.SetStateAction<tokenizeType>>;
  handleSetDefault: (
    id: string,
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => void;
  handleUpdateUserImage: (img: File) => void;
};

export const useUser = () => useContext(UserContext);

type UserData = {
  isAuthenticated: boolean;
  user: User | null;
};

const InitialUserData: UserData = {
  isAuthenticated: false,
  user: null,
};

const InitialAddress = {
  address: "",
  number: 1,
  complement: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

const InitialCards = {
  _id: "",
  owner: "",
  creditCardNumber: "",
  creditCardBrand: "",
  creditCardToken: "",
};

const InitialPaymantMethod = {
  customer: "",
  creditCard: {
    holderName: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    ccv: "",
  },
  creditCardHolderInfo: {
    name: "",
    email: "",
    cpfCnpj: "",
    postalCode: "",
    addressNumber: "",
    addressComplement: "",
    phone: "",
    mobilePhone: "",
  },
};

type AuthData = {
  username: "";
  password: "";
  userInfo: {
    name: "";
    lastName: "";
    cpf: "";
    address: "";
    number: "";
    complement: "";
    city: "";
    UserData: "";
    cep: "";
    email: "";
  };
};

// export const useUser = () => {
//   if (!UserContext) return initialValues;
//   else return useContext(UserContext);
// };
