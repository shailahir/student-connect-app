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
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../AppContext";
import AboutField from "../../../../components/AboutField";

export type ManageGroupMembershipProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  name: string;
  description: string;
};

export type Option = {
  rollNumber: string;
  fullName: string;
};

export const ManageGroupMembership = ({
  open,
  onClose,
  id,
  name,
  description,
}: ManageGroupMembershipProps) => {
  const [studentOptions, setStudentOptions] = useState<Option[]>([]);
  const [studentsLoading, setStudentsLoading] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<Option[]>([]);
  const [selectedStudentsLoading, setSelectedStudentsLoading] =
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

  const getStudentsByGroupId = () => {
    setShowOverlayLoader(true);
    setSelectedStudentsLoading(true);
    groupsApi
      ?.getStudentsByGroupId(id)
      .then((res: any) => {
        const data = res?.data;
        if (data && data?.length > 0) {
          const options: Option[] = data.map((item: any) => {
            return {
              rollNumber: item?.rollNumber,
              fullName: `${item?.firstName}${
                item?.middleName ? item?.middleName : ""
              } ${item?.lastName} (${item?.rollNumber})`,
            };
          });
          setSelectedStudents(options);
        }
      })
      .catch(() => {
        setSelectedStudents([]);
      })
      .finally(() => {
        setShowOverlayLoader(false);
        setSelectedStudentsLoading(false);
      });
  };

  const getAllStudents = async () => {
    setShowOverlayLoader(true);
    setStudentsLoading(true);
    studentApi
      ?.getAllStudents()
      .then((response) => {
        const data = response?.data;
        if (data && data?.length > 0) {
          const options: Option[] = data.map((item: any) => {
            return {
              rollNumber: item?.rollNumber,
              fullName: `${item?.firstName}${
                item?.middleName ? item?.middleName : ""
              } ${item?.lastName} (${item?.rollNumber})`,
            };
          });
          setStudentOptions(options);
        }
      })
      .catch(() => {
        setStudentOptions([]);
      })
      .finally(() => {
        setStudentsLoading(false);
        setShowOverlayLoader(false);
      });
  };

  useEffect(() => {
    getAllStudents();
    getStudentsByGroupId();
  }, []);

  const onClickSave = () => {
    const data = {
      groupId: id,
      students:
        selectedStudents?.map((item) => {
          return {
            id: item?.rollNumber,
          };
        }) || [],
    };

    setSaveLoading(true);
    setShowOverlayLoader(true);
    groupsApi
      ?.updateGroupMembershipsByGroupId(data)
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
    setSelectedStudents(newValues || []);
    setShowAlert(false);
    setAlertTitle("");
    setAlertMessage("");
    setAlertSeverity(undefined);
  };

  return (
    <Dialog open={open}>
      {(studentsLoading || selectedStudentsLoading || saveLoading) && (
        <LinearProgress />
      )}
      <DialogTitle>Manage Students for Group</DialogTitle>
      <DialogContent>
        {showAlert && (
          <Alert severity={alertSeverity} title={alertTitle}>
            {alertMessage}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AboutField label="Group Name:" value={name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutField label="Group ID:" value={id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <AboutField label="Description:" value={description} />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="students-auto-complete"
              options={studentOptions || []}
              autoHighlight
              multiple
              loading={studentsLoading}
              value={selectedStudents}
              getOptionLabel={(option: Option) => option?.fullName}
              isOptionEqualToValue={(option: Option, value: Option) =>
                option?.rollNumber === value?.rollNumber
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option?.fullName}
                </Box>
              )}
              onChange={onSelectionChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Students:"
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
