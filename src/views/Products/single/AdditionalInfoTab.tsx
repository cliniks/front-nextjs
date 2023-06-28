import { Typography, Card } from "@mui/material";
import { Product } from "ecommersys/dist/Entities";
import { useTranslation } from "react-i18next";

function AdditionalInfoTab({ product }: { product: Product }) {
  const { t }: { t: any } = useTranslation();

  return (
    <Card
      sx={{
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {t("Description")}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </Card>
  );
}

export default AdditionalInfoTab;
