import { Box, Grid, Typography } from "@mui/material";
import { icons } from "@core/assets/imgs";

const SectionBenefits = (props: BoxProps) => {
  return (
    <Grid container {...props}>
      <Grid container className="CardBox7">
        <Grid item xs={12} md={4} className="cardsItem">
          <img src={icons.seguranca.src} alt="Ambiente Seguro" />
          <div className="cardsDescription">
            <Typography variant="h1" sx={{ color: "white" }}>
              AMBIENTE SEGURO
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Efetue suas compras com elevados padrões de conformidade e sistema
              anti-fraudes.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4} className="cardsItem">
          <img src={icons.avatarfone.src} alt="Atendimento" />
          <div className="cardsDescription">
            <Typography variant="h1" sx={{ color: "white" }}>
              ATENDIMENTO
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Sempre um profissional disponível das 08h00 às 22h00.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4} className="cardsItem">
          <img src={icons.entrega.src} alt="Entrega Garantida" />
          <div className="cardsDescription">
            <Typography variant="h1" sx={{ color: "white" }}>
              GARANTIA DE ENTREGA
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "white" }}>
              Sempre o melhor preço e menor caminho, com rapidez e
              rastreabilidade.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

type BoxProps = {
  className: string;
};

SectionBenefits.defaultProps = {
  className: "home_box7",
};

export { SectionBenefits };
