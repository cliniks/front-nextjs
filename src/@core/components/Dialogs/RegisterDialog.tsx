import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";
import RegisterPage from "@/views/register";

const RegisterDialog = (props: { text?: string; callback?: Function }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setOpen(open);
      props.callback(open);
    };

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)} variant="contained">
          Registre-se Agora
        </Button>
        <Dialog
          open={open}
          PaperProps={{
            style: {
              display: "grid",
              placeItems: "center",
              minWidth: "450px",
              maxWidth: "700px",
              width: "50vw",
              overflow: "hidden",
              padding: "1em 1em",
            },
          }}
          onClose={toggleDrawer(false)}
        >
          <RegisterPage />
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default RegisterDialog;
