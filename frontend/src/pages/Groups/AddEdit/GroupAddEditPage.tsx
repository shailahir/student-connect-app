import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as yup from "yup";
import { AddBox, ArrowBack, Save } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  TextField,
  Typography,
  Link as MatLink,
  Paper,
} from "@mui/material";
import AppContext from "../../../AppContext";
import Header from "../../../components/Header";

const GroupAddEditPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const [descriptionError, setDescriptionError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [showOnboardAnother, setShowOnboardAnother] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );

  const { id } = useParams();

  const navigate = useNavigate();
  const { studentApi, groupsApi, setShowOverlayLoader } =
    useContext(AppContext);

  const onClickCancelAndGoBack = () => {
    navigate("../");
  };

  const fetchDetails = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    groupsApi
      ?.getGroupInfoById(id)
      .then((res) => {
        const data = res?.data;

        setName(data?.name);
        setDescription(data?.description);
      })
      .catch((e) => {
        setAlertMessage("Error occurred while fetching group details");
        setShowAlert(true);
        setAlertSeverity("error");
      })
      .finally(() => {
        setLoading(false);
        setShowOverlayLoader(false);
      });
  };

  useEffect(() => {
    if (id) {
      // fetch group details
      fetchDetails();
    }
  }, [id]);

  const validateName = async () => {
    try {
      await yup.string().required().max(255).validate(name);
      setNameError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setNameError(e?.message);
      return false;
    }
  };

  const validateDescription = async () => {
    try {
      await yup.string().required().max(3000).validate(description);
      setDescriptionError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setDescriptionError(e?.message);
      return false;
    }
  };

  const validateInputData = async () => {
    let everythingIsValid = true;

    const nameIsValid = await validateName();
    const descriptionIsValid = await validateDescription();

    everythingIsValid = everythingIsValid && nameIsValid && descriptionIsValid;

    return everythingIsValid;
  };

  const onClickSave = async () => {
    if (!(await validateInputData())) {
      return;
    }

    // Prepare the data to submit
    const data = {
      id,
      name,
      description,
    };

    // Submit data
    if (studentApi) {
      setLoading(true);
      setShowOverlayLoader(true);
      if (id) {
        groupsApi
          ?.updateGroupDetails(data)
          .then((res) => {
            setShowAlert(true);
            setAlertTitle("Success");
            setAlertMessage(
              `Group saved successfully! with id = ${res?.data?.id}`
            );
            setAlertSeverity("success");
            setShowOnboardAnother(true);
          })
          .catch((e) => {
            setShowAlert(true);
            setAlertTitle("Error");
            setAlertMessage(
              "Error occurred while saving the record. Please try again"
            );
            setAlertSeverity("error");
            setShowOnboardAnother(false);
          })
          .finally(() => {
            setLoading(false);
            setShowOverlayLoader(false);
          });
      } else {
        groupsApi
          ?.saveGroupDetails(data)
          .then((res) => {
            setShowAlert(true);
            setAlertTitle("Success");
            setAlertMessage(
              `Group saved successfully! with id = ${res?.data?.id}`
            );
            setAlertSeverity("success");
            setShowOnboardAnother(true);
          })
          .catch((e) => {
            setShowAlert(true);
            setAlertTitle("Error");
            setAlertMessage(
              "Error occurred while saving the record. Please try again"
            );
            setAlertSeverity("error");
            setShowOnboardAnother(false);
          })
          .finally(() => {
            setLoading(false);
            setShowOverlayLoader(false);
          });
      }
    }
  };

  const onClickOnboardAnother = () => {
    setShowAlert(false);
    setAlertTitle("");
    setAlertMessage("");
    setAlertSeverity(undefined);

    setName("");
    setDescription("");
    setShowOnboardAnother(false);
  };

  return (
    <Box>
      <Header title="Add/Edit Group" />
      <Box sx={{ px: 2, py: 1 }}>
        {showAlert && (
          <Alert severity={alertSeverity} title={alertTitle}>
            {alertMessage}
          </Alert>
        )}

        <Box sx={{ mb: 1 }}>
          <Breadcrumbs sx={{ fontSize: "12px", p: 1 }}>
            <MatLink underline="hover" color="inherit" component={Link} to="/">
              Home
            </MatLink>
            <MatLink
              underline="hover"
              color="inherit"
              component={Link}
              to="/groups"
            >
              Groups
            </MatLink>
            <Typography>Add/Edit group details</Typography>
            {id && <Typography>{id}</Typography>}
          </Breadcrumbs>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                id="details-text"
                data-testid="details-text"
              >
                Group Details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Box>
                <TextField
                  id="name"
                  data-testid="name"
                  label="Name:"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event?.target?.value)}
                  size="small"
                  helperText={nameError}
                  error={nameError !== undefined && nameError?.length > 0}
                ></TextField>
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Box>
                <TextField
                  id="description"
                  data-testid="description"
                  label="Description:"
                  fullWidth
                  size="small"
                  multiline
                  minRows={4}
                  value={description}
                  onChange={(event) => setDescription(event?.target?.value)}
                  helperText={descriptionError}
                  error={
                    descriptionError !== undefined &&
                    descriptionError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                sx={{ mr: 2 }}
                id="cancel-n-goback-btn"
                data-testid="cancel-n-goback-btn"
                color="secondary"
                variant="contained"
                onClick={onClickCancelAndGoBack}
                disabled={loading}
                startIcon={<ArrowBack />}
              >
                Cancel
              </Button>
              <Button
                id="save-btn"
                data-testid="save-btn"
                color="primary"
                variant="contained"
                onClick={onClickSave}
                disabled={loading}
                sx={{ mr: 2, color: "#fff" }}
                startIcon={<Save />}
              >
                Save
              </Button>
              {showOnboardAnother && !loading && (
                <Button
                  id="onboard-another-btn"
                  data-testid="onboard-another-btn"
                  color="primary"
                  variant="contained"
                  onClick={onClickOnboardAnother}
                  startIcon={<AddBox />}
                  sx={{ color: "#fff" }}
                >
                  Onboard Another
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};
export default GroupAddEditPage;
