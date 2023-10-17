import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { GroupListPage } from "./List";
import { GroupDetailsPage } from "./Details";
import { GroupAddEditPage } from "./AddEdit";

const GroupsPage = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<GroupListPage />}></Route>
        <Route path="/details/:id" element={<GroupDetailsPage />}></Route>
        <Route path="/add" element={<GroupAddEditPage />}></Route>
        <Route path="/edit/:id" element={<GroupAddEditPage />}></Route>
      </Routes>
    </Box>
  );
};
export default GroupsPage;
