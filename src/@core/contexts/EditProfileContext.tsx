import { createContext, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { sdk } from "@core/sdkProvider";
import { useUser } from "./UserContext";
import { useRouter } from "next/router";

const EditProfileContext = createContext<contextValues>(null);

export const EditProfileProvider = ({ children }: React.PropsWithChildren) => {
  const { user, getMyUser } = useUser();
  const router = useRouter();

  const refs: refsType = {
    nome: useRef(null),
    sobrenome: useRef(null),
    whatsapp: useRef(null),
    email: useRef(null),
    cpf: useRef(null),
    cnpj: useRef(null),
    cep: useRef(null),
    endereco: useRef(null),
    numero: useRef(null),
    complemento: useRef(null),
    cidade: useRef(null),
    estado: useRef(null),
    bairro: useRef(null),
  };

  const handleSubmit = (handleClose?: () => void) => {
    const obj = {
      name: refs.nome.current?.value,
      lastName: refs.sobrenome.current?.value,
      phone: refs.whatsapp.current?.value,
      email: refs.email.current?.value,
      cpf: refs.cpf.current?.value,
      cnpj: refs.cnpj.current?.value,
      zipCode: refs.cep.current?.value,
      address: refs.endereco.current?.value,
      number: refs.numero.current?.value,
      complement: refs.complemento.current?.value,
      city: refs.cidade.current?.value,
      state: refs.estado.current?.value,
      district: refs.bairro.current?.value,
    };

    sdk.User.account.updateUserInfo({ id: user._id, data: obj }, () => {
      toast("Seus dados foram atualizados com sucesso", { type: "success" });
      setTimeout(() => {
        getMyUser();
        handleClose ? handleClose() : router.push("/dashboard/user/myAccount");
      }, 600);
    });
  };

  const values = {
    handleSubmit,
    refs,
  };

  return (
    <EditProfileContext.Provider value={values}>
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfile = () => useContext(EditProfileContext);

type contextValues = {
  handleSubmit: (handleClose?: () => void) => void;
  refs: refsType;
};

type refsType = {
  nome: React.MutableRefObject<any>;
  sobrenome: React.MutableRefObject<any>;
  whatsapp: React.MutableRefObject<any>;
  email: React.MutableRefObject<any>;
  cpf: React.MutableRefObject<any>;
  cnpj: React.MutableRefObject<any>;
  cep: React.MutableRefObject<any>;
  endereco: React.MutableRefObject<any>;
  numero: React.MutableRefObject<any>;
  complemento: React.MutableRefObject<any>;
  cidade: React.MutableRefObject<any>;
  estado: React.MutableRefObject<any>;
  bairro: React.MutableRefObject<any>;
};
