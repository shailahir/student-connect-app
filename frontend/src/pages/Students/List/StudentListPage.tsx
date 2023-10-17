import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Link as MatLink,
  Paper,
  LinearProgress,
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

const StudentListPage = () => {
  const { studentApi, setShowOverlayLoader } = useContext(AppContext);

  const [studentListLoading, setStudentListLoading] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<any[]>([]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<any>(undefined);

  const navigate = useNavigate();

  const getAllStudents = () => {
    if (studentApi) {
      setStudentListLoading(true);
      setShowOverlayLoader(true);
      studentApi
        .getAllStudents()
        .then((res) => {
          setStudentListLoading(false);
          setStudentList(res?.data);
          setShowOverlayLoader(false);
        })
        .catch((e) => {
          setStudentListLoading(false);
          setStudentList([]);
          setShowOverlayLoader(false);
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  const onClickAdd = () => {
    navigate(`/students/add`);
  };

  const onClickEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const onConfirmDeleteStudent = () => {
    setShowDeleteConfirmation(false);
    if (recordToDelete) {
      setShowOverlayLoader(true);
      studentApi
        ?.deleteStudent(recordToDelete?.rollNumber)
        .then((res) => {
          if (res && res.status >= 200 && res.status < 300) {
            getAllStudents();
          } else {
            // do nothing
          }
        })
        .catch((e) => {
          alert("Error occurred while deleting student");
        })
        .finally(() => {
          setShowOverlayLoader(false);
        });
    }
  };

  const STUDENT_LIST_COL_DEFS: GridColDef[] = [
    {
      headerName: "Roll Number",
      field: "rollNumber",
      width: 130,
      renderCell: (params: any) => {
        return (
          <MatLink component={Link} to={`details/${params?.row?.rollNumber}`}>
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

    {
      headerName: "Email",
      field: "emailId",
      minWidth: 260,
    },
    {
      headerName: "Mobile #",
      field: "mobileNumber",
      width: 130,
    },
    {
      headerName: "Parent Mobile #",
      field: "parentMobileNumber",
      width: 130,
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
            setShowDeleteConfirmation(true);
            setRecordToDelete(params?.row);
          }}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => {
            onClickEdit(params?.row?.["rollNumber"]);
          }}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Header title="All Students" />
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
          </Breadcrumbs>
        </Box>
        {studentListLoading && <LinearProgress />}
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Students</Typography>
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
                    onClick={getAllStudents}
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DataGrid
                  columns={STUDENT_LIST_COL_DEFS}
                  rows={studentList || []}
                  sx={{ minHeight: "200px" }}
                  getRowId={(row) => row?.rollNumber}
                  density="compact"
                  pageSizeOptions={[10, 20, 50, 100]}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {showDeleteConfirmation && (
        <ConfirmDeleteDialog
          open={showDeleteConfirmation}
          message={`Are you sure to delete this record for ${recordToDelete?.firstName} ${recordToDelete?.lastName}, roll number ${recordToDelete?.rollNumber}`}
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
export default StudentListPage;
