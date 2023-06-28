import { useEffect, useState } from "react";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Card,
  ListItemIcon,
  Slider,
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatReal } from "@core/utils/functions";
import { Category } from "ecommersys/dist/Entities";
import { productSearchValues } from ".";
import { debounce } from "lodash";

function Sidebar({
  subCategories,
  categories,
  getProducts,
  setLoading,
}: {
  categories: Category[];
  subCategories: Category[];
  getProducts: (props: productSearchValues) => void;
  setLoading: Function;
}) {
  const { t }: { t: any } = useTranslation();

  const [checked2, setChecked2] = useState<string[]>([]);

  const [timer, setTimer] = useState(100);

  const [value, setValue] = useState<number[]>([10, 2000000]);

  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const request = {
      minPrice: value[0],
      maxPrice: value[1],
      categories: checked2,
    };
    const execute = debounce(() => {
      getProducts(request);
    }, 1000);
    if (timer === 0 && !changing) {
      execute();
    }
    if (timer > 0) {
      const delayFn = setTimeout(() => {
        setTimer(0);
      }, timer);
      setLoading(true);
      return () => clearTimeout(delayFn);
    }
  }, [timer, changing]);

  const handleToggle2 = (value: string, index: number) => () => {
    const currentIndex = checked2.indexOf(value);
    const newChecked = [...checked2];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTimer(100);

    setChecked2(newChecked);
  };

  const [checked3, setChecked3] = useState([0]);

  // const handleToggle3 = (value: number) => () => {
  //   const currentIndex = checked3.indexOf(value);
  //   const newChecked = [...checked3];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked3(newChecked);
  // };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(() => newValue as number[]);
    setTimer(100);
    setChanging(true);
  };

  document.addEventListener("mouseup", (e) => {
    setChanging(false);
  });

  return (
    <Card>
      <Accordion defaultExpanded>
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t("Price Range")}</Typography>
        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            pt: 5,
            ml: 2.5,
            mr: 2.5,
          }}
        >
          <Slider
            value={value}
            step={10}
            min={1000}
            max={2000000}
            onChange={handleChange}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => (
              <div>{formatReal(value.toString())}</div>
            )}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion defaultExpanded>
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t("Categories")}</Typography>
        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            p: 0,
          }}
        >
          <List component="div">
            {categories.map((value, index) => {
              return (
                <ListItemWrapper
                  sx={{
                    py: 0,
                    px: 2,
                  }}
                  onClick={handleToggle2(value._id, index)}
                  key={value._id}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                    }}
                  >
                    <Checkbox
                      edge="start"
                      checked={
                        checked2.filter((cat) => cat === value._id)?.length > 0
                      }
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={value.name}
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItemWrapper>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Accordion defaultExpanded>
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t("Sub categories")}</Typography>
        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            p: 0,
          }}
        >
          <List component="div">
            {subCategories.map((value, index) => {
              return (
                <ListItemWrapper
                  sx={{
                    py: 0,
                    px: 2,
                  }}
                  onClick={handleToggle2(value._id, index)}
                  key={value._id}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                    }}
                  >
                    <Checkbox
                      edge="start"
                      checked={
                        checked2.filter((cat) => cat === value._id)?.length > 0
                      }
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={value.name}
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItemWrapper>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider />
      {/* <Accordion defaultExpanded>
        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{t("Rating")}</Typography>
        </AccordionSummaryWrapper>
        <AccordionDetails
          sx={{
            p: 0,
          }}
        >
          <List component="div">
            {rating.map((value) => {
              return (
                <ListItemWrapper
                  key={value.id}
                  onClick={handleToggle3(value.id)}
                >
                  <Rating value={value.rating} precision={1} readOnly />
                </ListItemWrapper>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion> */}
    </Card>
  );
}

export default Sidebar;

const AccordionSummaryWrapper = styled(AccordionSummary)(
  () => `
      &.Mui-expanded {
        min-height: 48px;
      }

      .MuiAccordionSummary-content.Mui-expanded {
        margin: 12px 0;
      }
  `
);

const ListItemWrapper = styled(ListItemButton)(
  () => `
      &.MuiButtonBase-root {
        border-radius: 0;
      }
  `
);
