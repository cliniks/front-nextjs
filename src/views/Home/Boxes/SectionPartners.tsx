import { Box, Typography } from "@mui/material";
import { icons } from "@core/assets/imgs";
import { CrieSuaConta } from "@core/components/Buttons/CrieSuaConta";

const SectionPartners = (props: BoxProps) => {
  return (
    <section {...props}>
      <Box className="topBox">
        <Typography variant="h1">
          {" "}
          DEPOIMENTOS <b>PARCEIROS</b>
        </Typography>
        <Box className="sliderBoxes">
          <Box className="sliderBox">
            <Box className="sliderItem">
              <img src={icons.avatarCircle.src} alt="avatar" />
              <div>
                <Typography variant="h2">
                  Consigo oferecer tratamentos de nível de qualidade máxima com
                  custos competitivos, através de fornecedores que não tinha
                  acesso. O Clinicks evitou todas as burocracias. Sinto-me
                  fazendo parte da minha franqueadora
                </Typography>
                <Typography variant="h1"> Analu Sophia Gomes</Typography>
              </div>
            </Box>
          </Box>
          <Box className="sliderDots">
            <span />
          </Box>
        </Box>
      </Box>
      <Box className="bottomBox">
        <Typography variant="h1">
          NOSSOS <b>PARCEIROS</b>
        </Typography>
        <Box className="partners"></Box>
        <CrieSuaConta />
      </Box>
    </section>
  );
};

type BoxProps = {
  className: string;
};

SectionPartners.defaultProps = {
  className: "home_box8",
};

export { SectionPartners };
