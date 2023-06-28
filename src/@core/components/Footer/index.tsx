import { Box, Button } from "@mui/material";
import { imgs } from "../../assets/imgs";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="home_footer">
      <Box className="bottomFooter">
        <img src={imgs.logo.src} alt="logo" />
        <h1>TODOS DIREITOS RESERVADOS - CLINIKS 2022</h1>
        <Box>
          <Link href="/">
            <Button>POLÍTICA DE PRIVACIDADE</Button>
          </Link>
          |
          <Link href="/">
            <Button>TERMOS DE SERVIÇO</Button>
          </Link>
        </Box>
      </Box>
    </section>
  );
};
export { Footer };
