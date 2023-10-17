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
import AppContext from "../../../../AppContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { People } from "@mui/icons-material";
import { Link } from "react-router-dom";

export type MemberOfGroupsProps = {
  rollNumber: string | undefined;
  _dummy: any[];
};

export const MemberOfGroups = ({ rollNumber, _dummy }: MemberOfGroupsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [_dataError, setDataError] = useState<any>();

  const { studentApi, setShowManageGroupsForStudent } = useContext(AppContext);

  const getGroupsForRollNumber = () => {
    setLoading(true);
    studentApi
      ?.getGroupsByRollNumber(rollNumber)
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
  }, [_dummy, rollNumber]);

  const COL_DEFS: GridColDef[] = [
    {
      field: "name",
      headerName: "Group Name",
      width: 300,
      renderCell: (params: any) => {
        return (
          <MatLink component={Link} to={`/groups/details/${params?.row?.id}`}>
            {params?.row?.name}
          </MatLink>
        );
      },
    },
    {
      headerName: "Description",
      field: "description",
      width: 300,
    },
  ];

  return (
    <Box>
      <Card>
        <Box>{loading && <LinearProgress />}</Box>
        <CardHeader
          title="Member of Groups"
          action={
            <Button
              variant="contained"
              startIcon={<People />}
              id="manage-groups-for-student"
              data-testid="manage-groups-for-student"
              onClick={() => {
                setShowManageGroupsForStudent(true);
              }}
            >
              Manage Groups for Student
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <DataGrid
              columns={COL_DEFS}
              rows={data || []}
              getRowId={(row) => row?.id}
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
