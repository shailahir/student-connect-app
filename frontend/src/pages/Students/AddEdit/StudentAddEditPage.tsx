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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StudentAddEditPage = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [parentMobileNumber, setParentMobileNumber] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [middleNameError, _setMiddleNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [rollNumberError, setRollNumberError] = useState<string>("");

  const [mobileNumberError, setMobileNumberError] = useState<string>("");
  const [parentMobileNumberError, setParentMobileNumberError] =
    useState<string>("");

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
  const { studentApi, setShowOverlayLoader } = useContext(AppContext);

  const onClickCancelAndGoBack = () => {
    navigate("../");
  };

  const fetchStudentDetails = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    studentApi
      ?.getStudentByRollNumber(id)
      .then((res) => {
        const data = res?.data;
        setEmail(data?.emailId);
        setFirstName(data?.firstName);
        setMiddleName(data?.middleName);
        setLastName(data?.lastName);
        setRollNumber(data?.rollNumber);
        setMobileNumber(data?.mobileNumber);
        setParentMobileNumber(data?.parentMobileNumber);
      })
      .catch((e) => {
        setAlertMessage("Error occurred while fetching student details");
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
      // fetch student details
      fetchStudentDetails();
    }
  }, [id]);

  const validateEmail = async () => {
    try {
      await yup.string().email().max(250).required().validate(email);
      setEmailError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setEmailError(e?.message);
      return false;
    }
  };

  const validateFirstName = async () => {
    try {
      await yup.string().required().max(150).validate(firstName);
      setFirstNameError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setFirstNameError(e?.message);
      return false;
    }
  };

  const validateLastName = async () => {
    try {
      await yup.string().required().max(100).validate(lastName);
      setLastNameError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setLastNameError(e?.message);
      return false;
    }
  };

  const validateRollNumber = async () => {
    try {
      await yup.string().required().max(20).validate(rollNumber);
      setRollNumberError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setRollNumberError(e?.message);
      return false;
    }
  };

  const validateMobileNumber = async () => {
    try {
      await yup
        .string()
        .required()
        .max(15)
        .matches(phoneRegExp, "Phone number is not valid")
        .validate(mobileNumber);
      setMobileNumberError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setMobileNumberError(e?.message);
      return false;
    }
  };

  const validateParentMobileNumber = async () => {
    try {
      await yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .nullable()
        .validate(mobileNumber);
      setParentMobileNumberError("");
      return true;
    } catch (e) {
      // @ts-expect-error
      setParentMobileNumberError(e?.message);
      return false;
    }
  };

  const validateInputData = async () => {
    let everythingIsValid = true;

    const emailIsValid = await validateEmail();
    const firstNameIsValid = await validateFirstName();
    const lastNameIsValid = await validateLastName();
    const rollNumberIsValid = await validateRollNumber();
    const mobileNumberIsValid = await validateMobileNumber();
    const parentMobileNumberIsValid = await validateParentMobileNumber();

    everythingIsValid =
      emailIsValid &&
      firstNameIsValid &&
      lastNameIsValid &&
      rollNumberIsValid &&
      mobileNumberIsValid &&
      parentMobileNumberIsValid;

    return everythingIsValid;
  };

  const onClickSaveStudent = async () => {
    // Validate the content
    if (!(await validateInputData())) {
      return;
    }

    // Prepare the data to submit
    const data = {
      emailId: email,
      firstName,
      lastName,
      middleName,
      mobileNumber,
      parentMobileNumber,
      rollNumber: `${rollNumber}`?.toUpperCase(),
    };

    // Submit data
    if (studentApi) {
      setLoading(true);
      setShowOverlayLoader(true);
      if (id) {
        studentApi
          .updateStudentDetails(data)
          .then((res) => {
            setShowAlert(true);
            setAlertTitle("Success");
            setAlertMessage(
              `Student saved successfully! with id = ${res?.data?.rollNumber}`
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
        studentApi
          .saveStudentDetails(data)
          .then((res) => {
            setShowAlert(true);
            setAlertTitle("Success");
            setAlertMessage(
              `Student saved successfully! with id = ${res?.data?.rollNumber}`
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

  const onClickOnboardAnotherStudent = () => {
    setShowAlert(false);
    setAlertTitle("");
    setAlertMessage("");
    setAlertSeverity(undefined);
    setEmail("");
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setRollNumber("");
    setMobileNumber("");
    setParentMobileNumber("");
    setShowOnboardAnother(false);
  };

  return (
    <Box>
      <Header title="Add/Edit Student" />
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
              to="/students"
            >
              Students
            </MatLink>
            <Typography>Add/Edit student details</Typography>
            {id && <Typography>{id}</Typography>}
          </Breadcrumbs>
        </Box>
        {showAlert && (
          <Alert severity={alertSeverity} title={alertTitle}>
            {alertMessage}
          </Alert>
        )}
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                id="student-details-text"
                data-testid="student-details-text"
              >
                Student Details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="first-name"
                  data-testid="first-name"
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(event) => setFirstName(event?.target?.value)}
                  size="small"
                  helperText={firstNameError}
                  error={
                    firstNameError !== undefined && firstNameError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="middle-name"
                  data-testid="middle-name"
                  label="Middle Name"
                  fullWidth
                  value={middleName}
                  onChange={(event) => setMiddleName(event?.target?.value)}
                  size="small"
                  helperText={middleNameError}
                  error={
                    middleNameError !== undefined && middleNameError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="last-name"
                  data-testid="last-name"
                  label="Last Name"
                  fullWidth
                  value={lastName}
                  onChange={(event) => setLastName(event?.target?.value)}
                  size="small"
                  helperText={lastNameError}
                  error={
                    lastNameError !== undefined && lastNameError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                id="academic-details-text"
                data-testid="academic-details-text"
              >
                Academic Details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="roll-number"
                  data-testid="roll-number"
                  label={`Roll Number${
                    id
                      ? " (If you change it, a new record will be created)"
                      : ""
                  }`}
                  fullWidth
                  value={rollNumber}
                  onChange={(event) => setRollNumber(event?.target?.value)}
                  size="small"
                  helperText={rollNumberError}
                  error={
                    rollNumberError !== undefined && rollNumberError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                id="contact-details-text"
                data-testid="contact-details-text"
              >
                Contact Details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="email"
                  data-testid="email"
                  label="Email"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(event) => {
                    setEmail(event?.target?.value);
                    setEmailError("");
                  }}
                  helperText={emailError}
                  error={emailError !== undefined && emailError?.length > 0}
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="mobile-number"
                  data-testid="mobile-number"
                  label="Mobile Number (Without Country Code or 0)"
                  fullWidth
                  size="small"
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event?.target?.value)}
                  helperText={mobileNumberError}
                  error={
                    mobileNumberError !== undefined &&
                    mobileNumberError?.length > 0
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="parent-mobile-number"
                  data-testid="parent-mobile-number"
                  label="Parent's Mobile Number (Without Country Code or 0)"
                  fullWidth
                  size="small"
                  value={parentMobileNumber}
                  onChange={(event) =>
                    setParentMobileNumber(event?.target?.value)
                  }
                  helperText={parentMobileNumberError}
                  error={
                    parentMobileNumberError !== undefined &&
                    parentMobileNumberError?.length > 0
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
                id="save-student-btn"
                data-testid="save-student-btn"
                color="primary"
                variant="contained"
                onClick={onClickSaveStudent}
                disabled={loading}
                sx={{ mr: 2, color: "#fff" }}
                startIcon={<Save />}
              >
                Save Student
              </Button>
              {showOnboardAnother && !loading && (
                <Button
                  id="onboard-another-btn"
                  data-testid="onboard-another-btn"
                  color="primary"
                  variant="contained"
                  onClick={onClickOnboardAnotherStudent}
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
export default StudentAddEditPage;
