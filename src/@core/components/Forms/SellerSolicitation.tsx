import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import {
  TextField,
  Card,
  Grid,
  Typography,
  Button,
  Tooltip,
  Box,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useSolicitation } from "@core/contexts/SolicitationsContext";
import { ToUpload } from "@core/components/Dialogs/ToUploadDialog";
import { useUserDocuments } from "@core/contexts/UserDocumentsContext";
import { DocumentsType } from "ecommersys/dist/Entities";
import { toast } from "react-toastify";
import { useState } from "react";
import { IMaskInput } from "react-imask";

export const SellerSolicitationForm = () => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const {
    singleSolicitation,
    updateSingleSolicitation,
    updateSingleSolicitationCpf,
    handleSolicitation,
    GetCNPJ,
    getCpf,
  } = useSolicitation();

  const { documents, getDocuments } = useUserDocuments();
  const [typeUser, setTypeUser] = useState("juridica");

  const haveAllDocsJuri =
    documents.filter((item) => {
      if (
        item.type === "alvara" ||
        item.type === "cnpj" ||
        item.type === "contratoSocial"
      )
        return true;
    })?.length === 3;

  const haveAllDocsFisi =
    documents.filter((item) => item.type === "identidadePessoal")?.length === 1;

  const filterDoc = (type: string): DocumentsType =>
    documents.filter((item) => item.type === type)[0];

  const userType = (e) => {
    if (e === "fisica") {
      getCpf();
    }

    setTypeUser(e);
  };

  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <Grid display="flex" justifyContent="space-between">
        <Typography variant="h3" p={2}>
          Quero Minha Loja no Cliniks
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.name}
            placeholder={t("Declare o nome da sua empresa...")}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t("Person")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="juridica"
              value={typeUser}
              label={t("Person")}
              name="personType"
              onChange={(e) => userType(e.target.value)}
            >
              <MenuItem value="fisica">Pessoa fisica</MenuItem>
              <MenuItem value="juridica">Pessoca Juridica</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {typeUser === "juridica" ? (
          <Grid item xs={12} sm={5}>
            <div className="likeMuiIMask register">
              <IMaskInput
                placeholder="CNPJ *"
                mask="00.000.000/0000-00"
                value={singleSolicitation.storeInfo.cnpj}
                onComplete={(value) => GetCNPJ(value as string)}
                overwrite
              />
            </div>
            {/* <TextField
              fullWidth
              required
              id="outlined-basic"
              variant="outlined"
              value={singleSolicitation.storeInfo.cnpj}
            /> */}
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm={3}>
              <div className="likeMuiIMask register">
                <IMaskInput
                  placeholder="Cpf *"
                  mask="000.000.000.00"
                  value={singleSolicitation.storeInfo.cpf}
                  onComplete={(e) =>
                    updateSingleSolicitationCpf({
                      target: { value: e, name: "cpf" },
                    })
                  }
                  overwrite
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div className="likeMuiIMask register">
                <IMaskInput
                  placeholder="Data de Aniversário *"
                  mask="00/00/0000"
                  value={singleSolicitation.storeInfo.birthDate}
                  onComplete={(e) =>
                    updateSingleSolicitationCpf({
                      target: { value: e, name: "birthDate" },
                    })
                  }
                  overwrite
                />
              </div>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={4}>
          <div className="likeMuiIMask register">
            <IMaskInput
              mask="00000-000"
              placeholderChar="CEP *"
              value={singleSolicitation.storeInfo.zipCode}
              onComplete={(e) =>
                updateSingleSolicitation({
                  target: { value: e, name: "zipCode" },
                })
              }
              overwrite
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={4}>
          <TextField
            fullWidth
            name="address"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.storeInfo.address}
            label="Endereço"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2} md={4}>
          <TextField
            fullWidth
            name="number"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.storeInfo.number}
            label="Número"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="district"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.storeInfo.district}
            label="Bairro"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="complement"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.storeInfo.complement}
            label="Complemento"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="state"
            onChange={updateSingleSolicitation}
            // onChange={updateProductState}
            value={singleSolicitation.storeInfo.state}
            label="Estado"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="district"
            onChange={updateSingleSolicitation}
            // onChange={updateProductState}
            value={singleSolicitation.storeInfo.district}
            label="Bairro"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="city"
            onChange={updateSingleSolicitation}
            // onChange={updateProductState}
            value={singleSolicitation.storeInfo.city}
            label="Cidade"
            variant="outlined"
          />
        </Grid>

        {typeUser === "juridica" ? (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="cnae"
              onChange={updateSingleSolicitation}
              // onChange={updateProductState}
              value={singleSolicitation.storeInfo.cnae}
              label="CNAE"
              variant="outlined"
            />
          </Grid>
        ) : null}

        {typeUser === "juridica" ? (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="enterpriseSocial"
              onChange={updateSingleSolicitation}
              value={singleSolicitation.storeInfo.enterpriseSocial}
              label="Nome Social"
              variant="outlined"
            />
          </Grid>
        ) : null}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="phone"
            onChange={updateSingleSolicitation}
            value={singleSolicitation.storeInfo.phone}
            label="Telefone / Whatsapp"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid xs={12} pt={2} display="flex" flexWrap="wrap">
        {typeUser === "juridica" ? (
          <Grid flex={1}>
            <ToUpload
              title="Alvará"
              doc={filterDoc("alvara")}
              type="alvara"
              getDocuments={getDocuments}
            />
          </Grid>
        ) : null}

        {typeUser === "juridica" ? (
          <Grid flex={1}>
            <ToUpload
              title="CNPJ"
              type="cnpj"
              doc={filterDoc("cnpj")}
              getDocuments={getDocuments}
            />
          </Grid>
        ) : null}

        {typeUser === "fisica" ? (
          <Grid flex={1}>
            <ToUpload
              title="Identidade Pessoal"
              type="identidadePessoal"
              doc={filterDoc("identidadePessoal")}
              getDocuments={getDocuments}
            />
          </Grid>
        ) : null}

        {typeUser === "juridica" ? (
          <Grid flex={1}>
            <ToUpload
              title="Contrato Social"
              type="contratoSocial"
              doc={filterDoc("contratoSocial")}
              getDocuments={getDocuments}
            />
          </Grid>
        ) : null}
      </Grid>

      {typeUser === "fisica" ? (
        <Grid
          xs={12}
          pt={7}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            disableHoverListener={singleSolicitation.name && haveAllDocsFisi}
            title="Adicione um nome e insira todos os documentos necessários para continuar"
          >
            <Box
              sx={{
                width: "400px",
                maxHeight: "50px",

                p: 0,
              }}
            >
              <Button
                sx={{
                  height: "50px",
                  padding: 0,
                  margin: 0,
                  background:
                    !singleSolicitation.name || !haveAllDocsFisi
                      ? "#eee"
                      : theme.colors.primary.main,
                  color: "white",
                  width: "400px",
                }}
                disabled={!singleSolicitation.name || !haveAllDocsFisi}
                onClick={() => {
                  if (singleSolicitation.name || haveAllDocsFisi)
                    if (
                      singleSolicitation.storeInfo.cnpj &&
                      singleSolicitation.storeInfo.cpf
                    ) {
                      toast(
                        "Preencha apenas com CNPJ ou CPF. Não e possivel criar com os dados"
                      );
                    } else {
                      handleSolicitation();
                    }
                  else
                    toast(
                      "Preencha um nome para sua loja e submeta todos os documentos necessários"
                    );
                }}
              >
                Enviar Informações
              </Button>
            </Box>
          </Tooltip>
        </Grid>
      ) : (
        <Grid
          xs={12}
          pt={7}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            disableHoverListener={singleSolicitation.name && haveAllDocsJuri}
            title="Adicione um nome e insira todos os documentos necessários para continuar"
          >
            <Box
              sx={{
                width: "400px",
                maxHeight: "50px",

                p: 0,
              }}
            >
              <Button
                sx={{
                  height: "50px",
                  padding: 0,
                  margin: 0,
                  background:
                    !singleSolicitation.name || !haveAllDocsJuri
                      ? "#eee"
                      : theme.colors.primary.main,
                  color: "white",
                  width: "400px",
                }}
                disabled={!singleSolicitation.name || !haveAllDocsJuri}
                onClick={() => {
                  if (singleSolicitation.name || haveAllDocsJuri)
                    if (
                      singleSolicitation.storeInfo.cnpj &&
                      singleSolicitation.storeInfo.cpf
                    ) {
                      toast(
                        "Preencha apenas com CNPJ ou CPF. Não e possivel criar com os dados"
                      );
                    } else {
                      handleSolicitation();
                    }
                  else
                    toast(
                      "Preencha um nome para sua loja e submeta todos os documentos necessários"
                    );
                }}
              >
                Enviar Informações
              </Button>
            </Box>
          </Tooltip>
        </Grid>
      )}
    </Card>
  );
};
