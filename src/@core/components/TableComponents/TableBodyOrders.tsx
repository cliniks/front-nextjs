import { ChangeEvent, SetStateAction } from "react";
import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";

export interface TableBodyMapProps {
  listItems: any;
  storeName?: string;
  dataSource: DataSourceType[];
  selectedItems?: string[];
  setSelectedItem?: React.Dispatch<SetStateAction<string[]>>;
  handleConfirmDelete?: Function;
  disabledCheckbox?: boolean;
}

export const TableBodyMapOrders = (props: TableBodyMapProps) => {
  const {
    listItems,
    dataSource,
    selectedItems,
    storeName,
    setSelectedItem,
    handleConfirmDelete,
    disabledCheckbox = false,
  } = props;

  if (!listItems) return <></>;

  const bodyItems = listItems?.map((listItem) => {
    const iscouponselected = selectedItems
      ? selectedItems.includes(listItem._id)
      : null;
    return (
      <TableRow hover key={listItem._id} selected={iscouponselected}>
        {dataSource.map((item: any, objIndex) => {
          switch (listItem[item.key]) {
            case "devolution":
              listItem[item.key] = "Devolução";
              break;
            case "payment":
              listItem[item.key] = "Pagamento";
              break;

            case "repayment":
              listItem[item.key] = "Reembolso";
              break;

            case "exchange":
              listItem[item.key] = "Troca";
              break;
            default:
            // code block
          }

          if (item.visible) {
            if (item.render)
              return (
                <TableCell key={item.key + objIndex}>
                  {item.render(
                    listItem,
                    handleConfirmDelete ? handleConfirmDelete : null,
                    storeName
                  )}
                </TableCell>
              );
            return (
              <TableCell key={item.key + objIndex}>
                <Typography variant="subtitle2" noWrap>
                  {listItem[item.key]}
                </Typography>
              </TableCell>
            );
          }
        })}
      </TableRow>
    );
  });
  return <>{bodyItems}</>;
};

export type DataSourceType = {
  key: string;
  title: string;
  textAlign?: string;
  render?: Function;
  visible: boolean;
};
