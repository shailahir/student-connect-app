import { Typography, Box } from "@mui/material";
import React from "react";

export type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <Box sx={{ width: "100%", background: "#fff", height: "60px" }}>
      <Box sx={{ py: 2, px: 3 }}>
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Header;
