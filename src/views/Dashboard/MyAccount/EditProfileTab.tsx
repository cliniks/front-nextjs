import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Label from "@core/components/Label";
import { useEffect } from "react";
import { useUser } from "@core/contexts/UserContext";
import Link from "next/link";

function EditProfileTab(userData: any) {
  const { t }: { t: any } = useTranslation();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData]);

  if (!user) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {t("Personal Details")}
              </Typography>
              {/* <Typography variant="subtitle2">
                {t("Manage informations related to your personal details")}
              </Typography> */}
            </Box>
            <Button
              component={Link}
              href="/dashboard/user/myAccount/edit"
              variant="text"
              startIcon={<EditTwoToneIcon />}
            >
              <Typography> {t("Edit")} </Typography>
            </Button>
            {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              {t("Edit")}
            </Button> */}
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <Typography> {t("Name")}: </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color="black">
                    <b>
                      {user?.userInfo?.name} {user.userInfo.lastName}
                    </b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <Typography> {t("Cpf")}: </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Typography color="black">{user.userInfo.cpf}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <Typography> {t("Email")}: </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      maxWidth: { xs: "auto", sm: 300 },
                    }}
                  >
                    <Typography color="black">
                      <b>{user.userInfo.email}</b>
                    </Typography>
                    <Box pl={1} component="span">
                      <Label color="success">{t("Primary")}</Label>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
