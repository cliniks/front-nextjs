import { TableCell, useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";

export function TableHeadItems({ headerConfigCLients }) {
  const theme = useTheme();
  const { t }: L = useTranslation();
  return (
    <>
      {Object.keys(headerConfigCLients).forEach((item, i) => {
        if (item !== "_id") {
          return (
            <TableCell
              key={"headerConfig-" + item + i}
              align="center"
              sx={{ color: theme.colors.primary.main }}
            >
              {t(headerConfigCLients[item])}
            </TableCell>
          );
        }
      })}
    </>
  );
}
