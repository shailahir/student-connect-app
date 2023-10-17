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

export const GroupDetailsPage = () => {
  const { id } = useParams();
  const {
    groupsApi,
    showManageStudentsForGroup,
    setShowManageStudentsForGroup,
  } = useContext(AppContext);

  const [groupData, setGroupData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [_groupError, setGroupError] = useState<any>();
  const [triggerRefresh, setTriggerRefresh] = useState<any[]>([]);

  const getGroupDetails = () => {
    setLoading(true);
    groupsApi
      ?.getGroupInfoById(id)
      .then((res) => {
        setLoading(false);
        setGroupError(undefined);
        setGroupData(res?.data);
      })
      .catch((err) => {
        setGroupError(err);
        setLoading(false);
        setGroupData(undefined);
      });
  };

  useEffect(() => {
    getGroupDetails();
  }, []);

  return (
    <Box>
      <Header title={`Groups Details: ${id}`} />
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
              to="/groups"
            >
              Groups
            </MatLink>
            <Typography sx={{ fontSize: "12px" }}>{id}</Typography>
          </Breadcrumbs>
        </Box>
        <Box>{loading && <LinearProgress />}</Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BasicDetails
              name={groupData?.name}
              id={groupData?.id}
              description={groupData?.description}
              key="group-details"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MemberOfGroups
              groupId={id}
              key="member-details"
              triggerRefresh={triggerRefresh}
            />
          </Grid>
        </Grid>
      </Box>
      {showManageStudentsForGroup && (
        <ManageGroupMembership
          open={showManageStudentsForGroup}
          name={groupData?.name}
          id={groupData?.id}
          description={groupData?.description}
          onClose={() => {
            setShowManageStudentsForGroup(false);
            getGroupDetails();
            setTriggerRefresh([]);
          }}
        />
      )}
    </Box>
  );
};
