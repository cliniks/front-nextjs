import { ChangeEvent, SetStateAction } from "react";
import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";

export interface TableBodyMapProps {
  listItems: any;
  dataSource: DataSourceType[];
  selectedItems?: string[];
  setSelectedItem?: React.Dispatch<SetStateAction<string[]>>;
  handleConfirmDelete?: Function;
  disabledCheckbox?: boolean;
  ordersSAnotherInfos?: string[];
}

export const TableBodyMap = (props: TableBodyMapProps) => {
  const {
    listItems,
    dataSource,
    selectedItems,
    ordersSAnotherInfos,
    setSelectedItem,
    handleConfirmDelete,
    disabledCheckbox = false,
  } = props;

  if (!listItems) return <></>;

  const bodyItems = listItems.map((listItem) => {
    const handleSelectOneclient = (
      event: ChangeEvent<HTMLInputElement>,
      listId: string
    ): void => {
      if (selectedItems && setSelectedItem) {
        if (!selectedItems.includes(listId)) {
          setSelectedItem((prevSelected) => [...prevSelected, listId]);
        } else {
          setSelectedItem((prevSelected) =>
            prevSelected.filter((id) => id !== listId)
          );
        }
      }
    };

    const iscouponselected = selectedItems
      ? selectedItems.includes(listItem._id)
      : null;
    return (
      <TableRow
        hover
        key={listItem._id + new Date().getTime()}
        selected={iscouponselected}
      >
        {!disabledCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={iscouponselected}
              onChange={(event) => handleSelectOneclient(event, listItem._id)}
              // value={iscouponselected}
            />
          </TableCell>
        )}

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
              return item.render(
                listItem,
                ordersSAnotherInfos,
                handleConfirmDelete ? handleConfirmDelete : null
              );
            return (
              <TableCell key={item.key + new Date().getTime()}>
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
