import { Button, Typography } from "@mui/material";
import Link from "next/link";

const CrieSuaConta = ({ title }: btnProps) => {
  return (
    <Link className="crieSuaContaBTN" href="/register">
      <Button>
        <Typography sx={{ color: "white", fontSize: "1.2em" }} variant="h6">
          {title ? title : "CRIE SUA CONTA GRATUITAMENTE"}
        </Typography>
      </Button>
    </Link>
  );
};

export { CrieSuaConta };

type btnProps = {
  title?: string;
};
