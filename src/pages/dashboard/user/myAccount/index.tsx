import { useState, ChangeEvent, ReactNode } from "react";

import { Footer } from "@core/components/Footer/BloomFooter";

import { Box, Tabs, Tab, Grid, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfileCover from "@/views/Dashboard/MyAccount/ProfileCover";
import MyCards from "@/views/Dashboard/MyAccount/MyCards";
import Addresses from "@/views/Dashboard/MyAccount/Addresses";
import EditProfileTab from "@/views/Dashboard/MyAccount/EditProfileTab";
import SecurityTab from "@/views/Dashboard/MyAccount/SecurityTab";
import { useUser } from "@core/contexts/UserContext";
import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";

function ManagementUsersView() {
  const { user } = useUser();
  const { t }: { t: any } = useTranslation();

  const [currentTab, setCurrentTab] = useState<string>("edit_profile");

  const tabs = [
    // { value: "activity", label: t("Activity") },
    { value: "edit_profile", label: t("Edit Profile") },
    // { value: "notifications", label: t("Notifications") },
    { value: "security", label: t("Passwords/Security") },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{user.userInfo.name} - Profile Details</title>
      </Head>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <Grid
          sx={{
            px: 4,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={12} md={3}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Addresses />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={6}>
            <MyCards />
          </Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === "edit_profile" && <EditProfileTab user={user} />}
            {currentTab === "security" && <SecurityTab />}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

ManagementUsersView.authGuard = true;
ManagementUsersView.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ManagementUsersView;

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;

      .MuiTabs-indicator {
        box-shadow: none;
      }
    }
`
);
