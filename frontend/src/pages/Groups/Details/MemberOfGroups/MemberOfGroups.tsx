import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Link as MatLink,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { People } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppContext from "../../../../AppContext";

export type MemberOfGroupsProps = {
  groupId: string | undefined;
  triggerRefresh: any[];
};

export const MemberOfGroups = ({
  groupId,
  triggerRefresh,
}: MemberOfGroupsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [_dataError, setDataError] = useState<any>();

  const { groupsApi, setShowManageStudentsForGroup } = useContext(AppContext);

  const getGroupsForRollNumber = () => {
    setLoading(true);
    groupsApi
      ?.getStudentsByGroupId(groupId)
      .then((res) => {
        setLoading(false);
        setData(res?.data);
        setDataError(undefined);
      })
      .catch((err) => {
        setLoading(false);
        setData(undefined);
        setDataError(err);
      });
  };

  useEffect(() => {
    getGroupsForRollNumber();
  }, [groupId, triggerRefresh]);

  const COL_DEFS: GridColDef[] = [
    {
      headerName: "Roll Number",
      field: "rollNumber",
      width: 130,
      renderCell: (params: any) => {
        return (
          <MatLink
            component={Link}
            to={`/students/details/${params?.row?.rollNumber}`}
          >
            {params?.row?.rollNumber}
          </MatLink>
        );
      },
    },
    {
      headerName: "First Name",
      field: "firstName",
      width: 150,
    },
    {
      headerName: "Middle Name",
      field: "middleName",
      width: 150,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      width: 150,
    },
  ];

  return (
    <Box>
      <Card>
        <Box>{loading && <LinearProgress />}</Box>
        <CardHeader
          title="Member Students"
          action={
            <Button
              variant="contained"
              startIcon={<People />}
              id="manage-students-for-group"
              data-testid="manage-students-for-group"
              onClick={() => {
                setShowManageStudentsForGroup(true);
              }}
            >
              Manage Students for group
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Box>
            <DataGrid
              columns={COL_DEFS || []}
              rows={data || []}
              getRowId={(row) => row?.rollNumber}
              sx={{ minHeight: "200px" }}
              density="compact"
              pageSizeOptions={[10, 20, 50, 100]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
