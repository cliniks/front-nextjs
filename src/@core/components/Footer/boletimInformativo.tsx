import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";

const BoletimInformativo = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
    };
    try {
      toast(
        `Muito obrigado por assinar nosso boletim, enviaremos para o email ${body.email}`,
        { type: "success", autoClose: 1200 }
      );
      // setTimeout(() => {
      //   window.location.pathname = "/sou_adm_desse_cacete";
      // }, 1000);
    } catch (err) {
      toast("Não foi possível efetuar o login", { type: "error" });
    }
  };
  return (
    <div className="home_box9">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          className="inputBox"
          name="email"
          type="email"
          id="email"
          placeholder="Assine nosso boletim informativo e fique sabendo de tudo primeiro"
        />
        <Button type="submit">OK</Button>
      </Box>
    </div>
  );
};

export { BoletimInformativo };
