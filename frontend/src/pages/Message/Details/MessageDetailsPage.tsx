import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Grid,
  LinearProgress,
  Link as MatLink,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../../AppContext";
import { BasicDetails } from "./Basic";
import Header from "../../../components/Header";
import { ReceiverList } from "./Receivers";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const { messagesApi, setShowOverlayLoader } = useContext(AppContext);

  const [messageData, setMessageData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [_messageError, setMessageError] = useState<any>();

  const getMessageDetails = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    messagesApi
      ?.getMessageById(id)
      .then((res) => {
        setMessageError(undefined);
        setMessageData(res?.data);
      })
      .catch((err) => {
        setMessageError(err);
        setMessageData(undefined);
      })
      .finally(() => {
        setShowOverlayLoader(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMessageDetails();
  }, []);

  return (
    <Box>
      <Header title={`Message Details: ${id}`} />
      <Box
        sx={{
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ mb: 1 }}>
          <Breadcrumbs sx={{ fontSize: "12px", p: 1 }}>
            <MatLink underline="hover" color="inherit" component={Link} to="/">
              Home
            </MatLink>
            <MatLink
              underline="hover"
              color="inherit"
              component={Link}
              to="/messages"
            >
              Messages
            </MatLink>
            <Typography sx={{ fontSize: "12px" }}>{id}</Typography>
          </Breadcrumbs>
        </Box>
        <Box>{loading && <LinearProgress />}</Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BasicDetails
              id={messageData?.id}
              subject={messageData?.msgSubject}
              text={messageData?.msgText}
              type={messageData?.msgType}
              scheduledDateTime={
                messageData?.messageSchedules?.[0]?.scheduledToRunAt
              }
              schedulerStatusId={
                messageData?.messageSchedules?.[0]?.schedulerStatusId
              }
              schedulerId={messageData?.messageSchedules?.[0]?.id}
              key="basic-details"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReceiverList receiverList={messageData?.messageReceivers || []} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default MessageDetailsPage;
