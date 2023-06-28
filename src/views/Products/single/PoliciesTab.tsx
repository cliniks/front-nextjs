import { Typography, Card, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function PoliciesTab({ policies }: { policies: any }) {
  const { t }: { t: any } = useTranslation();

  return (
    <Card
      sx={{
        p: 4,
      }}
    >
      {policies.map((policy) => (
        <Box sx={{ marginBottom: "25px" }}>
          <Typography variant="h4" gutterBottom>
            {t(policy.name).toUpperCase()}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: policy.body }} />
        </Box>
      ))}
    </Card>
  );
}

export default PoliciesTab;
