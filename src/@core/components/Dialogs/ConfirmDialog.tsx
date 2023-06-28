import { Box, Dialog } from "@mui/material";
import { useState } from "react";

export const ConfirmDialog = ({
  children,
  component,
  callback,
  style,
  validate,
}: {
  children: any;
  component: (toggleOpen: Function) => any;
  callback?: Function;
  style?: React.CSSProperties;
  validate?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    if (validate === undefined || validate === true) {
      if (typeof callback === "function") {
        if (open) callback();
      }
      setOpen((state) => !state);
    }
  };

  return (
    <Box style={style}>
      <Box onClick={toggleOpen}>{children}</Box>
      <Dialog
        sx={{ height: "100vh" }}
        PaperProps={{
          style: {
            minWidth: "40vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        open={open}
        onClose={toggleOpen}
      >
        {component(toggleOpen)}
      </Dialog>
    </Box>
  );
};
