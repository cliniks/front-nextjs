import {
  TextField,
  Autocomplete,
  Box,
  Card,
  Grid,
  styled,
  Typography,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorWrapper = styled(Box)(
  ({ theme }) => `
  
      .ql-editor {
        min-height: 100px;
      }
  
      .ql-snow .ql-picker {
        color: ${theme.colors.alpha.black[100]};
      }
  
      .ql-snow .ql-stroke {
        stroke: ${theme.colors.alpha.black[100]};
      }
  
      .ql-toolbar.ql-snow {
        border-top-left-radius: ${theme.general.borderRadius};
        border-top-right-radius: ${theme.general.borderRadius};
      }
  
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[30]};
      }
  
      .ql-container.ql-snow {
        border-bottom-left-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
      }
  
      &:hover {
        .ql-toolbar.ql-snow,
        .ql-container.ql-snow {
          border-color: ${theme.colors.alpha.black[50]};
        }
      }
  `
);

const productTags = [
  { title: "new" },
  { title: "fresh" },
  { title: "2021" },
  { title: "electronics" },
];

function GeneralSection() {
  const { t }: { t: any } = useTranslation();

  return (
    <Card>
      <Grid sx={{ background: "#F0F0F0", p: 0 }}>
        <Typography variant="h4" sx={{ pt: 2, pl: 2, pb: 2 }}>
          {t("Politics")}
        </Typography>
      </Grid>
      <Grid container spacing={3} sx={{ p: 4 }}>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ pl: 1, fontWeight: 600 }}>
            {t("Shipping policy")}
          </Typography>
          <EditorWrapper>
            <ReactQuill />
          </EditorWrapper>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ pl: 1, fontWeight: 600 }}>
            {t("Refund Policy")}
          </Typography>
          <EditorWrapper>
            <ReactQuill />
          </EditorWrapper>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ pl: 1, fontWeight: 600 }}>
            {t("Cancellation / Return / Exchange Policy")}
          </Typography>
          <EditorWrapper>
            <ReactQuill />
          </EditorWrapper>
        </Grid>
      </Grid>

      <Button sx={{ mt: 2, ml: 4, mb: 4 }} variant="contained">
        Salvar
      </Button>
    </Card>
  );
}

export default GeneralSection;
