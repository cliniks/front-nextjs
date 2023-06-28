import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSellerProducts } from "src/contexts/SellerProductsContext";
import { L } from "src/types/languageType";

export const CategoriesBox = () => {
  const {
    categories,
    verifyCategoryChecked,
    handleSelectLabel,
    handleClearCategories,
  } = useSellerProducts();

  const { t }: L = useTranslation();
  return (
    <Card
      sx={{
        m: 2,
      }}
    >
      <CardHeader
        action={
          <Button
            sx={{ height: "30px" }}
            onClick={() => handleClearCategories()}
            size="small"
            variant="outlined"
          >
            {t("Clear Categories")}
          </Button>
        }
        title={t("Categories")}
      />
      <Divider />
      <Box p={2}>
        {categories.map((category, index) => {
          return (
            <FormControlLabel
              key={category._id}
              control={
                <Checkbox
                  checked={verifyCategoryChecked(category)}
                  onClick={(e) => handleSelectLabel(category, index)}
                />
              }
              label={t(category.name)}
            />
          );
        })}
      </Box>
      {/* <CardHeader
        sx={{ height: "30px", margin: 0, padding: "0 1rem" }}
        action={
          <Button
            sx={{ height: "30px" }}
            onClick={() => handleClearCategories()}
            size="small"
            variant="outlined"
          >
            {t("Clear Categories")}
          </Button>
        }
        title={t("")}
      /> */}
    </Card>
  );
};
