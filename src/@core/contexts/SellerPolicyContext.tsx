import { sdk } from "../sdkProvider";

import { SetStateAction, createContext, useContext, useState } from "react";

import { getAllProps } from "ecommersys/dist/interfaces";

import { useTranslation } from "react-i18next";

import { StorePolicy, PolicyType } from "ecommersys/dist/Entities";

import { toast } from "react-toastify";

import { api } from "@/services/axiosInstance";

const initialValues = {
  policys: [],
  policysTypes: [],
  getSellerPolicies: () => null,
  addNewPolicy: () => null,
  updatePolicyState: () => null,
  handleUpdateOrCreatePolicy: () => null,
  editting: false,
  setEditting: () => null,
  policy: null,
  getSellerPolicie: () => null,
  getOwnerPolicy: () => null,
  setPolicy: () => null,
};

const SellerPolicyContext = createContext<props>(initialValues);

export const SellerPolicyProvider = ({ children }: React.PropsWithChildren) => {
  const { t }: { t: any } = useTranslation();

  const [policys, setPolicys] = useState<StorePolicy[]>([]);
  const [policy, setPolicy] = useState<Partial<StorePolicy>>(initialPolicy);

  const [editting, setEditting] = useState(false);

  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 10,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });

  const handleUpdateOrCreatePolicy = async (policiesId?) => {
    if (policy.name === "") {
      toast("Sua política precisa de um nome!", { type: "error" });
      return;
    }

    if (policy.body === "") {
      toast("Ops, parece que esqueceu de escrever sua política!", {
        type: "error",
      });
      return;
    }

    if (!policiesId) return addNewPolicy();
    return await sdk.Seller.dashboard.policy.updateSinglePolicy(
      {
        policyId: policiesId,
        data: policy,
      },
      (res) => {
        toast(t("Policy updated successfully."), { type: "success" });
      },
      (res) => {}
    );
  };

  const updatePolicyState = async (e) => {
    console.log(e);
    const { name, value } = e.target;

    return setPolicy((state) => ({ ...state, [name]: value }));
  };

  const addNewPolicy = async () => {
    return await sdk.Seller.dashboard.policy.createSinglePolicy(
      policy as StorePolicy,
      (res) => {
        toast(t("Policy created successfully."), { type: "success" });
        getSellerPolicies();
        setEditting(false);
      }
    );
  };

  const policysTypes: PolicytListType[] = [
    { name: "DEVOLUTION / EXCHANGE", type: "devolution_exchange" },
    { name: "PAYMENT", type: "payment" },
    { name: "REPAYMENT", type: "repayment" },
  ];

  const getSellerPolicies = async () =>
    await sdk.Seller.dashboard.policy.getMyPolicies(
      {
        page: 0,
        size: 10,
        filter: {
          fields: "",
        },
      },
      (res) => {
        setPolicys(res.result);
      }
    );

  const getOwnerPolicy = async (id) => {
    const getListstores = await api.get("/sellers/all", {
      params: { key: "_id", value: id },
    });

    // getListstores.data.result?.map((listStores) =>
    //   listStores._id === id ? listStores : null
    // );

    const teste = getListstores.data.result.find((listStores) =>
      listStores._id === id ? listStores : null
    );

    const queryParam = {
      ...query,
      filter: {
        key: "owner",
        value: `${id}`,
      },
    };

    const abc = await api.get("/sellers/policies/all", {
      params: queryParam,
    });

    setPolicys(abc.data.result);

    // console.log(abc.data.result);
  };

  const getSellerPolicie = async (id: string) => {
    if (!id) return setPolicy(initialPolicy);
    await sdk.Seller.dashboard.policy.getSinglePolicy(
      { key: "_id", value: id },
      (res: StorePolicy) => {
        setPolicy(() => res);
        // updateRefValues();
      }
    );
  };

  const values: props = {
    getSellerPolicies,
    policysTypes,
    policys,
    addNewPolicy,
    updatePolicyState,
    handleUpdateOrCreatePolicy,
    editting,
    setEditting,
    policy,
    getSellerPolicie,
    setPolicy,
    getOwnerPolicy,
  };

  return (
    <SellerPolicyContext.Provider value={values}>
      {children}
    </SellerPolicyContext.Provider>
  );
};

export const useSellerPolicy = () => useContext(SellerPolicyContext);

type props = {
  policys: StorePolicy[];
  policysTypes: PolicytListType[];
  getSellerPolicies: any;
  addNewPolicy: any;
  updatePolicyState: any;
  handleUpdateOrCreatePolicy: any;
  editting: any;
  setEditting: any;
  policy: Partial<StorePolicy> | null;
  getSellerPolicie: any;
  getOwnerPolicy: any;
  setPolicy: React.Dispatch<SetStateAction<Partial<StorePolicy>>>;
};

export type PolicytListType = {
  name: string;
  type: PolicyType;
  required?: boolean;
};

const initialPolicy: StorePolicy = {
  name: "",
  isActive: true,
  type: "devolution_exchange",
  body: "",
  owner: "",
};
