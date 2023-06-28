import { useState, MouseEvent, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Button,
  Avatar,
  useTheme,
  styled,
  Dialog,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ForgotPassword from "@/views/forgetPassword";

function SecurityTab() {
  const { t }: { t: any } = useTranslation();

  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setOpen(open);
    };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">{t("Security")}</Typography>
          <Typography variant="subtitle2">
            {t("Change your security preferences below")}
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <ListItemText
                primaryTypographyProps={{ variant: "h5", gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: "subtitle2",
                  lineHeight: 1,
                }}
                primary={t("Change Password")}
                secondary={t("You can change your password here")}
              />
              <Button
                size="large"
                variant="outlined"
                onClick={toggleDrawer(true)}
              >
                <Typography>{t("Change password")}</Typography>
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
                <ForgotPassword />
              </Dialog>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
