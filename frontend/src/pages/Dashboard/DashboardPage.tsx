import { Box, Breadcrumbs, Grid, Link as MatLink } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import StudentStats from "./Widgets/StudentStats";
import GroupStats from "./Widgets/GroupStats";
import MessageStats from "./Widgets/MessageStats";

export const DashboardPage = () => {
  return (
    <Box>
      <Header title="Dashboard" />
      <Box sx={{ px: 2, py: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Breadcrumbs sx={{ fontSize: "12px", p: 1 }}>
            <MatLink underline="hover" color="inherit" component={Link} to="/">
              Dashboard
            </MatLink>
          </Breadcrumbs>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <StudentStats />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GroupStats />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MessageStats />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
