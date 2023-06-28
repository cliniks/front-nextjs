import { Grid, Typography } from "@mui/material";
import { icons } from "@core/assets/imgs";
import { CrieSuaConta } from "@core/components/Buttons/CrieSuaConta";
import { Card1 } from "@core/components/Cards/card1";
import { SliderCards } from "./SliderCards";

const SectionWhyJoinCliniks = (props: BoxProps) => {
  const cards = [
    { icon: icons.industriaIco, text: "Acesso às indústrias de todo Brasil" },
    { icon: icons.avatarIco, text: "Atendimento Personalizado" },
    {
      icon: icons.sqheduleIco,
      text: "Treinamentos e materiais educatidos gratuitos",
    },
    { icon: icons.acordoIco, text: "Consultoria (Administrativa e Vendas)" },
    {
      icon: icons.comunicationIco,
      text: "Beneficie-se de uma rede de apoio igual de franquias",
    },
  ];

  return (
    <section {...props} style={{ minHeight: "550px" }}>
      <Typography variant="h1">
        PORQUE <strong>PARTICIPAR</strong> DO CLINIKS?
      </Typography>
      <SliderCards
        data={cards.map((item, key) => {
          return (
            <Grid sx={{ userSelect: "none" }}>
              <Card1 icon={item.icon.src} text={item.text} />
            </Grid>
          );
        })}
      />
      <CrieSuaConta />
    </section>
  );
};

type BoxProps = {
  className: string;
};

SectionWhyJoinCliniks.defaultProps = {
  className: "home_box2",
};

export { SectionWhyJoinCliniks };
