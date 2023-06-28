import { Button } from "@mui/material";
import Link from "next/link";

const About = () => {
  return (
    <div className="home_box1">
      <div className="about_page">
        <h1>Quem Somos</h1>
        <p>
          Você vai conhecer o novo marketplace que vem para revolucionar o
          mercado da estética.
        </p>
        <p>
          Cliniks vai ser muito mais que um marketplace, vai ser um portal onde,
          além de encontrar produtos para sua clínica de forma acessível, você
          também vai receber conteúdos como esse e ter a chance de participar de
          uma mentoria guiada para expandir seus negócios no ramo da estética.
        </p>
        <p>
          Gestão comercial, gestão de equipe, vendas, marketing e comunicação
          são algumas áreas pode o Cliniks vai te ajudar.
        </p>
        <p>
          Se sua clínica não está atingindo os resultados desejados, com análise
          busca descobrir onde está o gap da operação. A intenção de ter um
          mentor é encurta o caminho, diminuir as dores e tropeços de
          empreender.
        </p>
        <p>
          É alguém que já tem as cicatrizes do campo de batalha pronto para te
          ajudar agora!
        </p>
        <Link href="/register">
          <Button>QUERO FAZER PARTE AGORA</Button>
        </Link>
      </div>
    </div>
  );
};
export default About;
