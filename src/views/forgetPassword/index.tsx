// import { Copyright } from "@mui/icons-material";
import { CssBaseline, Box } from "@mui/material/";

import { imgs } from "@core/assets/imgs";
import { RegisterProvider } from "@core/contexts/RegisterContext";
import { FormForgotPassword } from "@core/components/Forms/FormForgotPassword";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <RegisterProvider>
      <CssBaseline />
      <Box
        sx={{
          // margin: "1em 0",
          minWidth: "400px",
          maxWidth: "700px",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            margin: "1rem",
            gap: "1.2em",
            width: "100%",
          }}
        >
          <Link
            href="/"
            style={{
              width: "85px",
              height: "85px",
              display: "flex",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 4px 5px 0 rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`${imgs.logoRedondo3.src}`}
              style={{ width: "200px", height: "200px" }}
              alt="logo"
            />
          </Link>
          <Box>
            <h1 style={{ fontWeight: "bold", fontSize: "1.4em" }}>
              Recupere a sua senha
            </h1>
            <p style={{ color: "#999", fontSize: "0.8em" }}>
              Preencha os campos abaixo.
            </p>
          </Box>
        </Box>

        <FormForgotPassword />
      </Box>
    </RegisterProvider>
  );
};

export default ForgotPassword;
