import { Sales, Store } from "ecommersys/dist/Entities";
import { sdk } from "../sdkProvider";
import { toast } from "react-toastify";
import {
  ChangeEvent,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { getAllProps } from "ecommersys/dist/interfaces";

import { useTranslation } from "react-i18next";

import { api } from "@/services/axiosInstance";

import { decompilePrice } from "@core/utils/functions";

const AdminStoresContext = createContext<props>(null);

export const AdminStoresProvider = ({ children }: React.PropsWithChildren) => {
  const { t }: { t: any } = useTranslation();
  const [paymentCount, setPaymentmentCount] = useState(0);
  const [installmentValue, setInstallmentValue] = useState("");

  const [store, setStore] = useState<any>(initialStoreState);
  const [stores, setStores] = useState<Store[]>([]);
  const [order, setOrder] = useState<Partial<Sales>>();

  const [totalItems, setTotalItems] = useState(0);

  const [edit, setEdit] = useState(false);
  const [selectedItems, setSelectedClients] = useState<string[]>([]);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [indexPayment, setIndexPayment] = useState("");
  const [storeList, setStoreList] = useState<any>([]);
  const [selectStore, setSelectStore] = useState<any>(null);

  const handleStoreGetAll = (filter) => {
    sdk.Global.getAllSellers({ filter, page: 0, size: 10 }, (res) => {
      if (res.result?.length === 0) {
        toast("Nenhuma loja encontrada para essa pesquisa!", {
          type: "info",
          delay: 5000,
        });
      } else {
        setStoreList(res.result);
      }
    });
  };
  const handleSetSelectStore = (name: string) => {
    const filterStoreSelect: Partial<Store> = storeList.find(
      (item) => item.name === name
    );
    setSelectStore(filterStoreSelect);
  };

  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 10,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });

  const getStores = async (queryProps: getAllProps = query, id?: string) => {
    const queryParam = {
      ...queryProps,
      filter: { ...queryProps.filter },
    };

    const getListstores = await api.get("/sellers/all", {
      params: queryParam,
    });

    getListstores.data.result?.map((listStores) =>
      listStores._id === id ? setStore(listStores) : null
    );

    setStores(getListstores.data.result);
    setTotalItems(getListstores.data.totalItems);
  };

  const getStoreClient = () => {
    sdk.Seller.store.getMyStore((res) => setStore(res));
  };

  const getStore = async (id) => {
    stores?.map((listStores) =>
      listStores._id === id ? setStore(listStores) : null
    );
  };

  const getOrder = async (id) => {
    const queryParam = {
      ...query,
      filter: {
        key: "_id" + query.filter.key,
        value: `${id} ` + query.filter.value,
      },
    };

    const response = await api.get(`/sales/all`, {
      params: queryParam,
    });

    response.data.result.map(
      (listOrders) => (listOrders._id = id ? setOrder(listOrders) : null)
    );
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const HandleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    toast(t("You successfully deleted the coupon"), {
      type: "success",
    });
  };

  const handleSelectAllCLients = (): void => {
    const selectAll: string[] = stores.map((store) => store._id as string);
    setSelectedClients((selecteds) =>
      selecteds?.length === 0 ? selectAll : []
    );
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

  const handleSearchByQuery = (e) => {
    e.preventDefault();

    getStores();
  };

  const handleSelectAllclients = (): void => {
    const selectAll: string[] = stores.map((store) => store._id as string);

    setSelectedClients((selecteds) =>
      selecteds?.length === 0 ? selectAll : []
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setQuery((query) => ({ ...query, page: newPage }));
    getStores({ ...query, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setQuery((query) => ({ ...query, size: parseInt(value), page: 0 }));
    getStores({ ...query, size: parseInt(value), page: 0 });
  };

  const handleUptadeStore = (e) => {
    const { name, value } = e.target;
    return setStore((state) => ({
      ...state,
      storeInfo: {
        ...state.storeInfo,
        [name]: value,
      },
    }));
  };

  const handleUptadeStoreShipping = (e) => {
    const { name, value } = e.target;
    return setStore((state) => ({
      ...state,
      freeShippingMinPrice: {
        ...state.freeShippingMinPrice,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (handleClose?: () => void) => {
    await api.patch(`sellers/${store._id}`, store);
    toast("Atualizado  com sucesso!", { type: "success" });
  };

  const handleSubmitStore = async (handleClose?: () => void) => {
    await api.patch(`sellers/${store._id}`, store);
    toast("Atualizado  com sucesso!", { type: "success" });
  };

  const handleUptadeStoreValues = async (installmentCount: number) => {
    let installmentRules = Array.from(store.installmentRules);

    installmentRules.push({
      installmentCount,
      installmentValue: decompilePrice(installmentValue),
    });

    if (paymentCount > 0) {
      store.installmentRules.find(
        (rules) => rules.installmentCount == paymentCount
      ).installmentValue = installmentValue;
    }

    const toUpdate = { ...store, installmentRules };

    setStore(toUpdate);

    await api.patch(`sellers/${store._id}`, { installmentRules });
    toast("Atualizado  com sucesso!", { type: "success" });

    // return setStore((state) => ({
    //   ...state,
    //   freeShippingMinPrice: {
    //     ...state.freeShippingMinPrice,
    //     [name]: value,
    //   },
    // }));
  };

  const handleEditInstallmentRules = async (id) => {
    try {
      let installmentRules = Array.from(store.installmentRules);

      installmentRules.map((rule: any) =>
        rule._id === indexPayment
          ? (rule.installmentValue = decompilePrice(installmentValue))
          : null
      );

      await api.patch(`sellers/${store._id}`, { installmentRules });

      setStore((state) => ({ ...state, installmentRules: installmentRules }));
      setPaymentmentCount(0);
      toast("Atualizado  com sucesso!", { type: "success" });
      setEdit(false);
    } catch (error) {
      toast("Não foi possivel deletar a regra!", { type: "error" });
      getStore(id);
    }
  };

  const handleDeletePaymentRule = async (index: number, id) => {
    try {
      let newRules = Array.from(store.installmentRules);

      newRules.splice(index, 1);

      await api.patch(`sellers/${store._id}`, { installmentRules: newRules });
      setStore((state) => ({ ...state, installmentRules: newRules }));
      toast("Regra de Pagamento deleta com sucesso!", { type: "success" });
    } catch (error) {
      toast("Não foi possivel deletar a regra!", { type: "error" });
      getStore(id);
    }
  };
  const values: props = {
    query,
    store,
    stores,
    getStore,
    getStores,
    setQuery,
    totalItems,
    order,
    handleQueryChange,
    handleSearchByQuery,
    handleSelectAllclients,
    handlePageChange,
    handleLimitChange,
    selectedItems,
    setSelectedClients,
    HandleDeleteCompleted,
    handleSelectAllCLients,
    handleConfirmDelete,
    getOrder,
    selectStore,
    handleUptadeStore,
    storeList,
    handleSubmit,
    setStore,
    handleEditInstallmentRules,
    handleUptadeStoreValues,
    setPaymentmentCount,
    setInstallmentValue,
    installmentValue,
    paymentCount,
    handleUptadeStoreShipping,
    handleDeletePaymentRule,
    getStoreClient,
    indexPayment,
    setIndexPayment,
    edit,
    setEdit,
  };

  return (
    <AdminStoresContext.Provider value={values}>
      {children}
    </AdminStoresContext.Provider>
  );
};

export const useAdminStores = () => useContext(AdminStoresContext);

type props = {
  edit: any;
  setEdit: any;
  setInstallmentValue: any;
  setPaymentmentCount: any;
  paymentCount: any;
  installmentValue: any;
  store: any;
  stores: Store[];
  handleUptadeStoreValues: any;
  handleEditInstallmentRules: any;
  handleUptadeStore: any;
  getOrder: any;
  getStores: any;
  getStore: any;
  query: getAllProps;
  setQuery: React.Dispatch<SetStateAction<getAllProps>>;
  totalItems: number;
  order: any;
  handleSubmit: any;
  handleQueryChange: any;
  handleSearchByQuery: any;
  handleSelectAllclients: any;
  setStore: any;
  handlePageChange: any;
  handleLimitChange: any;
  selectedItems: any;
  setSelectedClients: any;
  HandleDeleteCompleted: any;
  handleSelectAllCLients: any;
  handleConfirmDelete: any;
  handleDeletePaymentRule: any;
  selectStore: Partial<Store>;
  storeList: Partial<Store[]>;
  getStoreClient: any;
  handleUptadeStoreShipping: any;
  indexPayment: any;
  setIndexPayment: any;
};

export type objRefs = {
  name: MutableRefObject<any>;
  description: MutableRefObject<any>;
  price: MutableRefObject<any>;
  regularPrice: MutableRefObject<any>;
  status: MutableRefObject<any>;
  shippingInfo: {
    weight: MutableRefObject<any>;
    height: MutableRefObject<any>;
    width: MutableRefObject<any>;
  };
  stockInfo: {
    qnt: MutableRefObject<any>;
    sku: MutableRefObject<any>;
    SoldIndividually: MutableRefObject<any>;
  };
  virtualProduct: MutableRefObject<any>;
};

export const initialStoreState: any = {
  asaasApiKey: "",
  asaasID: "",
  asaasWalletId: "",
  banner: "",
  img: "",
  messages: [],
  name: "",
  openOrders: [],
  owner: "",
  products: [],
  productsCount: 0,
  salesHistory: [],
  salesToSend: [],
  segments: [],
  storeInfo: {
    cnpj: "",
    cnae: "",
    address: "",
    number: "",
    cpf: "",
    complement: "",
    enterpriseSocial: "",
    enterpriseName: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    district: "",
    zipCode: "",
    email: "",
  },
  _id: "",
  freeShippingMinPrice: {
    value: 0,
    hasFreeShipping: false,
  },
  installmentRules: [],
};
