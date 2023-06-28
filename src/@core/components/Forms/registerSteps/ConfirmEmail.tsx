import { Box, FormLabel, Grid, TextField, useTheme } from "@mui/material";
import { useRegister } from "@core/contexts/RegisterContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ConfirmEmail = () => {
  const { AuthData, confirmEmail, refs } = useRegister();

  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {!confirmEmail ? (
        <Grid item xs={12} sm={12} p={2}>
          <FormLabel
            style={{
              paddingLeft: "1rem",
              paddingTop: "1em",
              fontFamily: "Inter",
            }}
          >
            Digite abaixo o codigo enviado para seu email e clique em "Proxima
            etapa".
          </FormLabel>

          {!confirmEmail && AuthData.userInfo.email?.length !== 0 ? (
            <Box sx={{ p: 2 }}>
              <TextField
                required
                name="codigo"
                label="Código de Confirmação"
                type="text"
                fullWidth
                sx={{ fontFamily: "Inter" }}
                inputRef={refs.codigoRef}
              />
            </Box>
          ) : null}
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} py={2}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Inter",
            }}
          >
            <CheckCircleIcon sx={{ mr: 1, color: theme.colors.success.dark }} />
            Codigo Confirmado com sucesso!
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
