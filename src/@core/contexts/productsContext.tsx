import { Product } from "ecommersys/dist/Entities";
import { getAllProps } from "ecommersys/dist/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { sdk } from "@core/sdkProvider";
import { useSDK } from "./sdkContext";

const ProductsContext = createContext<valuesTypes>(null);

export const ProductsProvider = ({ children }) => {
  const { connected } = useSDK();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [query, setQuery] = useState<getAllProps>({
    filter: { fields: "", key: "", value: "" },
    page: 0,
    size: 10,
  });

  const updateFilter = (newFilter: getAllProps["filter"]) => {
    setQuery((state) => ({ ...state, filter: newFilter }));
  };

  const updatePagination = ({ page, size }: { page: number; size: number }) => {
    setQuery((state) => ({ ...state, page, size }));
  };

  const getProducts = () =>
    sdk.Global.getAllProducts(query, (res) => {
      setProducts(res.result);
    });

  const getSingleProduct = ({ key, value }: { key: string; value: string }) => {
    sdk.Global.getSingleProduct({ key, value }, (res) => {
      setProduct(res);
    });
  };

  const handleFavoriteProduct = (productId: string) => {
    sdk.User.product.favoriteProduct(productId, () => {
      getProducts();
      getSingleProduct({ key: "_id", value: productId });
    });
  };

  useEffect(() => {
    if (connected) {
      getProducts();
    }
  }, [connected]);

  const values: valuesTypes = {
    products,
    product,
    getProducts,
    updateFilter,
    updatePagination,
    query,
    setQuery,
    getSingleProduct,
    handleFavoriteProduct,
    setProduct,
  };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

type valuesTypes = {
  products: Product[];
  product: Product;
  getProducts: () => void;
  updateFilter: (newFilter: getAllProps["filter"]) => void;
  updatePagination: ({ page, size }: { page: number; size: number }) => void;
  query: getAllProps;
  setQuery: (newFilter: getAllProps) => void;
  getSingleProduct: ({ key, value }: { key: string; value: string }) => void;
  handleFavoriteProduct: (productId: string) => void;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
};
