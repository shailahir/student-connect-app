import React, { useState } from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { StudentsPage } from "./pages/Students";
import AppContext from "./AppContext";
import { StudentApi } from "./pages/Students/StudentApi";
import { apiInstance } from "./apis";

import GroupsPage from "./pages/Groups/GroupsPage";
import { GroupsApi } from "./pages/Groups/GroupsApi";
import MessagePage from "./pages/Message/MessagePage";
import { MetadataApi } from "./apis/MetadataApi";
import { MessagesApi } from "./pages/Message/MessagesApi";

import { DashboardPage } from "./pages/Dashboard";
import OverlayLoader from "./components/OverlayLoader";
import { SchedulesPage } from "./pages/Schedules";
import { SchedulesApi } from "./pages/Schedules/SchedulesApi";

function App() {
  const axiosApiInstance = apiInstance;
  const studentApi: StudentApi = new StudentApi(axiosApiInstance);
  const groupsApi: GroupsApi = new GroupsApi(axiosApiInstance);
  const metadataApi: MetadataApi = new MetadataApi(axiosApiInstance);
  const messagesApi: MessagesApi = new MessagesApi(axiosApiInstance);
  const schedulesApi: SchedulesApi = new SchedulesApi(axiosApiInstance);

  const [showManageMembership, setShowManageMembership] =
    useState<boolean>(false);
  const [showManageGroupsForStudent, setShowManageGroupsForStudent] =
    useState<boolean>(false);
  const [showManageStudentsForGroup, setShowManageStudentsForGroup] =
    useState<boolean>(false);

  const [showOverlayLoader, setShowOverlayLoader] =
    React.useState<boolean>(false);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <AppContext.Provider
        value={{
          studentApi,
          groupsApi,
          metadataApi,
          messagesApi,
          schedulesApi,
          showOverlayLoader,
          setShowOverlayLoader,
          showManageMembership,
          setShowManageMembership,
          showManageGroupsForStudent,
          setShowManageGroupsForStudent,
          showManageStudentsForGroup,
          setShowManageStudentsForGroup,
        }}
      >
        <OverlayLoader />
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={<DashboardPage></DashboardPage>}
                ></Route>
                <Route path="/students/*" element={<StudentsPage />}></Route>
                <Route path="/groups/*" element={<GroupsPage />}></Route>
                <Route path="/messages/*" element={<MessagePage />}></Route>
                <Route path="/schedules/*" element={<SchedulesPage />}></Route>
              </Routes>
            </Layout>
          </LocalizationProvider>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
