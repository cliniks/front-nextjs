import { FC, useState, ChangeEvent } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";

import type { ProductType } from "@core/types/product";
import { useTranslation } from "react-i18next";
import BulkActions from "./BulkActions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { L } from "@core/types/languageType";

const ImgWrapper = styled("img")(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: auto;
`
);

interface ResultsProps {
  products: ProductType[];
}

const applyFilters = (
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

const applyPagination = (
  products: ProductType[],
  page: number,
  limit: number
): ProductType[] => {
  return products.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ products }) => {
  console.log(products);
  const [selectedItems, setSelectedProducts] = useState<string[]>([]);
  const { t }: L = useTranslation();

  const theme = useTheme();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProducts = applyFilters(products, query);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const selectedBulkActions = selectedItems?.length > 0;

  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Card>
        <Box display="flex" alignItems="center">
          {selectedBulkActions && (
            <Box flex={1} p={2}>
              <BulkActions />
            </Box>
          )}
          {!selectedBulkActions && (
            <Box
              flex={1}
              p={2}
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  mb: { xs: 2, md: 0 },
                }}
              >
                <TextField
                  size="small"
                  fullWidth={mobile}
                  onChange={handleQueryChange}
                  value={query}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={t("Search by product...")}
                />
              </Box>
              <TablePagination
                component="div"
                count={filteredProducts?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
                labelDisplayedRows={(page) =>
                  `${page.from}-${page.to === -1 ? page.count : page.to}  ` +
                  t("of") +
                  ` ${page.count}`
                }
              />
            </Box>
          )}
        </Box>
        <Divider />

        {paginatedProducts?.length === 0 ? (
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
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableBody>
                  {paginatedProducts.map((product) => {
                    const isProductSelected = selectedItems.includes(
                      product._id
                    );
                    return (
                      <TableRow
                        hover
                        key={product._id}
                        selected={isProductSelected}
                      >
                        <TableCell sx={{ width: 300 }}>
                          <ImgWrapper
                            src={product.imgs[0]}
                            alt="produtoImage"
                          />
                        </TableCell>

                        <TableCell>
                          <Box pl={1} sx={{ width: 200 }}>
                            <Typography variant="subtitle2" noWrap>
                              Botox caixa com 04 itens
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: 10, pt: 1 }}
                              noWrap
                            >
                              R$566
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontSize: 10, pt: 1 }}
                                noWrap
                              >
                                R$ 89,90
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontSize: 10, ml: 3, pt: 1 }}
                                noWrap
                              >
                                50% OFF
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mt: 2 }}
                            >
                              {t("Excluir")}
                            </Button>
                          </Box>
                        </TableCell>

                        <TableCell></TableCell>

                        <TableCell>
                          <Box pl={1} sx={{ width: 200 }}>
                            <Typography>Por loja XYZ</Typography>
                            <Typography variant="subtitle2" noWrap>
                              Enviar mensagem
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            noWrap
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              maxWidth: 200,
                            }}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              sx={{
                                mx: 1,
                              }}
                            >
                              {t("Comprar Produto")}
                            </Button>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredProducts?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
                labelDisplayedRows={(page) =>
                  `${page.from}-${page.to === -1 ? page.count : page.to}  ` +
                  t("of") +
                  ` ${page.count}`
                }
              />
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

Results.propTypes = {
  products: PropTypes.array.isRequired,
};

Results.defaultProps = {
  products: [],
};

export default Results;
