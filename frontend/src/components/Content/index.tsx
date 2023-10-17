import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const Content = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        flex: "1",
        background: "#eff5fb",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};
export default Content;
