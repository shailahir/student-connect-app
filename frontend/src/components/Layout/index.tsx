import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../AppHeader";
import Content from "../Content";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Content>{children}</Content>
      </Box>
    </Box>
  );
};
export default Layout;
