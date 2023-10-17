import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { MessageListPage } from "./List";
import { MessageDetailsPage } from "./Details";
import { MessageAddEditPage } from "./AddEdit";

const MessagePage = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<MessageListPage />}></Route>
        <Route path="/add" element={<MessageAddEditPage />}></Route>
        <Route path="/details/:id" element={<MessageDetailsPage />}></Route>
      </Routes>
    </Box>
  );
};
export default MessagePage;
