import React from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getStatusName } from "../../../../utils";

export type DeliveryDetailsProps = {
  messageDeliveries: any[];
};

export const DeliveryDetails = ({
  messageDeliveries,
}: DeliveryDetailsProps) => {
  const COL_DEFS: GridColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 150,
    },
    {
      headerName: "Remarks",
      field: "remarks",
      width: 250,
    },
    {
      headerName: "Status",
      field: "status",
      width: 150,
      valueGetter: (params: any) => {
        return getStatusName(params?.row?.statusId);
      },
    },
    {
      headerName: "Roll Number",
      field: "rollNumber",
      width: 150,
      valueGetter: (params: any) => {
        return params?.row?.messageReceiver?.student?.rollNumber;
      },
    },
    {
      headerName: "Email",
      field: "email",
      width: 250,
      valueGetter: (params: any) => {
        return params?.row?.messageReceiver?.student?.emailId;
      },
    },
    {
      headerName: "Mobile Number",
      field: "mobileNumber",
      width: 150,
      valueGetter: (params: any) => {
        return params?.row?.messageReceiver?.student?.mobileNumber;
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
        <CardHeader title="Delivery Details" />
        <CardContent>
          <DataGrid
            columns={COL_DEFS}
            rows={messageDeliveries}
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
