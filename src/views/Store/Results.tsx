import { FC, useState, ChangeEvent, SetStateAction } from "react";
import type { ProductType } from "@core/types/product";
import PropTypes from "prop-types";

import {
  Grid,
  Typography,
  Card,
  Box,
  TextField,
  InputAdornment,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { searchType } from ".";
import { CardProduct } from "@core/components/Cards/ProductCard";
import { getAllProps } from "ecommersys/dist/interfaces";

interface ResultsProps {
  products: ProductType[];
  searchParams: searchType;
  loading: boolean;
  setLoading: Function;
  setProducts: React.Dispatch<SetStateAction<ProductType[]>>;
}

const applyPagination = (
  products: ProductType[],
  page: number,
  limit: number
): ProductType[] => {
  return products.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ products, loading }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { t }: { t: any } = useTranslation();
  const [query, setQuery] = useState<getAllProps>({
    page: 0,
    size: 200,
    filter: {
      key: "",
      value: "",
      fields: "",
    },
  });
  const [toggleView, setToggleView] = useState<string | null>("list_view");

  const filteredProducts = products;
  const paginatedProducts = applyPagination(filteredProducts, page, limit);

  const handleSearchByQuery = (e) => {
    e.preventDefault();
    // getProducts();
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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    setQuery((query) => ({ ...query, page: newPage }));
    // getProducts({ ...query, page: newPage });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setLimit(+value);
    // setQuery((query) => ({ ...query, size: parseInt(value) }));
    // getProducts({ ...query, size: parseInt(value) });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box onChange={handleSearchByQuery}>
          <TextField
            fullWidth
            onChange={handleQueryChange}
            value={query.filter.value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            placeholder={t("Search by product name...")}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography component="span" variant="subtitle1">
              {t("Showing")}:
            </Typography>{" "}
            <b>
              {filteredProducts?.length} {t("products")}
            </b>
          </Box>
        </Box>
      </Grid>
      <Grid container style={{ width: "100%", position: "relative" }}>
        {loading && (
          <Box
            sx={{
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.7,
              background: "white",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {paginatedProducts?.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              sx={{
                py: 10,
              }}
              variant="h3"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              {t("We couldn't find any products matching your search criteria")}
            </Typography>
          </Grid>
        ) : (
          <>
            {paginatedProducts.map((product) => {
              return <CardProduct product={product} key={product._id} />;
            })}
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 2,
                }}
              >
                <TablePagination
                  component="div"
                  count={filteredProducts?.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[10, 20, 30]}
                  labelRowsPerPage={t("Rows per page")}
                  labelDisplayedRows={(page) =>
                    `${page.to} ` +
                    t("products") +
                    " " +
                    t("of") +
                    ` ${page.count}`
                  }
                />
              </Card>
            </Grid>
          </>
        )}
      </Grid>
      {!toggleView && (
        <Grid item xs={12}>
          <Card
            sx={{
              textAlign: "center",
              p: 3,
            }}
          >
            <Typography
              align="center"
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              sx={{
                my: 5,
              }}
              gutterBottom
            >
              {t(
                "Choose between table or grid views for displaying the projects list."
              )}
            </Typography>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

Results.propTypes = {
  products: PropTypes.array.isRequired,
};

Results.defaultProps = {
  products: [],
};

export default Results;
