import { FC } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import BulkActions from "./BulkActions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { L } from "@core/types/languageType";

import { TableBodyMap } from "@core/components/TableComponents/TableBody";
import { TableHeaderItems } from "@core/components/TableComponents/TableHeader";
import { productDataSource } from "./configs/tableConfig";
import { useSellerProducts } from "@core/contexts/SellerProductsContext";

const Results: FC = () => {
  const { t }: L = useTranslation();
  const theme = useTheme();

  const {
    products,
    query,
    selectedItems,
    handlePageChange,
    handleQueryChange,
    handleLimitChange,
    handleSearchByQuery,
    handleSelectAllProducts,
    HandleDeleteCompleted,
    totalItems,
  } = useSellerProducts();

  const selectedBulkActions = selectedItems?.length > 0;
  const selectedSomeProducts =
    selectedItems?.length > 0 && selectedItems?.length < products?.length;
  const selectedAllProducts = selectedItems?.length === products?.length;
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
                component="form"
                onSubmit={handleSearchByQuery}
                sx={{
                  mb: { xs: 2, md: 0 },
                }}
              >
                <TextField
                  size="small"
                  fullWidth={mobile}
                  onChange={handleQueryChange}
                  value={query.filter.value}
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
                count={totalItems}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={query.page}
                rowsPerPage={+query.size}
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
            </Box>
          )}
        </Box>
        <Divider />

        {products?.length === 0 ? (
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t(
              "There is no product created to present. Register your first product using the button above - Register Product"
            )}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllProducts}
                        indeterminate={selectedSomeProducts}
                        onChange={handleSelectAllProducts}
                      />
                    </TableCell>
                    <TableHeaderItems dataSource={productDataSource} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableBodyMap
                    dataSource={productDataSource}
                    listItems={products}
                    handleConfirmDelete={HandleDeleteCompleted}
                    selectedItems={selectedItems}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={totalItems}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={query.page}
                rowsPerPage={+query.size}
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
