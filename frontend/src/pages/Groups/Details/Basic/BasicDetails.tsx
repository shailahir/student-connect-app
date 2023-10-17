import React from "react";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import AboutField from "../../../../components/AboutField";

export type BasicDetailsProps = {
  name: string;
  id: string;
  description?: string;
};

export const BasicDetails = ({ name, id, description }: BasicDetailsProps) => {
  return (
    <Box>
      <Card>
        <CardHeader title="Group Details"></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AboutField label="Group Name:" value={name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField label="Group ID:" value={id} />
            </Grid>
            <Grid item xs={12} md={12}>
              <AboutField label="Description:" value={description} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
