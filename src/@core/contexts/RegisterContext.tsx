import { filesize } from "filesize";
import React, {
  useContext,
  useState,
  createContext,
  useCallback,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { UploadMessage } from "@core/components/Forms/styles";
import { api } from "@/services/axiosInstance";
import { useUser } from "./UserContext";
import { useRouter } from "next/router";

const RegisterContext = createContext<any>(null);

const RegisterProvider = ({ children }: React.PropsWithChildren) => {
  const [loadingCodigo, setLoadingCodigo] = useState(false);

  const [confirmEmail, setConfirmEmail] = useState(false);

  const [imgPreview, setImgPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [codigo, setCodigo] = useState(false);

  const [step, setStep] = useState(0);

  const router = useRouter();

  const lastStep = 3;

  const [AuthData, setAuthData] = useState<authDataType>({
    username: "",
    password: "",
    confirmPassword: "",
    check: true,
    img: null,
    userInfo: {
      name: "",
      lastName: "",
      cpf: "",
      cnpj: "",
      cnae: "",
      personType: "fisica",
      enterpriseName: "",
      enterpriseSocial: "",
      address: "",
      number: "",
      phone: "",
      complement: "",
      birthDate: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
    },
  });

  const { login } = useUser();

  const refs = {
    dateMaskRef: useRef<any>(),
    cepMaskRef: useRef<any>(),
    cpfMaskRef: useRef<any>(),
    codigoRef: useRef<any>(),
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (
      !AuthData.username ||
      !AuthData.password ||
      !AuthData.userInfo.name ||
      !AuthData.userInfo.lastName ||
      !AuthData.userInfo.address ||
      !AuthData.userInfo.city ||
      !AuthData.userInfo.state ||
      !AuthData.userInfo.zipCode ||
      !AuthData.userInfo.email
    ) {
      setLoading(false);

      return toast("Preencha todos os dados para continuar...", {
        type: "error",
      });
    }

    // if (!AuthData.check) {
    //   setLoading(false);
    //   return toast("Precisa Concordar com os termos para continuar...", {
    //     type: "error",
    //   });
    // }

    const form = new FormData();

    for (let data in AuthData) {
      if (data !== "userInfo") {
        form.append(data, AuthData[data]);
      } else {
        for (let userData in AuthData.userInfo) {
          form.append(`${data}[${userData}]`, AuthData.userInfo[userData]);
        }
      }
    }

    try {
      const postUser = await api.post("/users", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!postUser.data.username) throw new Error();
      toast("Usuário criado com sucesso! Redirecionando...", {
        type: "success",
      });
      setLoading(false);
      setTimeout(async () => {
        await login({
          username: AuthData.username,
          password: AuthData.password,
        });
        router.push("/");
        document.location.reload();
      }, 1000);
    } catch (err) {
      toast("Não foi possível criar a conta, usuário existente...", {
        type: "error",
      });
      setLoading(false);
    }
  };

  const ChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
    values: { email: string; password: string; confirmPassword: string }
  ) => {
    event.preventDefault();
    setLoading(true);

    if (!values?.password || !values?.email || !values?.confirmPassword) {
      setLoading(false);
      return toast("Preencha todos os dados para continuar...", {
        type: "error",
      });
    }

    try {
      if (values?.password === values?.confirmPassword) {
        const changePassword = await api.post("/auth/changePassword", {
          email: values.email,
          password: values.password,
        });

        if (!changePassword.data) throw new Error();
        toast("Senha atualizada com sucesso! Redirecionando...", {
          type: "success",
        });
        setLoading(false);
        setTimeout(() => {
          router.push("/");
          document.location.reload();
        }, 1000);
      } else {
        toast("As senhas devem ser iguais!", {
          type: "error",
        });
      }
    } catch (err) {
      toast("Não foi possível atualizar a senha.", {
        type: "error",
      });

      setLoading(false);
    }
  };

  const UpdateAuthData = (e: any) => {
    const { name, value } = e?.target;
    const userInfoNames = [
      "name",
      "lastName",
      "cpf",
      "cnpj",
      "cnae",
      "enterpriseName",
      "enterpriseSocial",
      "address",
      "number",
      "birthDate",
      "complement",
      "city",
      "phone",
      "state",
      "zipCode",
      "email",
      "personType",
    ];
    if (userInfoNames.includes(name)) {
      const username = name === "email" ? { username: value } : null;
      return setAuthData({
        ...AuthData,
        ...username,
        userInfo: { ...AuthData.userInfo, [name]: value },
      });
    }
    setAuthData({ ...AuthData, [name]: value });
  };

  const getFile = (e: any) => {
    if (e) {
      const newUploadedFiles: IFile = {
        file: e,
        id: e.name,
        name: e.name,
        readableSize: filesize(e.size),
        preview: URL.createObjectURL(e),
      };
      setImgPreview(newUploadedFiles);
      UpdateAuthData({ target: { name: "img", value: newUploadedFiles.file } });
    }
  };

  const confirmUserEmailExist = async () => {
    const getUserFromEmail = await api.post("/auth/accountExistence", {
      username: AuthData.username,
    });

    console.log(getUserFromEmail.data);
    return getUserFromEmail.data;
  };

  const handleCreateCodigo = async (isChangePassword?: Boolean) => {
    setLoadingCodigo(true);

    try {
      const confirmUserEmail = await confirmUserEmailExist();
      if (confirmUserEmail && !isChangePassword) {
        setLoadingCodigo(false);

        return toast(
          "Já existe um usuário com esse e-mail, acesse com as credenciais ou insira um novo e-mail.",
          { type: "error" }
        );
      }

      await api.post("/users/createEmailToken", {
        email: AuthData.userInfo.email,
      });

      setCodigo(true);
      setLoadingCodigo(false);
      toast(
        "Código enviado com sucesso! Confirme em seu e-mail para continuar.",
        { type: "success" }
      );
    } catch (err) {
      toast(
        "Não foi possível enviar o código, verifique o e-mail e tente novamente.",
        { type: "error" }
      );
      setLoadingCodigo(false);
    }
    setLoadingCodigo(false);
  };

  const handleSubmitCodigo = async () => {
    setLoadingCodigo(true);
    const code = refs.codigoRef.current.value;
    try {
      if (!code && code?.length !== 4) {
        setLoadingCodigo(false);

        return "";
      }

      await api.post("/users/confirmEmailToken", {
        email: AuthData.userInfo.email,
        code,
      });

      setConfirmEmail(true);
      setLoadingCodigo(false);

      toast("Código confirmado com sucesso!", { type: "success" });
    } catch (err) {
      setLoadingCodigo(false);
      toast(
        "Não foi possível confirmar o código, verifique o e-mail e tente novamente.",
        { type: "error" }
      );
    }
  };

  const onDrop = useCallback(
    (files: any) => {
      getFile(files[0]);
    },
    [getFile]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      // accept: ["image/jpeg", "image/jppeg", "image/png", "image/gif"],
      onDrop,
    });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          Clique aqui ou arraste a imagem para inserir
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  const values = {
    lastStep,
    step,
    imgPreview,
    setImgPreview,
    setAuthData,
    loading,
    confirmEmail,
    AuthData,
    UpdateAuthData,
    handleSubmit,
    renderDragMessage,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    handleCreateCodigo,
    handleSubmitCodigo,
    refs,
    loadingCodigo,
    setStep,
    codigo,
    ChangePassword,
    confirmUserEmailExist,
  };
  return (
    <RegisterContext.Provider value={values}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegister = () => useContext<useUserValues>(RegisterContext);

export { RegisterProvider, useRegister };

type useUserValues = {
  lastStep: any;
  step: any;
  imgPreview: any;
  loading: any;
  setImgPreview: any;
  confirmEmail: any;
  setAuthData: any;
  AuthData: authDataType;
  UpdateAuthData: any;
  handleSubmit: any;
  renderDragMessage: any;
  getRootProps: any;
  getInputProps: any;
  confirmUserEmailExist: any;
  isDragActive: any;
  isDragReject: any;
  handleCreateCodigo: any;
  handleSubmitCodigo: any;
  refs: any;
  loadingCodigo: any;
  setStep: any;
  codigo: any;
  ChangePassword: any;
};

export interface IFile {
  id: string;
  name: string;
  readableSize: any;
  preview: string;
  file: File | null;
}

export type authDataType = {
  username: string;
  password: string;
  confirmPassword?: string;
  check: boolean;
  img: any;
  userInfo: {
    name: string;
    lastName: string;
    cpf: string;
    cnpj: string;
    cnae: string;
    personType: "juridica" | "fisica";
    enterpriseSocial: string;
    enterpriseName: string;
    address: string;
    number: string;
    phone: string;
    complement: string;
    birthDate: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
  };
};
