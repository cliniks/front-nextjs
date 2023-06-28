import { imgs } from "@core/assets/imgs";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";

const SectionWeArePerfectFor = (props: BoxProps) => {
  return (
    <Grid container {...props} sx={{ minHeight: "100%" }}>
      <Grid item xs={12}>
        <h1>
          SOMOS <strong>PERFEITOS</strong> PARA:
        </h1>
      </Grid>
      <div className="boxDivider">
        <BoxDivider
          img={imgs.perfeitosPara.src}
          btnTxt="criar conta agora"
          txt="Donas(os) de clínicas de estéticas que buscam negociações competitivas com agilidade digital"
          side={0}
        />
        <div className="divider" />
        <BoxDivider
          img={imgs.associarAgora.src}
          btnTxt="associar agora"
          txt="Indústrias da fabricação do ramo da beleza que precisam potencializar seus resultados, sem aumentar o custo de aquisição, acessando
mercados ainda inatingíveis."
          side={1}
        />
        <div className="divider" />
        <BoxDivider
          btnTxt="quero saber mais"
          txt="Se você se enxerga nesse ecossistema, e quer construir relacionamentos incríveis, entre em contato conosco!"
        />
      </div>
    </Grid>
  );
};

type BoxProps = {
  className: string;
};

SectionWeArePerfectFor.defaultProps = {
  className: "home_box4",
};

const BoxDivider = ({
  img,
  txt,
  btnTxt,
  link,
  side,
}: {
  img?: string;
  txt: string;
  btnTxt?: string;
  link?: string;
  side?: number;
}) => {
  return (
    <Grid container className="boxDivider-Item">
      <Grid item xs={12} sm={4} md={4}>
        {side === 0 ? <img src={img} alt={img} /> : <></>}
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Typography variant="h1">{txt}</Typography>
        <Link href={link ? link : "/"}>{btnTxt}</Link>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        {side === 1 ? <img src={img} alt={img} /> : <></>}
      </Grid>
    </Grid>
  );
};

export { SectionWeArePerfectFor };
