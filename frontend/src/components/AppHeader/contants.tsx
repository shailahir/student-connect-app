import {
  Dashboard,
  Groups2,
  Message,
  Schedule,
  School,
} from "@mui/icons-material";

export const NAV_MENU_ITEMS = [
  {
    id: "1",
    title: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },
  {
    id: "2",
    title: "Students",
    path: "/students",
    icon: <School />,
  },
  {
    id: "3",
    title: "Groups",
    path: "/groups",
    icon: <Groups2 />,
  },
  {
    id: "4",
    title: "Messages",
    path: "/messages",
    icon: <Message />,
  },
  {
    id: "5",
    title: "Schedules",
    path: "/schedules",
    icon: <Schedule />,
  },
];
