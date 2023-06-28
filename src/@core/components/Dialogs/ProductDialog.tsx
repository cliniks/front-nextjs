import { Box, Dialog } from "@mui/material";
import { Suspense, lazy, useState } from "react";
import { ProductType } from "@core/types/product";
import SuspenseLoader from "../SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SingleProduct = Loader(lazy(() => import("@/views/Products/single")));

export const ProductDialog = ({
  children,
  data,
  review,
  Component,
}: {
  children: any;
  data: Partial<ProductType>;
  review?: boolean;
  Component?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((state) => !state);
  return (
    <>
      <Box onClick={toggleOpen}>{children}</Box>
      <Dialog
        sx={{ height: "100vh" }}
        PaperProps={{
          style: { minWidth: "70vw" },
        }}
        open={open}
        onClose={toggleOpen}
      >
        <SingleProduct
          productProp={data}
          closeBtn={toggleOpen}
          review={review}
        />
      </Dialog>
    </>
  );
};
