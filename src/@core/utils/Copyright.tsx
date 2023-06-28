import { Link, Typography } from "@mui/material";

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://cliniks.com.br/">
        cliniks.com.br
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
