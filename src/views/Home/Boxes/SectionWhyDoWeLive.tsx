import { Typography } from "@mui/material";
import { imgs } from "@core/assets/imgs";

const SectionWhyDoWeLive = (props: BoxProps) => {
  return (
    <section {...props}>
      <div className="txtBox">
        <Typography variant="h2">
          PORQUE <em>NASCEMOS?</em>
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 2,
            color: "rgba(41, 41, 41,0.7)",
          }}
          variant="body2"
        >
          Nossos cartões de visita dizem que somos um marketplace, com preços
          competitivos, com grande diversidade de produtos, mas quando começam a
          nos conhecer, percebem que somos muito mais.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Através da mentalidade empreendedora, inconformista, estratégica e
          empática, sempre protagonizamos o cliente.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Céticos e crentes que o mercado estético no Brasil está condensado em
          poucos atores, e o potencial gigante de novos negócios são
          impiedosamente reprimidos pela falta de crédito, educação e acesso aos
          melhores insumos.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Também acreditamos que a tecnologia é um elemento vital para
          popularizar e prosperar os relacionamentos humanos desse mercado, e
          tudo precisa ser pontual e prazeroso, o que reforça nossos valores
          enquanto instituição.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Somos convictos que a educação é o principal instrumento de
          transformação e consolidação de resultados e performance em toda a
          cadeia produtiva, então, nesse quesito somos imparáveis.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Somos convictos que a educação é o principal instrumento de
          transformação e consolidação de resultados e performance em toda a
          cadeia produtiva, então, nesse quesito somos imparáveis.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          É assim que ajudamos empreendedoras da estética, indústrias e clientes
          final criarem esses comportamentos.
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        >
          Nosso compromisso é com a entrega real, sintonizada com as
          necessidades e obrigações dos clientes, tudo mais é mágica.
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            color: "rgba(41, 41, 41,0.7)",
          }}
        ></Typography>
        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 2,
            fontWeight: "bolder",
            color: "rgba(41, 41, 41,0.9)",
          }}
        >
          Assuma o controle do seu negócio
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            marginTop: 1,
            fontWeight: "bolder",
            color: "rgba(41, 41, 41,0.9)",
          }}
        >
          Prazer, sou o Gustavo Medeiros da Cliniks
        </Typography>
      </div>
      <div className="imgBox">
        <img src={imgs.gustavo.src} alt="guga" />
      </div>
    </section>
  );
};

type BoxProps = {
  className: string;
};

SectionWhyDoWeLive.defaultProps = {
  className: "home_box1",
};

export { SectionWhyDoWeLive };

{
  /* <section {...props}>
<div className="txtBox">
  <h2>
    PORQUE <em>NASCEMOS?</em>
  </h2>
  <p>
    Nossos cartões de visita dizem que somos um marketplace, com preços
    competitivos, com grande diversidade de produtos, mas quando começam a
    nos conhecer, percebem que somos muito mais.
  </p>
  <p>
    Através da mentalidade empreendedora, inconformista, estratégica e
    empática, sempre protagonizamos o cliente.
  </p>
  <p>
    Céticos e crentes que o mercado estético no Brasil está condensado em
    poucos atores, e o potencial gigante de novos negócios são
    impiedosamente reprimidos pela falta de crédito, educação e acesso aos
    melhores insumos.
  </p>
  <p>
    Também acreditamos que a tecnologia é um elemento vital para
    popularizar e prosperar os relacionamentos humanos desse mercado, e
    tudo precisa ser pontual e prazeroso, o que reforça nossos valores
    enquanto instituição.
  </p>
  <p>
    Somos convictos que a educação é o principal instrumento de
    transformação e consolidação de resultados e performance em toda a
    cadeia produtiva, então, nesse quesito somos imparáveis.
  </p>
  <p>
    Somos convictos que a educação é o principal instrumento de
    transformação e consolidação de resultados e performance em toda a
    cadeia produtiva, então, nesse quesito somos imparáveis.
  </p>
  <p>
    É assim que ajudamos empreendedoras da estética, indústrias e clientes
    final criarem esses comportamentos.
  </p>
  <p>
    Nosso compromisso é com a entrega real, sintonizada com as
    necessidades e obrigações dos clientes, tudo mais é mágica.
  </p>
  <h3>Assuma o controle do seu negócio.</h3>
  <h3>Prazer, sou o Gustavo Medeiros da Cliniks</h3>
</div>
<div className="imgBox">
  <img src={imgs.gustavo} alt="guga" />
</div>
</section> */
}
