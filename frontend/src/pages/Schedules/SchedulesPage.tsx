import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ScheduleListPage } from "./List";
import { ScheduleDetailsPage } from "./Details";

const SchedulesPage = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<ScheduleListPage />}></Route>
        <Route path="/details/:id" element={<ScheduleDetailsPage />}></Route>
      </Routes>
    </Box>
  );
};
export default SchedulesPage;
