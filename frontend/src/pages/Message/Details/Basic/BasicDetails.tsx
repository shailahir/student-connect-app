import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link as MatLink,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import AboutField from "../../../../components/AboutField";
import { getStatusName } from "../../../../utils";

export type BasicDetailsProps = {
  id: string;
  type: number | string;
  subject: string;
  text: string;
  scheduledDateTime: string | number;
  schedulerStatusId: string;
  schedulerId: string;
};

export const BasicDetails = ({
  id,
  type,
  subject,
  text,
  scheduledDateTime,
  schedulerStatusId,
  schedulerId,
}: BasicDetailsProps) => {
  return (
    <Box>
      <Card>
        <CardHeader title="Message Details"></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AboutField label="ID:" value={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Type:"
                value={`${"" + type === "1" ? "SMS" : "E-Mail"}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Scheduled to run At:"
                value={
                  scheduledDateTime ? moment(scheduledDateTime).toString() : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AboutField
                label="Scheduler Status:"
                value={
                  schedulerStatusId ? getStatusName(schedulerStatusId) : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <AboutField
                label="Scheduler ID:"
                value={
                  <MatLink
                    component={Link}
                    to={`/schedules/details/${schedulerId}`}
                  >
                    {schedulerId}
                  </MatLink>
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <AboutField label="Subject:" value={subject} />
            </Grid>
            <Grid item xs={12} md={12}>
              <AboutField label="Text:" value={text} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
