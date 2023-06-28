import { useState } from "react";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { t } from "i18next";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";

import { pathCurrentOrNextNavigate } from "@core/utils/functions";

import RouterLink from "next/link";

export const TableBodyItems = ({ listItems, page }) => {
  const [selectedItems, setSelectedClients] = useState<string[]>([]);

  return listItems.forEach((list: any) => {
    const handleSelectOneClient = (listId: string): void => {
      if (!selectedItems.includes(listId)) {
        setSelectedClients((prevSelected) => [...prevSelected, listId]);
      } else {
        setSelectedClients((prevSelected) =>
          prevSelected.filter((id) => id !== listId)
        );
      }
    };

    const iscouponselected = selectedItems.includes(list.id);
    return (
      <TableRow hover key={list.id} selected={iscouponselected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={iscouponselected}
            onChange={() => handleSelectOneClient(list.id)}
            value={iscouponselected}
          />
        </TableCell>

        {Object.keys(list).map((objKey, objIndex) => {
          if (objKey !== "id") {
            return (
              <TableCell key={objKey + objIndex}>
                <Typography variant="subtitle2" noWrap>
                  {list[objKey]}
                </Typography>
              </TableCell>
            );
          }
          return <></>;
        })}

        <TableCell align="center">
          <Typography noWrap>
            <Tooltip title={`${t("View")}`} arrow>
              <IconButton
                component={RouterLink}
                href={`${pathCurrentOrNextNavigate()}/${page}/show/`}
                color="primary"
              >
                <LaunchTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${t("Delete")}`} arrow>
              <IconButton color="primary">
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </TableCell>
      </TableRow>
    );
  });
};
