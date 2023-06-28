import { DocumentsType, Store } from "ecommersys/dist/Entities";
import { sdk } from "../sdkProvider";
import { toast } from "react-toastify";
import { t } from "i18next";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ChangeEvent,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { possibleDocumentTypes } from "ecommersys/dist/Entities";
import { api } from "@/services/axiosInstance";
import { getAllProps } from "ecommersys/dist/interfaces";
import { AdminClientType } from "@core/types/client";

const UserDocumentsContext = createContext<props>(null);

// Documents Mock

export const UserDocumentsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [documents, setDocuments] = useState<DocumentsType[]>([]);
  const [storeList, setStoreList] = useState<Partial<Store[]>>([]);
  const [clientList, serClientsList] = useState<AdminClientType[]>([]);
  const [multiSelect, setMultiSelect] = useState({
    isActive: "",
    valid: "",
    owner: "",
    type: "",
  });
  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 500,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });
  const [totalItems, setTotalItems] = useState(0);
  const [uploadDocument, setUploadDocument] =
    useState<Partial<DocumentsType>>(initialDocument);

  //Hooks
  const { t }: { t: any } = useTranslation();

  const documentTypes: DocumentListType[] = [
    { name: "CNPJ", type: "cnpj", verso: false },
    { name: "IDENTIDADE PESSOAL", type: "identidadePessoal", verso: true },
    { name: "CONTRATO SOCIAL", type: "contratoSocial", verso: true },
    { name: "CRO", type: "cro", verso: false },
    { name: "CRM", type: "crm", verso: false },
    { name: "CRBM", type: "crbm", verso: false },
    { name: "CRF", type: "crf", verso: false },
    { name: "CRT", type: "crt", verso: false },
    { name: "ALVARÁ", type: "alvara", verso: false },
    { name: "RECEITUÁRIO", type: "receituario", verso: false },
    { name: "CARTA CIÊNCIA", type: "cartaCiencia", verso: true },
    { name: "LGPD", type: "lgpd", verso: false },
    { name: "CERTIFICADO", type: "certificado", verso: false },
  ];

  const getDocuments = async (admin?: boolean | null) => {
    if (admin === true) {
      const getAll = await api.get("/documents/all", {
        params: { page: 0, size: 50 },
      });
      setDocuments(getAll.data.result);
    } else
      sdk.User.documents.getMyDocuments((res) => {
        setDocuments(res.result);
        console.log("lista de documentos", res);
      });
  };

  const handleStoreGetAll = (filter) => {
    sdk.Global.getAllSellers(query, (res) => {
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

  const handleClientGetAll = async (
    queryProps: getAllProps = query,
    owner?: string
  ) => {
    const queryParam = {
      ...query,
      filter: { ...query.filter, fields: "userInfo username img" },
    };

    const getClients = await api.get("/users/all", { params: queryParam });

    // console.log(getClients.data);
    setTotalItems(getClients.data.totalItems);
    serClientsList(getClients.data.result);
  };

  const handleSetSelectDocByStore = (name: string, state) => {
    if (state.client || state.store) {
      const filterStoreSelect: Partial<Store> = storeList.find(
        (item) => item.name === name
      );

      if (filterStoreSelect?.owner) {
        setMultiSelect({
          ...multiSelect,
          owner: filterStoreSelect.owner,
        });
      } else {
        setMultiSelect({
          ...multiSelect,
          owner: "",
        });
      }
    }

    if (!state.client && !state.store) {
      const filterStoreSelect: Partial<Store> = storeList.find(
        (item) => item.name === name
      );

      if (filterStoreSelect?.owner) {
        getDocumentsById(filterStoreSelect.owner);
      } else {
        getDocuments(true);
      }
    }
  };

  const handleSetSelectDoc = async (name: string) => {
    if (name) {
      const typeDocument = documentTypes.find((type) => type.name === name);

      const queryParam = {
        ...query,
        filter: {
          key: "type " + query.filter.key,
          value: `${typeDocument.type} ` + query.filter.value,
        },
      };

      const getAll = await api.get("/documents/all", {
        params: queryParam,
      });
      setDocuments(getAll.data.result);
    } else {
      getDocuments(true);
    }
  };

  const handleSetSelectDocByClient = (name: string, state) => {
    if (state.client || state.store) {
      const filterClientSelect: Partial<AdminClientType> = clientList.find(
        (item) => item.username === name
      );

      if (filterClientSelect?._id) {
        setMultiSelect({
          ...multiSelect,
          owner: filterClientSelect._id,
        });
      } else {
        setMultiSelect({
          ...multiSelect,
          owner: "",
        });
      }
    }

    if (!state.client && !state.store) {
      const filterClientSelect: Partial<AdminClientType> = clientList.find(
        (item) => item.username === name
      );

      if (filterClientSelect?._id) {
        getDocumentsById(filterClientSelect._id);
      } else {
        getDocuments(true);
      }
    }
  };

  const getDocumentsById = async (id?: string) => {
    const queryParam = {
      ...query,
      filter: {
        key: "owner " + query.filter.key,
        value: `${id} ` + query.filter.value,
      },
    };

    const getAll = await api.get("/documents/all", {
      params: queryParam,
    });
    setDocuments(getAll.data.result);
  };

  const handleMultiSelect = async () => {
    const typeDocument = documentTypes.find(
      (type) => type.name === multiSelect.type
    );

    const queryParam = {
      ...query,
      filter: {
        key: "owner " + "isActive " + "valid " + "type ",
        value:
          `${multiSelect.owner} ` +
          `${multiSelect.isActive} ` +
          `${multiSelect.valid} ` +
          `${multiSelect.type !== "" ? typeDocument.type : ""} `,
      },
    };

    const getAll = await api.get("/documents/all", {
      params: queryParam,
    });

    setDocuments(getAll.data.result);
  };

  const handleSetSelectDocByStates = async (id?: string) => {
    // var statesDoc = id.split("/")[0];
    if (id === "all") {
      getDocuments(true);
    }
    if (id === "auditing") {
      const queryParam = {
        ...query,
        filter: {
          key: "isActive valid",
          value: `${true} ${false}`,
        },
      };
      const getAll = await api.get("/documents/all", {
        params: queryParam,
      });
      setDocuments(getAll.data.result);
    }
    if (id === "invalid") {
      const queryParam = {
        ...query,
        filter: {
          key: "isActive valid",
          value: `${false} ${false}`,
        },
      };
      const getAll = await api.get("/documents/all", {
        params: queryParam,
      });
      setDocuments(getAll.data.result);
    }
    if (id === "valid") {
      const queryParam = {
        ...query,
        filter: {
          key: "isActive valid",
          value: `${true} ${true}`,
        },
      };
      const getAll = await api.get("/documents/all", {
        params: queryParam,
      });
      setDocuments(getAll.data.result);
    }
  };

  const handleSubmitUpload = () => {
    if (uploadDocument.title === "") {
      toast("Preencha o titulo do documento!", { type: "error" });
      return;
    }

    sdk.User.documents.addDocument(uploadDocument, (res) => {
      getDocuments();
    });
  };

  const handleInactivateDocument = (_id: string) => {
    sdk.User.documents.deleteDocument({ documentId: _id }, (res) => {
      getDocuments();
    });
  };

  const handleDocTypeSelected = (event: any): void => {
    setUploadDocument((state) => ({ ...state, type: event?.target?.value }));
  };

  const handleTitleDocument = (event: ChangeEvent<HTMLInputElement>): void => {
    setUploadDocument((state) => ({ ...state, title: event.target.value }));
  };

  const denyReasonUpdateDoc = (event: any): void => {
    setUploadDocument((state) => ({
      ...state,
      denyReason: event?.target?.value,
    }));
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const values: props = {
    documents,
    getDocumentsById,
    documentTypes,
    setDocuments,
    handleDocTypeSelected,
    denyReasonUpdateDoc,
    uploadDocument,
    setUploadDocument,
    handleTitleDocument,
    handleSubmitUpload,
    handleInactivateDocument,
    getDocuments,
    clientList,
    handleStoreGetAll,
    handleSetSelectDocByStore,
    handleSetSelectDocByClient,
    handleClientGetAll,
    storeList,
    handleSetSelectDoc,
    handleSetSelectDocByStates,
    multiSelect,
    setMultiSelect,
    handleMultiSelect,
  };

  return (
    <UserDocumentsContext.Provider value={values}>
      {children}
    </UserDocumentsContext.Provider>
  );
};

export const useUserDocuments = () => useContext(UserDocumentsContext);

type props = {
  documents: DocumentsType[];
  handleSetSelectDocByStates: any;
  handleStoreGetAll: any;
  handleSetSelectDocByStore: any;
  storeList: Partial<Store[]>;
  clientList: Partial<AdminClientType[]>;
  handleClientGetAll: any;
  handleSetSelectDocByClient: any;
  handleSetSelectDoc: any;
  documentTypes: DocumentListType[];
  getDocumentsById: any;
  multiSelect: any;
  setMultiSelect: any;
  setDocuments: any;
  handleDocTypeSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadDocument: Partial<DocumentsType>;
  setUploadDocument: React.Dispatch<SetStateAction<Partial<DocumentsType>>>;
  handleTitleDocument: (event: ChangeEvent<HTMLInputElement>) => void;
  denyReasonUpdateDoc: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitUpload: () => void;
  handleInactivateDocument: (_id: string) => void;
  getDocuments: (admin?: boolean | null) => void;
  handleMultiSelect: any;
};

export type DocumentListType = {
  name: string;
  type: possibleDocumentTypes;
  required?: boolean;
  verso: boolean;
};

const initialDocument: Partial<DocumentsType> = {
  title: "",
  links: {
    front: "",
    back: "",
  },
  type: "cnpj",
};
