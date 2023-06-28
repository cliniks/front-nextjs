import {
  Box,
  TableCell,
  Typography,
  styled,
  Tooltip,
  IconButton,
  Link,
} from "@mui/material";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import Text from "@core/components/Text";
import { DeleteTwoTone, Label, LaunchTwoTone } from "@mui/icons-material";
// import { BoxConfirm } from "../../Categories/create/BoxConfirm";
import { DataSourceType } from "@core/components/TableComponents/TableBody";
import { formatReal, pathCurrentOrNextNavigate } from "@core/utils/functions";
import { Product as ProductType } from "ecommersys/dist/Entities";
import RouterLink from "next/link";
import { ConfirmDialog } from "@core/components/Dialogs/ConfirmDialog";
import { BoxConfirm } from "@core/components/BoxConfirm";

export const productDataSource: DataSourceType[] = [
  {
    key: "name",
    visible: true,
    title: "Product Name",
    render: (product) => {
      return (
        <TableCell key={product._id + "name"}>
          <Box display="flex" alignItems="center">
            <ImgWrapper src={product.imgs[0]} alt="produtoImage" />
            <Box
              pl={1}
              sx={{
                width: 250,
              }}
            >
              <Link
                component={RouterLink}
                href={`${pathCurrentOrNextNavigate()}/products/${product._id}`}
                variant="h5"
              >
                {product.name}
              </Link>
              <Typography variant="subtitle2" noWrap>
                {/* {transformString(product.description)} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description.substring(0, 120),
                  }}
                />
              </Typography>
            </Box>
          </Box>
        </TableCell>
      );
    },
  },
  {
    key: "price",
    visible: true,
    title: "price",
    render: (product) => {
      return (
        <TableCell key={product._id + "price"}>
          <Typography
            sx={{
              textDecorationLine: +product.price !== 0 ? "line-through" : "",
            }}
          >
            {formatReal(product.regularPrice)}
          </Typography>
          {+product.price !== 0 && (
            <Typography>
              <Text color="error">{formatReal(product.price)}</Text>
            </Typography>
          )}
        </TableCell>
      );
    },
  },
  {
    key: "stock",
    visible: true,
    title: "stock",
    render: (product) => {
      return (
        <TableCell align="center" key={product._id + "stock"}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Label color="success" />
            <b>{product.stockInfo.qnt}</b>
          </Box>
        </TableCell>
      );
    },
  },
  {
    key: "rating",
    visible: true,
    title: "rating",
    render: (product) => {
      const qnt = product.statistics.likers?.length;
      return (
        <TableCell align="center" key={product._id + "rating"}>
          <Box display="flex" alignItems="center">
            <Text color="warning">
              <LocalFireDepartmentTwoToneIcon fontSize="small" />
            </Text>
            <Typography
              variant="h5"
              sx={{
                pl: 0.5,
              }}
            >
              {qnt > 0 ? qnt : "Não avaliado"}
            </Typography>
          </Box>
        </TableCell>
      );
    },
  },

  {
    key: "category",
    visible: true,
    title: "Category",
    render: (product) => {
      return (
        <TableCell key={product._id + "orders"}>
          {product.categories?.map((category) => {
            return <div key={category}>{category.split("/")[1]}</div>;
          })}
        </TableCell>
      );
    },
  },
  {
    key: "actions",
    visible: true,
    title: "Actions",
    render: (product, __, handleConfirmDelete: Function) => {
      return (
        <TableCell align="center" key={product._id + "actions"}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Tooltip title={"Visualizar"} arrow>
              <IconButton
                component={RouterLink}
                href={`${pathCurrentOrNextNavigate()}/products/${product._id}`}
                color="primary"
              >
                <LaunchTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
            <ConfirmDialog
              component={(handleClose) => {
                return (
                  <BoxConfirm
                    title="Product"
                    confirmDelete={() => handleConfirmDelete(product._id)}
                    handleClose={handleClose}
                  />
                );
              }}
            >
              <Tooltip title={"delete"} arrow>
                <IconButton color="primary">
                  <DeleteTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            </ConfirmDialog>
          </Box>
        </TableCell>
      );
    },
  },
];

const ImgWrapper = styled("img")(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: auto;
`
);

export const applyFilters = (
  products: ProductType[],
  query: string
): ProductType[] => {
  return products.filter((product) => {
    let matches = true;

    if (query) {
      const properties = ["name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (product[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });
};

export const applyPagination = (
  products: ProductType[],
  page: number,
  limit: number
): ProductType[] => {
  return products.slice(page * limit, page * limit + limit);
};
