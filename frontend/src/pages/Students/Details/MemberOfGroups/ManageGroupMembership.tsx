import React, { useContext, useEffect, useState } from "react";
import { Cancel, Check } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";

import AppContext from "../../../../AppContext";
import AboutField from "../../../../components/AboutField";

export type ManageGroupMembershipProps = {
  open: boolean;
  onClose: () => void;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  rollNumber: string | undefined;
};

export type Option = {
  groupId: string;
  groupName: string;
};

export const ManageGroupMembership = ({
  open,
  onClose,
  firstName,
  middleName,
  lastName,
  rollNumber,
}: ManageGroupMembershipProps) => {
  const [groupOptions, setGroupOptions] = useState<Option[]>([]);
  const [groupsLoading, setGroupsLoading] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<Option[]>([]);
  const [selectedGroupsLoading, setSelectedGroupsLoading] =
    useState<boolean>(false);

  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [_saveError, setSaveError] = useState<any>();
  const [_saveData, setSaveData] = useState<any>();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );

  const { setShowOverlayLoader, groupsApi, studentApi } =
    useContext(AppContext);

  const getGroupsForRollNumber = () => {
    setShowOverlayLoader(true);
    setSelectedGroupsLoading(true);
    studentApi
      ?.getGroupsByRollNumber(rollNumber)
      .then((res) => {
        const data = res?.data;
        if (data && data?.length > 0) {
          const options = data.map((item: any) => {
            return {
              groupId: item?.id,
              groupName: item?.name,
            };
          });
          setSelectedGroups(options);
        }
      })
      .catch(() => {
        setSelectedGroups([]);
      })
      .finally(() => {
        setShowOverlayLoader(false);
        setSelectedGroupsLoading(false);
      });
  };

  const getAllGroups = async () => {
    setShowOverlayLoader(true);
    setGroupsLoading(true);
    groupsApi
      ?.getAllGroups()
      .then((response) => {
        const data = response?.data;
        if (data && data?.length > 0) {
          // TODO: Revisit this
          const options = data.map((item: any) => {
            return {
              groupId: item?.id,
              groupName: item?.name,
            };
          });
          setGroupOptions(options);
        }
        // setGroupsData(response?.data);
      })
      .catch((err) => {
        // setGroupsData([]);
        setGroupOptions([]);
      })
      .finally(() => {
        setGroupsLoading(false);
        setShowOverlayLoader(false);
      });
  };

  useEffect(() => {
    getAllGroups();
    getGroupsForRollNumber();
  }, []);

  const onClickSave = () => {
    const data = {
      rollNumber: rollNumber,
      groups:
        selectedGroups?.map((item) => {
          return {
            id: item?.groupId,
          };
        }) || [],
    };

    setSaveLoading(true);
    setShowOverlayLoader(true);
    groupsApi
      ?.updateGroupMembershipsByRollNumber(data)
      .then((res: any) => {
        setSaveData(res?.data);
        setSaveError(undefined);

        setAlertTitle("Success");
        setAlertMessage("Group membership updated successfully.");
        setAlertSeverity("success");
        setShowAlert(true);
      })
      .catch((err: any) => {
        setSaveError(err);
        setSaveData(undefined);

        setAlertTitle("Error");
        setAlertMessage("Group membership update failed.");
        setAlertSeverity("error");

        setShowAlert(true);
      })
      .finally(() => {
        setSaveLoading(false);
        setShowOverlayLoader(false);
      });
  };

  const onSelectionChange = (_event: any, newValues: any) => {
    setSelectedGroups(newValues || []);
    setShowAlert(false);
    setAlertTitle("");
    setAlertMessage("");
    setAlertSeverity(undefined);
  };

  return (
    <Dialog open={open}>
      {(groupsLoading || selectedGroupsLoading || saveLoading) && (
        <LinearProgress />
      )}
      <DialogTitle>Manage Groups for Student</DialogTitle>
      <DialogContent>
        {showAlert && (
          <Alert severity={alertSeverity} title={alertTitle}>
            {alertMessage}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AboutField label="First Name:" value={firstName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutField label="Middle Name:" value={middleName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutField label="Last Name:" value={lastName} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutField label="Roll Number:" value={rollNumber} />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="groups-auto-complete"
              options={groupOptions || []}
              autoHighlight
              multiple
              loading={groupsLoading}
              value={selectedGroups}
              getOptionLabel={(option: Option) => option?.groupName}
              isOptionEqualToValue={(option: Option, value: Option) =>
                option?.groupId === value?.groupId
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option?.groupName}
                </Box>
              )}
              onChange={onSelectionChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Groups:"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Cancel />}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Check />}
          onClick={onClickSave}
        >
          Save Membership
        </Button>
      </DialogActions>
    </Dialog>
  );
};
