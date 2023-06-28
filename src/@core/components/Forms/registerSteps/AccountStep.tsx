import {
  Box,
  CircularProgress,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useRegister } from "@core/contexts/RegisterContext";
import PhoneInput from "react-phone-input-2";

export const AccountStep = () => {
  const { AuthData, UpdateAuthData, confirmEmail } = useRegister();

  return (
    <Grid container spacing={2}>
      <FormLabel style={{ paddingLeft: "1rem" }} sx={{ fontFamily: "Inter" }}>
        Vamos começar com algumas informações básicas
      </FormLabel>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          id="name"
          defaultValue={AuthData.userInfo.name}
          label="Nome"
          onChange={(e) => UpdateAuthData(e)}
          autoFocus
          sx={{ fontFamily: "Inter" }}
        >
          <CircularProgress />
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          sx={{ fontFamily: "Inter" }}
          required
          fullWidth
          id="lastName"
          label="Sobrenome"
          name="lastName"
          defaultValue={AuthData.userInfo.lastName}
          onChange={(e) => UpdateAuthData(e)}
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <PhoneInput
            specialLabel={""}
            country={"br"}
            value={AuthData.userInfo.phone}
            onChange={(e) =>
              UpdateAuthData({
                target: { value: e, name: "phone" },
              })
            }
          />
        </Box>

        {/* <TextField
          required
          fullWidth
          id="lastName"
          label="Número Telefone / Whatsapp"
          name="lastName"
          defaultValue={AuthData.userInfo.lastName}
          onChange={(e) => UpdateAuthData(e)}
          autoComplete="family-name"
        /> */}
      </Grid>
      <Grid item xs={12} sm={6}>
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
          onChange={(e) => UpdateAuthData(e)}
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="password"
          label="Senha"
          sx={{ fontFamily: "Inter" }}
          type="password"
          defaultValue={AuthData.password}
          onChange={(e) => UpdateAuthData(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirme sua senha"
          sx={{ fontFamily: "Inter" }}
          type="password"
          defaultValue={AuthData.confirmPassword}
          onChange={(e) => UpdateAuthData(e)}
        />
      </Grid>

      {/* <Grid item xs={12} sm={12}>
        <p style={{ opacity: 0.7, fontSize: "0.8em" }}>Imagem de Perfil</p>
        {imgPreview ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              style={{ width: "60px", borderRadius: "50%" }}
              src={imgPreview.preview}
              alt="userImg"
            />
            <h1>{imgPreview.name}</h1>
            <Delete
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => setImgPreview(null)}
            />
          </div>
        ) : (
          <DropContainer {...getRootProps()} key="imgUser">
            <input {...getInputProps()} />
            {renderDragMessage()}
          </DropContainer>
        )}
      </Grid> */}
    </Grid>
  );
};
