/* eslint-disable */
import {
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
// import { Stepper } from "./registerSteps/stepper";
import { useRegister } from "@core/contexts/RegisterContext";

export const FormForgotPassword = () => {
  const {
    AuthData,
    UpdateAuthData,
    confirmEmail,
    codigo,
    handleCreateCodigo,
    loadingCodigo,
    handleSubmitCodigo,
    refs,
    ChangePassword,
  } = useRegister();

  const [toUpdate, setToUpdate] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateValues = (e) => {
    const { name, value } = e.target;
    setToUpdate((state) => ({ ...state, [name]: value }));
  };

  return (
    <Grid
      container
      sx={{ pr: 2, pl: 2 }}
      style={{
        width: "100%",
        background: "rgba(230,230,230,0.1)",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <FormLabel style={{ paddingLeft: "1rem" }}>
        Vamos começar com algumas informações básicas
      </FormLabel>

      <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
        <TextField
          required
          fullWidth
          type="email"
          id="email"
          label="E-mail"
          style={{
            background: confirmEmail && "rgba(200,255,200,0.8)",
            fontFamily: "Inter",
          }}
          variant={confirmEmail ? "filled" : "outlined"}
          disabled={confirmEmail}
          defaultValue={AuthData.userInfo.email}
          name="email"
          onChange={(e) => {
            UpdateAuthData(e);
            updateValues(e);
          }}
          autoComplete="email"
        />
      </Grid>

      {!confirmEmail ? (
        AuthData.userInfo.email?.length !== 0 ? (
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!codigo ? (
              <Button
                onClick={() => handleCreateCodigo(true)}
                sx={{
                  width: "40%",
                  height: "55px",
                  mt: 2,
                  fontFamily: "Inter",
                }}
              >
                {loadingCodigo ? <CircularProgress /> : "Enviar Código"}
              </Button>
            ) : (
              <Grid
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  pt: 2,
                }}
              >
                <TextField
                  required
                  name="codigo"
                  label="Código de Confirmação"
                  type="text"
                  sx={{ width: "60%", fontFamily: "Inter" }}
                  inputRef={refs.codigoRef}
                />
                <Button
                  onClick={handleSubmitCodigo}
                  sx={{ width: "40%", height: "55px", fontFamily: "Inter" }}
                >
                  {loadingCodigo ? <CircularProgress /> : "Confirmar Código"}
                </Button>
              </Grid>
            )}
          </Grid>
        ) : (
          <></>
        )
      ) : (
        <Grid
          container
          sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            pt: 2,
          }}
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="password"
              label="Nova Senha"
              sx={{ fontFamily: "Inter" }}
              type="password"
              value={toUpdate.password}
              onChange={(e) => updateValues(e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirme sua senha"
              type="password"
              sx={{ fontFamily: "Inter" }}
              value={toUpdate.confirmPassword}
              onChange={(e) => updateValues(e)}
            />
          </Grid>
        </Grid>
      )}

      <Grid xs={10} sm={12}>
        <Button
          type="submit"
          fullWidth
          disabled={!confirmEmail}
          variant="contained"
          onClick={(e) => ChangePassword(e, toUpdate)}
          sx={{
            mt: 3,
            mb: 2,
            fontFamily: "Inter",
            background: "rgba(127,0,250,0.7)",
            "&:hover": { background: "rgba(127,0,250,0.6)" },
          }}
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
};
