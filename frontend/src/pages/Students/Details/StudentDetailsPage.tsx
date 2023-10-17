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
import { MemberOfGroups } from "./MemberOfGroups";
import Header from "../../../components/Header";
import { ManageGroupMembership } from "./MemberOfGroups/ManageGroupMembership";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const {
    studentApi,
    setShowOverlayLoader,
    setShowManageGroupsForStudent,
    showManageGroupsForStudent,
  } = useContext(AppContext);

  const [studentData, setStudentData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [_studentError, setStudentError] = useState<any>();
  const [triggerRefresh, setTriggerRefresh] = useState<any[]>([]);

  const getStudentDetails = () => {
    setLoading(true);
    setShowOverlayLoader(true);
    studentApi
      ?.getStudentByRollNumber(id)
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

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <Box>
      <Header title={`Student Details: ${id}`} />
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
            <Typography sx={{ fontSize: "12px" }}>{id}</Typography>
          </Breadcrumbs>
        </Box>
        <Box>{loading && <LinearProgress />}</Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BasicDetails
              firstName={studentData?.firstName}
              middleName={studentData?.middleName}
              lastName={studentData?.lastName}
              emailId={studentData?.emailId}
              mobileNumber={studentData?.mobileNumber}
              rollNumber={studentData?.rollNumber}
              parentMobileNumber={studentData?.parentMobileNumber}
              key="basic-details"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MemberOfGroups
              rollNumber={id}
              key="basic-details"
              _dummy={triggerRefresh}
            />
          </Grid>
        </Grid>
      </Box>
      {showManageGroupsForStudent && (
        <ManageGroupMembership
          open={showManageGroupsForStudent}
          firstName={studentData?.firstName}
          middleName={studentData?.middleName}
          lastName={studentData?.lastName}
          rollNumber={studentData?.rollNumber}
          onClose={() => {
            setShowManageGroupsForStudent(false);
            getStudentDetails();
            setTriggerRefresh([]);
          }}
        />
      )}
    </Box>
  );
};
export default StudentDetailsPage;
