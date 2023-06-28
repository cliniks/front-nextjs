import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import "react-quill/dist/quill.snow.css";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  TextField,
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useSellerProducts } from "@core/contexts/SellerProductsContext";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
const productTags = [
  { title: "new" },
  { title: "fresh" },
  { title: "2021" },
  { title: "electronics" },
];

function GeneralSection() {
  const { product, handleDeleteTag, addTag, tagInputRef, updateProductState } =
    useSellerProducts();
  const { t }: { t: any } = useTranslation();
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (product !== null) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(product.description)
          )
        )
      );
    }
  }, []);

  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            onChange={updateProductState}
            value={product.name}
            placeholder={t(
              "Write the name of the product that will be displayed..."
            )}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              overflow: "hidden",
              height: "400px",
              border: "solid 1px black",
              borderRadius: 1.5,
            }}
          >
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                ],
                fontFamily: {
                  options: [""],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                },
              }}
              onEditorStateChange={(newState) => {
                setEditorState(newState);

                updateProductState({
                  target: {
                    name: "description",
                    value: draftToHtml(
                      convertToRaw(newState.getCurrentContent())
                    ),
                  },
                });
              }}
              mention={{
                separator: " ",
                trigger: "@",
                suggestions: [
                  { text: "APPLE", value: "apple" },
                  { text: "BANANA", value: "banana", url: "banana" },
                  { text: "CHERRY", value: "cherry", url: "cherry" },
                  { text: "DURIAN", value: "durian", url: "durian" },
                  { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                  { text: "FIG", value: "fig", url: "fig" },
                  {
                    text: "GRAPEFRUIT",
                    value: "grapefruit",
                    url: "grapefruit",
                  },
                  { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
                ],
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Tooltip
            arrow
            placement="top"
            title={t(
              "Write tags that identify your product. They will not be presented to the client, but will be used to improve the category indexing experience and the assertiveness of the search engines. write single words and click the + button"
            )}
          >
            <IconButton size="small" color="primary">
              <HelpOutlineTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box style={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={tagInputRef}
              variant="outlined"
              placeholder={t("Write here and confirm to add a tag...")}
            />
            <span
              style={{
                width: "35px",
                height: "35px",
                position: "absolute",
                right: "1rem",
                top: "20%",
                border: "4px solid #eee",
                display: "grid",
                placeItems: "center",
                padding: "1px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <Add onClick={addTag} />
            </span>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            maxHeight: "30px",
            margin: 0,
            width: "100%",
            paddingTop: "1rem",
            paddingBottom: 0,
          }}
        >
          {product.tags.map((data, index) => {
            if (data) {
              return (
                <Chip
                  sx={{
                    mr: 1,
                  }}
                  key={data + index}
                  variant="outlined"
                  label={data}
                  onDelete={handleDeleteTag(data)}
                />
              );
            }
          })}
          {productTags?.length === 0 && (
            <Typography
              sx={{
                py: 2,
              }}
              variant="subtitle2"
              textAlign="center"
            >
              {t("There are no product tags")}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default GeneralSection;
