import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Link as MatLink,
  Paper,
} from "@mui/material";
import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import AppContext from "../../../AppContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { ConfirmDeleteDialog } from "../../../components/ConfirmDeleteDialog";

const GroupListPage = () => {
  const { groupsApi, setShowOverlayLoader } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<any[]>([]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<any>(undefined);

  const navigate = useNavigate();

  const getAllGroups = () => {
    if (groupsApi) {
      setLoading(true);
      groupsApi
        .getAllGroups()
        .then((res) => {
          setLoading(false);
          setGroupList(res?.data);
        })
        .catch((e) => {
          setLoading(false);
          setGroupList([]);
        });
    }
  };

  const onConfirmDeleteStudent = () => {
    setShowDeleteConfirmation(false);
    if (recordToDelete) {
      setShowOverlayLoader(true);
      groupsApi
        ?.deleteGroupById(recordToDelete?.id)
        .then((res) => {
          if (res && res.status >= 200 && res.status < 300) {
            getAllGroups();
          } else {
          }
        })
        .catch((e) => {
          alert("Error occurred while deleting group");
        })
        .finally(() => {
          setShowOverlayLoader(false);
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getAllGroups();
    // eslint-disable-next-line
  }, []);

  const onClickAdd = () => {
    navigate(`add`);
  };

  const onClickEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const LIST_COL_DEFS: GridColDef[] = [
    {
      headerName: "Group Name",
      field: "name",
      width: 200,

      renderCell: (params: any) => {
        return (
          <MatLink component={Link} to={`details/${params?.row?.id}`}>
            {params?.row?.name}
          </MatLink>
        );
      },
    },
    {
      headerName: "Description",
      field: "description",
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setRecordToDelete(params?.row);
            setShowDeleteConfirmation(true);
          }}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => {
            onClickEdit(params?.row?.["id"]);
          }}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Header title="Groups" />
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
          </Breadcrumbs>
        </Box>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Groups</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, color: "#fff" }}
                    color="primary"
                    startIcon={<Add />}
                    onClick={onClickAdd}
                    size="small"
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Refresh />}
                    onClick={getAllGroups}
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                loading={loading}
                columns={LIST_COL_DEFS}
                rows={groupList}
                sx={{ minHeight: "200px" }}
                getRowId={(row) => row?.id}
                density="compact"
                pageSizeOptions={[10, 20, 50, 100]}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {showDeleteConfirmation && (
        <ConfirmDeleteDialog
          open={showDeleteConfirmation}
          message={`Are you sure to delete this record for ${recordToDelete?.name}( ${recordToDelete?.id})`}
          onClose={() => {
            setShowDeleteConfirmation(false);
          }}
          onConfirm={onConfirmDeleteStudent}
          title="Are you sure?"
        />
      )}
    </Box>
  );
};
export default GroupListPage;
