import { Dialog } from "@mui/material";
import React, { useState } from "react";
import ForgotPassword from "@/views/forgetPassword";

const ForgotPasswordDialog = (props: {
  text?: string;
  callback?: Function;
}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setOpen(open);
      props.callback(open);
    };

  return (
    <React.Fragment>
      <div onClick={toggleDrawer(true)}>
        <p
          style={{
            margin: 0,
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            fontWeight: "400",
            fontSize: "0.875rem",
            lineHeight: "1.43",
            letterSpacing: "0.01071em",
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
            textDecorationColor: "rgba(25, 118, 210, 0.4)",
          }}
        >
          Esqueceu a senha?
        </p>
      </div>
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
        <ForgotPassword />
      </Dialog>
    </React.Fragment>
  );
};

export default ForgotPasswordDialog;
