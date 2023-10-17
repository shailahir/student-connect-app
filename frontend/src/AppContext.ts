import { createContext } from "react";
import { StudentApi } from "./pages/Students/StudentApi";
import { GroupsApi } from "./pages/Groups/GroupsApi";
import { MetadataApi } from "./apis/MetadataApi";
import { MessagesApi } from "./pages/Message/MessagesApi";
import { SchedulesApi } from "./pages/Schedules/SchedulesApi";

export type TAppContext = {
  studentApi: StudentApi | undefined;
  groupsApi: GroupsApi | undefined;
  metadataApi: MetadataApi | undefined;
  messagesApi: MessagesApi | undefined;
  schedulesApi: SchedulesApi | undefined;
  setShowOverlayLoader: (show: boolean) => void;
  showOverlayLoader: boolean;
  showManageMembership: boolean;
  setShowManageMembership: (show: boolean) => void;
  showManageGroupsForStudent: boolean;
  setShowManageGroupsForStudent: (show: boolean) => void;
  showManageStudentsForGroup: boolean;
  setShowManageStudentsForGroup: (show: boolean) => void;
};

const initialValues: TAppContext = {
  studentApi: undefined,
  groupsApi: undefined,
  metadataApi: undefined,
  messagesApi: undefined,
  schedulesApi: undefined,
  setShowOverlayLoader: () => {},
  showOverlayLoader: false,
  showManageMembership: false,
  setShowManageMembership: () => {},
  showManageGroupsForStudent: false,
  setShowManageGroupsForStudent: () => {},
  showManageStudentsForGroup: false,
  setShowManageStudentsForGroup: () => {},
};

const AppContext = createContext(initialValues);
export default AppContext;
