import { StoreSolicitate } from "ecommersys/dist/Entities";
import { getAllProps } from "ecommersys/dist/interfaces";
import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cnpjType } from "@core/types/sellerSolicitationTypes";
import { sdk } from "@core/sdkProvider";
import { globalsRequests } from "@/services/queries/globalsRequest";
import { useUser } from "./UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "@/services/axiosInstance";

const SolicitationContext = createContext<solititationValues>(null);

export const SolicitationProvider = ({ children }: React.PropsWithChildren) => {
  const [solicitations, setSolicitations] = useState<StoreSolicitate[]>([]);

  const { user, isAuthenticated } = useUser();
  const [totalItems, setTotalItems] = useState(0);
  const [singleSolicitation, setSingleSolicitation] =
    useState<StoreSolicitate>(initialSolicitation);

  const [status, setStatus] = useState(false);

  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 10,
    filter: { fields: "", key: "", value: "" },
  });

  const [cnpj, setCnpj] = useState<cnpjType>();

  const verify = () =>
    sdk.User.account.verifyMySolicitation(
      user._id,
      (res: any) => {
        if (res.owner?._id === user._id) {
          setSingleSolicitation(res);
          setStatus(true);
        } else {
          setStatus(false);
        }
      },
      () => {}
    );

  const getSingle = async (id: string) =>
    await sdk.Admin.getSingleSellerSolicitations(
      { key: "_id", value: id },
      async (res) => {
        const getCnpj = await globalsRequests.getCnpj(res.storeInfo.cnpj);
        setSingleSolicitation(res);
        setCnpj(getCnpj);
      }
    );

  const getAllSolicitations = async (queryProps: getAllProps = query) => {
    const queryParam = {
      ...queryProps,
      filter: { ...queryProps.filter },
    };

    await sdk.Admin.getAllSellerSolicitations(queryParam, (res) => {
      setSolicitations(res.result);
      setTotalItems(res.totalItems);
    });
  };
  const updateSingleSolicitation = (e) => {
    const { name, value } = e.target;

    setSingleSolicitation((state) => ({ ...state, [name]: value }));
  };
  const updateSingleSolicitationCpf = (e) => {
    const { name, value } = e.target;

    setSingleSolicitation((state) => ({ ...state, [name]: value }));

    setSingleSolicitation((state) => ({
      ...state,
      storeInfo: {
        ...state.storeInfo,
        [name]: value,
      },
    }));
  };

  const handleSolicitation = async () => {
    try {
      // sdk.User.account.solicitSeller(singleSolicitation, (res) => {
      //   verify();
      // }
      const response = await api.get("sellerSolicitate/all", {
        params: { size: 100, page: 0 },
      });

      console.log(singleSolicitation.storeInfo.cpf);

      const findSolicitateByCpf = await response.data.result.find(
        (solicitate) =>
          solicitate.storeInfo.cpf === singleSolicitation.storeInfo.cpf &&
          solicitate.storeInfo.cpf !== "" &&
          solicitate.storeInfo.cpf !== null
      );
      const findSolicitateByCnpj = await response.data.result.find(
        (solicitate) =>
          solicitate.storeInfo.cnpj === singleSolicitation.storeInfo.cnpj &&
          solicitate.storeInfo.cnpj !== "" &&
          solicitate.storeInfo.cnpj !== null
      );

      const findSolicitateByName = await response.data.result.find(
        (solicitate) =>
          solicitate.name === singleSolicitation.name &&
          solicitate.name !== "" &&
          solicitate.name !== null
      );

      if (findSolicitateByCnpj || findSolicitateByCpf) {
        toast("CPF ou CNPJ ja cadastrado.");
      } else if (findSolicitateByName) {
        toast("Nome ja Existente");
      } else {
        await api.post("sellerSolicitate", singleSolicitation);
        toast("Aguarde a valiradção");
        verify();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const rejectSolicitation = (solicitationId) => {
    sdk.Admin.rejectSolicitation({ solicitationId }, (res) => {
      getAllSolicitations();
    });
  };

  const confirmSolicitation = async (id: string) => {
    sdk.Admin.confirmSolicitation({ solicitationId: id }, (res) => {
      getAllSolicitations();
    });
    // const confirm = await api.post(`sellerSolicitate/confirm/${id}`);
    // return confirm;
  };

  const GetCNPJ = async (value: string) => {
    // setLoading(true);
    try {
      const cnpjReajust = value
        .split("")
        .filter((item) => {
          if (!item.includes(".") && !item.includes("-") && !item.includes("/"))
            return true;
        })
        .join("")
        .toString();

      const cnpjData = await axios.get(
        `https://publica.cnpj.ws/cnpj/${cnpjReajust}`
      );

      const rsocialValue = cnpjData.data.razao_social;
      const cnaeValue = `${cnpjData.data.estabelecimento.atividade_principal.subclasse}. ${cnpjData.data.estabelecimento.atividade_principal.descricao}`;

      const data = cnpjData.data.estabelecimento;

      setSingleSolicitation((state) => ({
        ...state,
        storeInfo: {
          ...state.storeInfo,
          address: data.logradouro,
          zipCode: data.cep,
          city: data.cidade.nome,
          cnpj: data.cnpj,
          cpf: "",
          cnae: cnaeValue,
          country: data.pais.nome,
          district: data.bairro || "",
          enterpriseName: data.nome_fantasia || "",
          enterpriseSocial: rsocialValue,
          complement: data.complemento,
          state: data.estado.sigla,
          number: data.numero,
        },
      }));
    } catch (err) {
      toast(
        "Não foi possível achar o CNPJ informado, verifique e tente novamente",
        { type: "error" }
      );
    }
  };

  const getCpf = async () => {
    // setLoading(true);
    try {
      const data = user.userInfo;

      const newSolicitate = {
        ...singleSolicitation,
        storeInfo: {
          ...singleSolicitation.storeInfo,
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          cnpj: data.cnpj || "",
          cpf: data.cpf,
          cnae: "",
          country: data.country,
          birthDate: data.birthDate || singleSolicitation.storeInfo.birthDate,
          district: data.district || "",
          enterpriseName: data.enterpriseName || "",
          enterpriseSocial: data.enterpriseSocial,
          complement: data.complement,
          state: data.state,
          number: data.number,
        },
      };

      setSingleSolicitation(newSolicitate);
    } catch (err) {
      toast(
        "Não foi possível achar o CNPJ informado, verifique e tente novamente",
        { type: "error" }
      );
    }
  };

  const updateSolicitationByMyData = () => {
    const storeInfoData = [
      "address",
      "zipCode",
      "city",
      "cnpj",
      "cpf",
      "complement",
      "email",
      "number",
      "state",
      "cnae",
      "birthDate",
      "country",
      "district",
      "enterpriseName",
      "enterpriseSocial",
      "phone",
    ];
    let storeInfo: any = {};
    storeInfoData.map((item) => (storeInfo[item] = user.userInfo[item]));

    setSingleSolicitation((state) => ({ ...state, storeInfo }));
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery((state) => ({
      ...state,
      filter: {
        key: "name",
        value: event.target.value,
      },
    }));
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setQuery((query) => ({ ...query, size: parseInt(value), page: 0 }));
    getAllSolicitations({ ...query, size: parseInt(value), page: 0 });
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setQuery((query) => ({ ...query, page: newPage }));
    getAllSolicitations({ ...query, page: newPage });
  };

  const handleSearchByQuery = (e) => {
    e.preventDefault();

    getAllSolicitations();
  };

  useEffect(() => {
    if (isAuthenticated) {
      verify();
      if (user) updateSolicitationByMyData();
    }
  }, [isAuthenticated, user]);

  const values: solititationValues = {
    getSingle,
    solicitations,
    singleSolicitation,
    getAllSolicitations,
    cnpj,
    updateSingleSolicitation,
    updateSingleSolicitationCpf,
    status,
    handleSolicitation,
    rejectSolicitation,
    confirmSolicitation,
    verify,
    GetCNPJ,
    updateSolicitationByMyData,
    getCpf,
    handleQueryChange,
    handleLimitChange,
    handlePageChange,
    handleSearchByQuery,
    query,
    totalItems,
  };
  return (
    <SolicitationContext.Provider value={values}>
      {children}
    </SolicitationContext.Provider>
  );
};

export const useSolicitation = () => useContext(SolicitationContext);

type solititationValues = {
  getSingle: (id: string) => void;
  solicitations: StoreSolicitate[];
  totalItems: any;
  singleSolicitation: StoreSolicitate;
  updateSolicitationByMyData: any;
  getAllSolicitations: () => void;
  cnpj: cnpjType;
  query: any;
  updateSingleSolicitation: any;
  updateSingleSolicitationCpf: any;
  status: boolean;
  handleSolicitation: () => void;
  rejectSolicitation: (id: string) => void;
  confirmSolicitation: (id: string) => void;
  verify: () => void;
  GetCNPJ: (value: string) => void;
  getCpf: () => void;
  handleQueryChange: any;
  handleLimitChange: any;
  handlePageChange: any;
  handleSearchByQuery: any;
};

const initialSolicitation: StoreSolicitate = {
  isActive: false,
  name: "",
  storeInfo: {
    address: "",
    zipCode: "",
    city: "",
    cnpj: "",
    cpf: "",
    birthDate: "",
    complement: "",
    email: "",
    number: "",
    state: "",
    cnae: "",
    country: "",
    district: "",
    enterpriseName: "",
    enterpriseSocial: "",
    phone: "",
  },
};
