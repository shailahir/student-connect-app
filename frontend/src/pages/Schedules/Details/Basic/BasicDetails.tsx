import React from "react";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import moment from "moment";
import { getStatusName } from "../../../../utils";
import AboutField from "../../../../components/AboutField";

export type BasicDetailsProps = {
  id: string | undefined;
  scheduledDateTime: string | undefined;
  schedulerStatusId: string | undefined;
};

export const BasicDetails = ({
  id,
  scheduledDateTime,
  schedulerStatusId,
}: BasicDetailsProps) => {
  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box>
        <CardHeader title="Schedule Details"></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AboutField label="ID:" value={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Status:"
                value={
                  schedulerStatusId ? getStatusName(schedulerStatusId) : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Scheduled to run at:"
                value={
                  scheduledDateTime ? moment(scheduledDateTime).toString() : ""
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};
