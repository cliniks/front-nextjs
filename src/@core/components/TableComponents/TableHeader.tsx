import { TableCell, useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import { L } from "@core/types/languageType";

export function TableHeaderItems({ dataSource }) {
  const theme = useTheme();
  const { t }: L = useTranslation();
  return (
    <>
      {dataSource.map((item) => {
        if (item.visible)
          return (
            <TableCell
              key={"headerConfig-" + item.key}
              align={
                item.textAlign !== "center" || item.alignItems !== "center"
                  ? item.textAlign || item.alignItems
                  : "center"
              }
              sx={{ color: theme.colors.primary.main }}
            >
              {t(item.title)}
            </TableCell>
          );
      })}
    </>
  );
}
