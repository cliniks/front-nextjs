import { Category, Product as ProductType } from "ecommersys/dist/Entities";
import { sdk } from "../sdkProvider";
import { toast } from "react-toastify";
import { t } from "i18next";
import {
  ChangeEvent,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAllProps } from "ecommersys/dist/interfaces";
import { SelectChangeEvent } from "@mui/material";
import { globalsRequests } from "@/services/queries/globalsRequest";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

const SellerProductsContext = createContext<props>(null);

export const SellerProductsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [product, setProduct] =
    useState<Partial<ProductType>>(initialProductState);
  const [selectedItems, setSelectedProducts] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 10,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });

  const [totalItems, setTotalItems] = useState(0);

  const router = useRouter();

  const tagInputRef = useRef<any>();

  const getProduct = (id: string) => {
    if (!id) return setProduct(initialProductState);
    sdk.Global.getSingleProduct(
      { key: "_id", value: id },
      (res: ProductType) => {
        setProduct(() => res);
        // updateRefValues();
      }
    );
  };

  const updateProductState = (e) => {
    const { name, value, checked } = e.target;
    const shippingInfo = ["height", "width", "weight", "length"];
    const stockInfo = ["qnt", "sku", "SoldIndividually"];
    const booleanInside = [
      "isActive",
      "status",
      "virtualProduct",
      "SoldIndividually",
    ];

    if (shippingInfo.includes(name)) {
      return setProduct((state) => ({
        ...state,
        shippingInfo: { ...state.shippingInfo, [name]: value },
      }));
    }
    if (stockInfo.includes(name)) {
      return setProduct((state) => ({
        ...state,
        stockInfo: {
          ...state.stockInfo,
          [name]: booleanInside.includes(name) ? checked : value,
        },
      }));
    }
    if (booleanInside.includes(name)) {
      return setProduct((state) => ({ ...state, [name]: checked }));
    }
    return setProduct((state) => ({ ...state, [name]: value }));
  };

  const submitValues = () => {
    if (product.name === "") {
      toast("Ops, seu produto precisa de um nome!", {
        type: "error",
        delay: 3000,
      });
      return;
    }

    if (product.regularPrice <= "0") {
      toast("Ops, valor de produto inválido!", {
        type: "error",
        delay: 3000,
      });
      return;
    }

    if (product.stockInfo.sku === "" || product.stockInfo.qnt === 0) {
      toast("Ops, os campos de inventário não foram preenchidos!", {
        type: "error",
        delay: 3000,
      });
      return;
    }

    if (
      product.shippingInfo.height === "" ||
      product.shippingInfo.weight === "" ||
      product.shippingInfo.width === ""
    ) {
      toast("Ops, os campos de envio não foram preenchidos!", {
        type: "error",
        delay: 3000,
      });
      return;
    }

    if (product._id) {
      sdk.Seller.dashboard.product.updateSingleProduct(
        {
          productId: `${product._id}`,
          data: product,
        },
        (result) => {
          toast("Produto publicado com sucesso!", { type: "success" });
          setTimeout(() => {
            router.push("/dashboard/seller/products");
          }, 1000);
        }
      );
    } else {
      sdk.Seller.dashboard.product.createSingleProduct(
        product as ProductType,
        (result) => {
          toast("Produto publicado com sucesso!", { type: "success" });
          setTimeout(() => {
            router.push("/dashboard/seller/products");
          }, 1000);
        }
      );
    }
  };

  const handleDeleteImg = (index) => {
    let imgs = Array.from(product.imgs);
    imgs.splice(index, 1);
    setProduct((product) => ({ ...product, imgs }));
  };

  const handleDeleteTag = (productTagToDelete: string) => () => {
    setProduct((product) => ({
      ...product,
      tags: product.tags.filter(
        (productTag) => productTag !== productTagToDelete
      ),
    }));
    toast("Tag removida com sucesso!", { type: "success" });
  };

  const getCategories = () => {
    sdk.Global.getAllGlobalCategories({}, (res) => {
      setCategories(res.result);
    });
  };

  const HandleDeleteCompleted = (productId: string) =>
    sdk.Seller.dashboard.product.updateSingleProduct(
      {
        productId,
        data: { isActive: false },
      },
      (res) => {
        const returnText = t("You successfully deleted the product");
        toast(returnText, { type: "success" });
      }
    );

  const handleClearCategories = () => {
    setProduct((state) => ({ ...state, categories: [] }));
  };

  const verifyCategoryChecked = (category: Category) =>
    product.categories.filter((item) => item.split("/")[0] === category._id)
      ?.length > 0;

  const handleSelectLabel = (category: Category, index: number) => {
    const containsCategory = verifyCategoryChecked(category);

    let newCategories = Array.from(product.categories);

    if (!containsCategory) {
      newCategories.push(`${category._id}/${category.name}`);
      if (!product.categories.includes(`${category.hierarchy}`))
        newCategories.push(`${category.hierarchy}`);
    } else {
      const findIndex = newCategories.indexOf(
        `${category._id}/${category.name}`
      );
      newCategories.splice(findIndex, 1);
    }

    setProduct((product) => ({ ...product, categories: newCategories }));
  };

  const getSellerProducts = (queryProps: getAllProps = query, stock?) => {
    if (stock !== "" && stock !== "null " && stock !== undefined) {
      const queryParam = {
        ...query,
        page: query.page,
        // filter: {
        //   key: "",
        //   value: ``,
        // },
      };

      sdk.Seller.dashboard.product.getMyProducts(queryParam, (res) => {
        setProducts(res.result);
        setTotalItems(res.totalItems);
      });
    }

    const queryParam = { ...query, page: query.page };
    sdk.Seller.dashboard.product.getMyProducts(queryParam, (res) => {
      setProducts(res.result);
      setTotalItems(res.result?.length);
    });
  };

  const addTag = () => {
    // updateRefValues();
    let tags = Array.from(product.tags);
    const value = tagInputRef.current.value;
    if (value?.length < 2)
      return toast("Tag precisa ter no mínimo 2 caracteres!", {
        type: "error",
      });
    if (tags.includes(value)) {
      return toast("Tag existente!", { type: "error" });
    }
    tags.push(value);
    setProduct((product) => ({
      ...product,
      tags,
    }));
    toast("Tag adicionada com sucesso!", { type: "success" });
    tagInputRef.current.value = "";
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery((state) => ({
      ...state,
      filter: {
        ...state.filter,
        key: "name",
        value: event.target.value,
      },
    }));
  };

  const handleSearchByQuery = (e) => {
    e.preventDefault();
    getSellerProducts();
  };

  const handleSelectAllProducts = (): void => {
    const selectAll: string[] = products.map(
      (product) => product._id as string
    );
    setSelectedProducts((selecteds) =>
      selecteds?.length === 0 ? selectAll : []
    );
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setQuery((query) => ({ ...query, page: newPage }));
    getSellerProducts({ ...query, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setQuery((query) => ({ ...query, size: parseInt(value), page: 0 }));
    getSellerProducts({ ...query, size: parseInt(value), page: 0 });
  };

  const updateState = (
    e:
      | React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
        >
      | SelectChangeEvent<any>
  ) => {
    // updateRefValues();
    // setProduct((state) => ({ ...state, [name]: value }));
  };

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg"],
    },
    onDropAccepted(files) {
      files.map(async (file) => {
        const loadToast = toast.loading("Adicionando imagem do produto");
        try {
          const formData = new FormData();
          formData.append("img", file);

          const uploadSingle = await globalsRequests.uploadImage(formData);

          let imgs = Array.from(product.imgs);

          imgs.push(uploadSingle);

          setProduct((state: any) => ({ ...state, imgs }));
          toast.update(loadToast, {
            type: "success",
            isLoading: false,
            autoClose: 1000,
            render: "Imagem adicionada com sucesso!",
          });

          acceptedFiles.push(file);
        } catch (err) {
          toast.update(loadToast, {
            type: "error",
            isLoading: false,
            autoClose: 1000,
            render: "error",
          });
        }
      });
    },
  });

  const values: props = {
    /** state */
    product,
    query,
    products,
    totalItems,
    categories,
    setQuery,
    setProduct,
    setProducts,
    submitValues,
    setCategories,
    selectedItems,
    setSelectedProducts,
    /** refs */
    tagInputRef,
    /** metodos */
    addTag,
    getProduct,
    updateState,
    getCategories,
    handleDeleteImg,
    handleQueryChange,
    handleLimitChange,
    handlePageChange,
    handleDeleteTag,
    handleSelectLabel,
    getSellerProducts,
    handleSearchByQuery,
    verifyCategoryChecked,
    HandleDeleteCompleted,
    handleSelectAllProducts,
    handleClearCategories,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
    updateProductState,
  };

  return (
    <SellerProductsContext.Provider value={values}>
      {children}
    </SellerProductsContext.Provider>
  );
};

export const useSellerProducts = () => useContext(SellerProductsContext);

type props = {
  product: Partial<ProductType>;
  products: ProductType[];
  categories: Category[];
  setProduct: React.Dispatch<SetStateAction<Partial<ProductType>>>;
  setCategories: React.Dispatch<SetStateAction<Category[]>>;
  query: getAllProps;
  setQuery: React.Dispatch<SetStateAction<getAllProps>>;
  setProducts: React.Dispatch<SetStateAction<ProductType[]>>;
  setSelectedProducts: any;
  addTag: any;
  totalItems: number;
  submitValues: any;
  getProduct: (id: string) => void;
  updateState: any;
  getCategories: any;
  handleDeleteImg: any;
  handleQueryChange: any;
  handleLimitChange: any;
  handlePageChange: any;
  handleDeleteTag: any;
  handleSelectLabel: any;
  getSellerProducts: any;
  handleSearchByQuery: any;
  verifyCategoryChecked: any;
  HandleDeleteCompleted: any;
  handleSelectAllProducts: any;
  handleClearCategories: Function;
  tagInputRef: any;
  selectedItems: any;
  isDragActive: any;
  isDragAccept: any;
  isDragReject: any;
  getRootProps: any;
  getInputProps: any;
  updateProductState: any;
};

export const initialProductState: Partial<ProductType> = {
  name: "",
  description: "",
  price: "",
  regularPrice: "",
  isActive: true,
  shippingInfo: {
    weight: "",
    height: "",
    width: "",
    length: "",
  },
  status: false,
  categories: [],
  imgs: [],
  discount: [],
  hangTags: [],
  owner: "",
  stockInfo: { qnt: 0, sku: "", SoldIndividually: true },
  virtualProduct: false,
  tags: [],
};
