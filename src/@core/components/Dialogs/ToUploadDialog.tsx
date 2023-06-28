import { CheckTwoTone, CloudUploadTwoTone } from "@mui/icons-material";
import { Avatar, Box, Card, Grid, Typography, styled } from "@mui/material";
import { DocumentsType, possibleDocumentTypes } from "ecommersys/dist/Entities";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { sdk } from "@core/sdkProvider";
import { L } from "@core/types/languageType";

export const ToUpload = ({
  title = "Receituário",
  type = "receituario",
  doc,
  getDocuments,
}: {
  title?: string;
  type?: possibleDocumentTypes;
  doc?: DocumentsType;
  getDocuments?: Function;
}) => {
  const { t }: L = useTranslation();
  const [uploaded, setUploaded] = useState(false);
  const [link, setLink] = useState("");

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg"],
    },
    async onDrop(acceptedFiles, fileRejections, event) {
      const formData = new FormData();
      formData.append("img", acceptedFiles[0]);
      const uploadDoc = await sdk.Global.uploadDoc(formData, (res) => {
        return res;
      });
      sdk.User.documents.addDocument(
        {
          title: title,
          type: type,
          links: { front: uploadDoc, back: null },
        },
        (res) => {
          setUploaded(true);
          setLink(res.links.front);
          getDocuments && getDocuments();
        },
        () => {
          setUploaded(false);
        }
      );
    },
  });

  useEffect(() => {
    if (doc) setLink(doc?.links?.front);
  }, [doc]);

  return (
    <Grid xs={5} sx={{ maxWidth: "400px", minWidth: "300px", p: 1, px: 3 }}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          border: uploaded ? "green 1px solid" : "",
        }}
      >
        <Box sx={{ m: 1, pt: 1, pr: 1 }}>
          <Typography>{title}</Typography>
          {/* <Typography variant="h3">Shampo Dove 01</Typography> */}
        </Box>
        <Box p={2}>
          {!link ? (
            <BoxUploadWrapper {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragAccept && (
                <>
                  <AvatarSuccess variant="rounded">
                    <CheckTwoTone />
                  </AvatarSuccess>
                  <Typography
                    sx={{
                      mt: 2,
                    }}
                  >
                    {t("Drop the files to start uploading")}
                  </Typography>
                </>
              )}
              {isDragReject && (
                <>
                  <AvatarDanger variant="rounded">
                    <CloudUploadTwoTone />
                  </AvatarDanger>
                  <Typography
                    sx={{
                      mt: 2,
                    }}
                  >
                    {t("You cannot upload these file types")}
                  </Typography>
                </>
              )}
              {!isDragActive && (
                <>
                  <AvatarWrapper variant="rounded">
                    <CloudUploadTwoTone />
                  </AvatarWrapper>
                  <Typography
                    sx={{
                      mt: 2,
                    }}
                  >
                    {t("Drag & drop the file here")}
                  </Typography>
                </>
              )}
            </BoxUploadWrapper>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "150px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                src={link ? link : doc?.links?.front}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ m: 1, pt: 1, pr: 1 }}>
          <Typography sx={{ pt: 3 }}>Upload do arquivo de {title}.</Typography>
        </Box>
      </Card>
    </Grid>
  );
};

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};

    &:hover {
      background: ${theme.colors.alpha.white[50]};
      border-color: ${theme.colors.primary.main};
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: transparent;
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);
