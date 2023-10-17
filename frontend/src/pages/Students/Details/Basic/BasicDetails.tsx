import React from "react";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import AboutField from "../../../../components/AboutField";

export type BasicDetailsProps = {
  firstName: string;
  middleName: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  parentMobileNumber: string;
  rollNumber: string;
};

export const BasicDetails = ({
  firstName,
  middleName,
  lastName,
  emailId,
  mobileNumber,
  parentMobileNumber,
  rollNumber,
}: BasicDetailsProps) => {
  return (
    <Box>
      <Card>
        <CardHeader title="Student Details"></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AboutField label="First Name:" value={firstName} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Middle Name:" value={middleName} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Last Name:" value={lastName} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Roll Number:" value={rollNumber} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Email ID:" value={emailId} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Mobile Number:" value={mobileNumber} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Parent's Mobile Number:"
                value={parentMobileNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
