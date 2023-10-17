import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Link as MatLink,
  Paper,
} from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AppContext from "../../../AppContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import moment from "moment";

export const MessageListPage = () => {
  const { messagesApi } = useContext(AppContext);

  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const [messagesList, setMessageList] = useState<any[]>([]);

  const navigate = useNavigate();

  const getAllMessages = () => {
    if (messagesApi) {
      setMessagesLoading(true);
      messagesApi
        .getAllMessages()
        .then((res) => {
          setMessagesLoading(false);
          setMessageList(res?.data);
        })
        .catch((e) => {
          setMessagesLoading(false);
          setMessageList([]);
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getAllMessages();
    // eslint-disable-next-line
  }, []);

  const onClickAdd = () => {
    navigate(`add`);
  };

  const COL_DEFS: GridColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 250,
      renderCell: (params: any) => {
        return (
          <MatLink component={Link} to={`details/${params?.row?.id}`}>
            {params?.row?.id}
          </MatLink>
        );
      },
    },
    {
      headerName: "Message Type",
      field: "msgTypeId",
      width: 150,
      valueGetter: (params: any) => {
        const msgTypeId = params?.row?.msgTypeId;
        if (`${msgTypeId}` === `1`) {
          return "SMS";
        } else if (`${msgTypeId}` === "2") {
          return "E-Mail";
        }
        return "";
      },
    },
    {
      headerName: "Subject",
      field: "msgSubject",
      width: 150,
    },
    {
      headerName: "Text",
      field: "msgText",
      width: 250,
      // flex: 1,
    },
    {
      headerName: "To Be Sent At",
      field: "messageSchedules",
      width: 260,
      valueGetter: (params: any) => {
        const messageSchedules = params?.row?.messageSchedules;
        if (messageSchedules && messageSchedules.length > 0) {
          return moment(messageSchedules[0]?.scheduledToRunAt).toString();
        }
        return "";
      },
    },
    {
      headerName: "# of Receivers",
      field: "messageReceivers",
      width: 130,
      valueGetter: (params: any) => {
        const messageReceivers = params?.row?.messageReceivers;
        if (messageReceivers && messageReceivers.length > 0) {
          return messageReceivers.length;
        }
        return "0";
      },
    },
  ];

  return (
    <Box>
      <Header title="Messages" />
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
              to="/messages"
            >
              Messages
            </MatLink>
          </Breadcrumbs>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Messages</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, color: "#fff" }}
                    color="primary"
                    startIcon={<Add />}
                    onClick={onClickAdd}
                    size="small"
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Refresh />}
                    onClick={getAllMessages}
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ minHeight: "500px" }}>
                <DataGrid
                  style={{ height: "100%" }}
                  loading={messagesLoading}
                  columns={COL_DEFS}
                  rows={messagesList || []}
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
