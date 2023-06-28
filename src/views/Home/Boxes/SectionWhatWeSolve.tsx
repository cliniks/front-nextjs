import { Typography } from "@mui/material";
import { icons } from "@core/assets/imgs";

const SectionWhatWeSolve = (props: BoxProps) => {
  return (
    <section {...props}>
      <div className="caroucelPage">
        <Typography variant="h1"> O QUE RESOLVEMOS?</Typography>

        <Typography variant="h2">O QUE FAZEMOS</Typography>
        <div className="caroucel">
          <div className="caroucel-Item">
            <img src={icons.avatar2Ico.src} alt="icon" />

            <Typography variant="h1">
              desenvolvimento da cultura de dono, formando equipes auto
              gerenciáveis
            </Typography>
          </div>
          <div className="caroucel-Item">
            <img src={icons.avatarLivroIco.src} alt="icon" />

            <Typography variant="h1">
              transformamo seu negócio através de dados
            </Typography>
          </div>
          <div className="caroucel-Item">
            <img src={icons.avatarCabecaIco.src} alt="icon" />
            <Typography variant="h1">
              inteligência emocional para resultados consistentes
            </Typography>
          </div>
          <div className="caroucel-Item">
            <img src={icons.mapaIco.src} alt="icon" />

            <Typography variant="h1">
              eliminamos barreiras geográficas e conectamos com todas indústrias
              do país
            </Typography>
          </div>
          <div className="caroucel-Item">
            <img src={icons.dinheiroIco.src} alt="icon" />

            <Typography variant="h1">
              alfabetização empreendedora para escalar seu faturamento
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

type BoxProps = {
  className: string;
};

SectionWhatWeSolve.defaultProps = {
  className: "home_box5",
};

export { SectionWhatWeSolve };
