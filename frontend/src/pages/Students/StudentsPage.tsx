import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { StudentListPage } from "./List";
import { StudentDetailsPage } from "./Details";
import { StudentAddEditPage } from "./AddEdit";

const StudentsPage = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<StudentListPage />}></Route>
        <Route path="/details/:id" element={<StudentDetailsPage />}></Route>
        <Route path="/add" element={<StudentAddEditPage />}></Route>
        <Route path="/edit/:id" element={<StudentAddEditPage />}></Route>
      </Routes>
    </Box>
  );
};
export default StudentsPage;
