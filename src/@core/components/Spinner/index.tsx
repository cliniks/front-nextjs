// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { imgs } from "@core/assets/imgs";

const Spinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Image
        style={{ width: "150px", height: "40px" }}
        src={imgs.logo}
        alt="logoCliniks"
      />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export { Spinner };
