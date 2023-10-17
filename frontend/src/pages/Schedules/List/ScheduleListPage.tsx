import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Link as MatLink,
  Paper,
  LinearProgress,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AppContext from "../../../AppContext";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import moment from "moment";
import { getStatusName } from "../../../utils";

const ScheduleListPage = () => {
  const { schedulesApi, setShowOverlayLoader } = useContext(AppContext);

  const [scheduleListLoading, setScheduleListLoading] =
    useState<boolean>(false);
  const [scheduleList, setScheduleList] = useState<any[]>([]);

  const getAllSchedules = () => {
    if (schedulesApi) {
      setScheduleListLoading(true);
      setShowOverlayLoader(true);
      schedulesApi
        ?.getAllSchedules()
        .then((res) => {
          setScheduleListLoading(false);
          setScheduleList(res?.data);
          setShowOverlayLoader(false);
        })
        .catch((e) => {
          setScheduleListLoading(false);
          setScheduleList([]);
          setShowOverlayLoader(false);
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getAllSchedules();
    // eslint-disable-next-line
  }, []);

  const COL_DEFS: GridColDef[] = [
    {
      headerName: "Id",
      field: "id",
      width: 260,
      renderCell: (params: any) => {
        return (
          <MatLink component={Link} to={`details/${params?.row?.id}`}>
            {params?.row?.id}
          </MatLink>
        );
      },
    },
    {
      headerName: "Scheduled To Run At",
      field: "scheduledToRunAt",
      width: 250,
      valueGetter: (params: any) => {
        return moment(params?.row?.scheduledToRunAt).toString();
      },
    },
    {
      headerName: "Scheduler Status",
      field: "schedulerStatusId",
      width: 150,
      valueGetter: (params: any) => {
        return getStatusName(params?.row?.schedulerStatusId);
      },
    },
  ];

  return (
    <Box>
      <Header title="All Schedules" />
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
          </Breadcrumbs>
        </Box>
        {scheduleListLoading && <LinearProgress />}
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Schedules</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Refresh />}
                    onClick={getAllSchedules}
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DataGrid
                  columns={COL_DEFS}
                  rows={scheduleList || []}
                  sx={{ minHeight: "200px" }}
                  getRowId={(row) => row?.id}
                  density="compact"
                  pageSizeOptions={[10, 20, 50, 100]}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};
export default ScheduleListPage;
