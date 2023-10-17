import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export type AboutFieldProps = {
  label: string;
  value?: any;
};

const AboutField = ({
  label,
  value,
  children,
}: PropsWithChildren<AboutFieldProps>) => {
  return (
    <Box>
      <Box>
        <Typography
          style={{
            textTransform: "uppercase",
            fontSize: "10px",
            fontWeight: "bold",
            letterSpacing: 0.5,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Box>
      {children ? (
        <>{children}</>
      ) : (
        <Box>
          <Typography
            style={{
              overflow: "hidden",
              lineHeight: "24px",
              wordBreak: "break-word",
            }}
          >
            {value}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default AboutField;
