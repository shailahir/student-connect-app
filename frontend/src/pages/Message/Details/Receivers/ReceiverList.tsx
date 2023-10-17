import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link as MatLink,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export type ReceiverListProps = {
  receiverList: any[];
};

export const ReceiverList = ({ receiverList }: ReceiverListProps) => {
  const COL_DEFS: GridColDef[] = [
    {
      headerName: "Roll Number",
      field: "rollNumber",
      width: 130,
      renderCell: (params: any) => {
        return (
          <MatLink
            component={Link}
            to={`/students/details/${params?.row?.student?.rollNumber}`}
          >
            {params?.row?.student?.rollNumber}
          </MatLink>
        );
      },
    },
    {
      headerName: "First Name",
      field: "firstName",
      width: 150,
      valueGetter: (params: any) => {
        return params?.row?.student?.firstName;
      },
    },
    {
      headerName: "Middle Name",
      field: "middleName",
      width: 150,
      valueGetter: (params: any) => {
        return params?.row?.student?.middleName;
      },
    },
    {
      headerName: "Last Name",
      field: "lastName",
      width: 150,
      valueGetter: (params: any) => {
        return params?.row?.student?.lastName;
      },
    },
  ];

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box>
        <CardHeader title="Receivers"></CardHeader>
        <CardContent>
          <DataGrid
            columns={COL_DEFS}
            rows={receiverList}
            getRowId={(row) => row?.id}
            sx={{ minHeight: "200px" }}
            density="compact"
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </CardContent>
      </Box>
      <Box></Box>
    </Card>
  );
};
