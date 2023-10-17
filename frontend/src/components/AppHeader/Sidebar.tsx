import React from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MatLink,
  List,
  Typography,
} from "@mui/material";
import { NAV_MENU_ITEMS } from "./contants";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

export const Sidebar = () => {
  const onClickLogout = () => {
    window.open("/logout", "_self");
  };

  return (
    <Box
      sx={{
        width: "180px",
        background: (theme) => theme.palette.primary.main,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ flex: 1 }}>
        <ListItem sx={{ borderBottom: "1px solid #fff", mb: 2 }}>
          <ListItemText sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "18px", color: "#fff" }}>
              Notification Portal
            </Typography>
          </ListItemText>
        </ListItem>
        {NAV_MENU_ITEMS.map((item) => (
          <ListItem>
            <ListItemIcon
              sx={{ color: "#fff", width: "40px", marginRight: "0px" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "-20px" }}>
              <MatLink
                key={item?.id}
                sx={{ color: "#fff" }}
                component={Link}
                to={item.path}
                style={{ marginRight: "16px" }}
              >
                {item.title}
              </MatLink>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <ListItem onClick={onClickLogout} sx={{ cursor: "pointer" }}>
          <ListItemIcon
            sx={{ color: "#fff", width: "40px", marginRight: "0px" }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText sx={{ marginLeft: "-20px", color: "#fff" }}>
            <Typography sx={{ color: "#fff" }}>Logout</Typography>
          </ListItemText>
        </ListItem>
      </Box>
    </Box>
  );
};
