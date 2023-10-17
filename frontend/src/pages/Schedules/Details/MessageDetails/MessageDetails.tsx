import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../AppContext";
import AboutField from "../../../../components/AboutField";

export type MessageDetailsProps = {
  id: string | number;
};

export const MessageDetails = ({ id }: MessageDetailsProps) => {
  const { schedulesApi } = useContext(AppContext);

  const [messageData, setMessageData] = useState<any>();

  const getMessageByScheduleId = () => {
    schedulesApi
      ?.getMessageByScheduleId(`${id}`)
      .then((res) => {
        setMessageData(res?.data);
      })
      .catch(() => {
        setMessageData(undefined);
      });
  };

  useEffect(() => {
    getMessageByScheduleId();
  }, [id]);

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardHeader title="Message Details" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AboutField label="Message ID:" value={messageData?.id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutField
              label="Type:"
              value={`${
                "" + messageData?.msgTypeId === "1" ? "SMS" : "E-Mail"
              }`}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <AboutField label="Subject:" value={messageData?.msgSubject} />
          </Grid>
          <Grid item xs={12} md={12}>
            <AboutField label="Text:" value={messageData?.msgText} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
