import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material/";
import ForgotPasswordDialog from "@core/components/Dialogs/ForgotPasswordDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import RegisterDialog from "@core/components/Dialogs/RegisterDialog";
import { Copyright } from "@core/utils/Copyright";
import { imgs } from "@core/assets/imgs";
import { useUser } from "@core/contexts/UserContext";
import { getUserToken } from "@core/utils/token";
import { useRouter } from "next/router";

const theme = createTheme();

const LoginPage = () => {
  const [registering, setRegistering] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registering) return null;
    const data = new FormData(event.currentTarget);
    // const remember = data.get("remember");
    const AuthData = {
      username: data.get("email"),
      password: data.get("password"),
    };
    const loading = toast.loading("Autenticando...");
    if (!AuthData.username || !AuthData.password)
      return toast.update(loading, {
        render: "Precisa preencher todos os dados...",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    await login({ ...AuthData, loading });
  };

  if (getUserToken()) {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  return (
    <ThemeProvider theme={theme}>
      <main
        // component="main"
        style={{ display: "flex", height: "100vh", width: "100vw" }}
      >
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            padding: 8,
            display: "flex",
            width: "40%",
            flexDirection: "column",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxHeight: "220px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "250px" }}
              src={imgs.logoRedondo2.src}
              alt="logoRedondo"
            />
          </Box>
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: "1.3em",
              color: "rgba(20,20,60,0.4)",
            }}
          >
            Cliniks é um marketplace que conecta as empresas empreendedoras do
            mercado estético com a moderna indústria de insumos.
          </Typography>
          <div style={{ gap: "1rem" }}>
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                fontSize: "1.4em",
                color: "rgba(20,20,60,0.7)",
              }}
            >
              No Cliniks você vai :
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                color: "rgba(20,20,60,0.4)",
              }}
            >
              - Pesquisar, consultar e adquirir tudo que você precisa para
              promover os melhores tratamentos estéticos, de beleza e saúde.
              Desde a agulha, enzimas até equipamentos, em ambiente digital com
              acesso privilegiado e seguro.
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                color: "rgba(20,20,60,0.4)",
              }}
            >
              - Acessar os profissionais da indústria garantindo toda eficácia,
              entendimento e procedência.
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                color: "rgba(20,20,60,0.4)",
              }}
            >
              - Praticar e estudar a educação empreendedora. Dicas, materiais
              ricos, estudos do setor e até treinamentos para evoluir seu
              negócio para o nível mais alto. (negócios, organização,
              desenvolvimento equipe, desenvolvimento pessoal, mídias sociais).
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            // marginTop: 8,
            padding: 8,
            gap: 8,
            display: "flex",
            width: "60%",
            background: "rgba(50,50,200,0.03)",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Avatar
              sx={{
                m: 1,
                bgcolor: "transparent",
                width: "250px",
                height: "200px",
              }}
            >
              <img
                style={{ width: "250px" }}
                src={imgs.logoDegrade.src}
                alt="logoRedondo"
              />
            </Avatar>
          </Link>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", color: "rgba(0,0,100,0.9)" }}
            >
              Acessar Plataforma
            </Typography>
            <Typography
              component="p"
              sx={{ color: "rgba(0,0,40,0.4)", fontWeight: "bold" }}
            >
              Preencha os campos abaixo para acessar sua conta
            </Typography>
          </Box>

          <RegisterDialog callback={setRegistering} />

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  defaultChecked={true}
                  name="remember"
                  color="primary"
                />
              }
              label="Lembrar de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container sx={{ display: "flex", justifyContent: "right" }}>
              <Grid item>
                <ForgotPasswordDialog callback={setRegistering} />
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </main>
    </ThemeProvider>
  );
};

LoginPage.getLayout = (page: ReactNode) => <>{page}</>;

export default LoginPage;
