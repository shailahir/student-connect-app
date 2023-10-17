import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  LinearProgress,
  Typography,
  Link as MatLink,
  Paper,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
  Checkbox,
  Button,
  Alert,
  AlertColor,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../../AppContext";
import { ArrowBack, People, Person, Save } from "@mui/icons-material";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import moment from "moment";
import Header from "../../../components/Header";

export type ReceiverOption = {
  rollNumber?: string | undefined;
  groupName?: string | undefined;
  fullName: string;
  groupId?: string | undefined;
};

export const MessageAddEditPage = () => {
  const {
    metadataApi,
    messagesApi,
    studentApi,
    groupsApi,
    setShowOverlayLoader,
  } = useContext(AppContext);

  const [messageTypeOptions, setMessageTypeOptions] = useState<any>([]);
  const [messageTypeLoading, setMessageTypeLoading] = useState<boolean>(false);
  const [receiversOptions, setReceiversOptions] = useState<any>([]);
  const [receiversLoading, setReceiversLoading] = useState<boolean>(false);

  const [studentData, setStudentData] = useState<any>([]);
  const [groupsData, setGroupsData] = useState<any>([]);

  const [selectedMessageType, setSelectedMessageType] = useState<any>("");
  const [selectedReceivers, setSelectedReceivers] = useState<ReceiverOption[]>(
    []
  );
  const [messageSubject, setMessageSubject] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const [scheduledDateTime, setScheduledDateTime] = useState<any>(moment());
  const [sendImmediatelyFlag, setSendImmediatelyFlag] =
    useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const getMessageOptionsMetadata = () => {
    setMessageTypeLoading(true);
    setShowOverlayLoader(true);
    metadataApi
      ?.getMessageTypesMetadata()
      .then((res: any) => {
        setMessageTypeOptions(res?.data);
      })
      .catch(() => {
        setMessageTypeOptions([]);
      })
      .finally(() => {
        setMessageTypeLoading(false);
        setShowOverlayLoader(false);
      });
  };

  const getAllStudentsAndGroups = () => {
    // get all students and groups to be shown in the dropdown
    setReceiversLoading(true);
    setShowOverlayLoader(true);
    Promise.allSettled([
      studentApi?.getAllStudents(),
      groupsApi?.getAllGroups(),
    ])
      .then((value: any) => {
        if (value && Array.isArray(value)) {
          if (value?.[0]?.status === "fulfilled") {
            setStudentData(value?.[0]?.value?.data);
          }
          if (value?.[1]?.status === "fulfilled") {
            setGroupsData(value?.[1]?.value?.data);
          }
        }
      })
      .catch((e) => {
        setStudentData([]);
        setGroupsData([]);
      })
      .finally(() => {
        setReceiversLoading(false);
        setShowOverlayLoader(false);
      });
  };

  useEffect(() => {
    getMessageOptionsMetadata();
    getAllStudentsAndGroups();
  }, []);

  useEffect(() => {
    const options: Array<ReceiverOption> = [];
    if (studentData && Array.isArray(studentData) && studentData?.length > 0) {
      for (let student of studentData) {
        options.push({
          rollNumber: student?.rollNumber,
          fullName:
            `${student?.firstName} ${student?.middleName} ${student?.lastName}`.replaceAll(
              "  ",
              " "
            ),
          groupId: undefined,
          groupName: undefined,
        });
      }
    }

    if (groupsData && Array.isArray(groupsData) && groupsData?.length > 0) {
      for (let group of groupsData) {
        options.push({
          rollNumber: undefined,
          fullName: group?.name,
          groupId: group?.id,
          groupName: group?.name,
        });
      }
    }

    setReceiversOptions(options);
  }, [studentData, groupsData]);

  const onMessageTypeChange = (event: any) => {
    setSelectedMessageType(event?.target?.value);
  };

  const onReceiverSelectionChange = (_event: any, newValue: any) => {
    setSelectedReceivers(newValue);
  };

  const onClickSave = () => {
    const data = {
      messageTypeId: selectedMessageType,
      messageText: messageContent,
      messageSubject: messageSubject,
      timestamp: scheduledDateTime?.toDate().getTime(),
      runASAP: sendImmediatelyFlag,
      receivers: selectedReceivers || [],
    };

    if (data) {
      setShowOverlayLoader(true);
      setShowAlert(false);
      messagesApi
        ?.saveMessage(data)
        .then((res: any) => {
          setAlertMessage("Message saved successfully!");
          setAlertSeverity("success");
          setAlertTitle("Success");
          setShowAlert(true);
        })
        .catch((e: any) => {
          setAlertMessage("Error saving message!");
          setAlertSeverity("error");
          setAlertTitle("Error");
          setShowAlert(true);
        })
        .finally(() => {
          setShowOverlayLoader(false);
        });
    }
  };

  const onClickGoBack = () => {
    navigate(`/messages`);
  };

  return (
    <Box>
      <Header title="Compose Message" />
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
            <Typography sx={{ fontSize: "12px" }}>Compose Message</Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          {(messageTypeLoading || receiversLoading) && <LinearProgress />}
        </Box>
        {showAlert && (
          <Alert severity={alertSeverity} title={alertTitle}>
            {alertMessage}
          </Alert>
        )}
        <Paper sx={{ p: 2 }}>
          <Box>
            <Box sx={{ pb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Compose Message:
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Autocomplete
                  id="receiver-select-demo"
                  options={receiversOptions || []}
                  autoHighlight
                  multiple
                  value={selectedReceivers}
                  getOptionLabel={(option: ReceiverOption) => option?.fullName}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option?.groupId ? <People /> : <Person />}
                      <Typography sx={{ ml: 2 }}>{option?.fullName}</Typography>
                    </Box>
                  )}
                  onChange={onReceiverSelectionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Receivers:"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <FormControl sx={{ width: "300px" }}>
                    <InputLabel id="message-type-select-label">
                      Message Type:
                    </InputLabel>
                    <Select
                      labelId="message-type-select-label"
                      id="message-type-select"
                      label="Message Type:"
                      onChange={onMessageTypeChange}
                      value={selectedMessageType}
                    >
                      {messageTypeLoading ? (
                        <MenuItem value="loading">Loading...</MenuItem>
                      ) : (
                        messageTypeOptions &&
                        Array.isArray(messageTypeOptions) &&
                        messageTypeOptions?.length > 0 &&
                        messageTypeOptions.map((option: any, index: number) => (
                          <MenuItem
                            value={option?.id}
                            key={`${option?.id}-${index}`}
                          >
                            {option?.typeName}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="Scheduled Date & time:"
                  disablePast
                  value={scheduledDateTime}
                  onChange={(event: any) => {
                    setScheduledDateTime(event);
                  }}
                  disabled={sendImmediatelyFlag}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={sendImmediatelyFlag}
                    onChange={(_event: any, checked: boolean) => {
                      setSendImmediatelyFlag(checked);
                    }}
                  />
                  <Typography>Send As soon as possible</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  label="Subject (For Email):"
                  value={messageSubject}
                  onChange={(event: any) =>
                    setMessageSubject(event?.target?.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Message Body:"
                  value={messageContent}
                  onChange={(event: any) =>
                    setMessageContent(event?.target?.value)
                  }
                  minRows={5}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  sx={{ color: "#fff", mr: 2 }}
                  variant="contained"
                  startIcon={<ArrowBack />}
                  onClick={onClickGoBack}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  sx={{ color: "#fff" }}
                  variant="contained"
                  startIcon={<Save />}
                  onClick={onClickSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
