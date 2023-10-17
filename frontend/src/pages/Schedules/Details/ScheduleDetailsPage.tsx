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

import { MessageDetails } from "./MessageDetails";
import { ReceiverList } from "../../Message/Details/Receivers";
import { DeliveryDetails } from "./DeliveryDetails";

const ScheduleDetailsPage = () => {
  const { id } = useParams();
  const { schedulesApi, setShowOverlayLoader } = useContext(AppContext);

  const [studentData, setStudentData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [_studentError, setStudentError] = useState<any>();
  const [messageData, setMessageData] = useState<any>();

  const getStudentDetails = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    schedulesApi
      ?.getScheduleById(id)
      .then((res) => {
        setStudentError(undefined);
        setStudentData(res?.data);
      })
      .catch((err) => {
        setStudentError(err);
        setStudentData(undefined);
      })
      .finally(() => {
        setShowOverlayLoader(false);
        setLoading(false);
      });
  };

  const getMessageByScheduleId = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    schedulesApi
      ?.getMessageByScheduleId(`${id}`)
      .then((res) => {
        setMessageData(res?.data);
      })
      .catch((err) => {
        setMessageData(undefined);
      })
      .finally(() => {
        setShowOverlayLoader(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudentDetails();
    getMessageByScheduleId();
  }, []);

  return (
    <Box>
      <Header title={`Schedule Details: ${id}`} />
      <Box sx={{ px: 2, py: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Breadcrumbs sx={{ fontSize: "12px", p: 1 }}>
            <MatLink underline="hover" color="inherit" component={Link} to="/">
              Home
            </MatLink>
            <MatLink
              underline="hover"
              color="inherit"
              component={Link}
              to="/schedules"
            >
              Schedules
            </MatLink>
            <Typography sx={{ fontSize: "12px" }}>{id}</Typography>
          </Breadcrumbs>
        </Box>
        <Box>{loading && <LinearProgress />}</Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} display={"flex"}>
            <BasicDetails
              id={studentData?.id}
              scheduledDateTime={studentData?.scheduledToRunAt}
              schedulerStatusId={studentData?.schedulerStatusId}
              key="basic-details"
            />
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <MessageDetails id={studentData?.id} />
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <ReceiverList receiverList={messageData?.messageReceivers || []} />
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <DeliveryDetails
              messageDeliveries={messageData?.messageDeliveries || []}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ScheduleDetailsPage;
