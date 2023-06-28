import { useMediaQuery } from "@mui/material";
import { BackSVG } from "@core/assets/imgs/BackSVG";

const BackgroundSVG = (props: BoxProps) => {
  const tablet = useMediaQuery(`(max-width:900px)`);
  return (
    <div {...props} style={tablet ? { marginTop: 0 } : {}}>
      <BackSVG />
    </div>
  );
};

type BoxProps = {
  className: string;
};

BackgroundSVG.defaultProps = {
  className: "home_box3",
};

export { BackgroundSVG };
