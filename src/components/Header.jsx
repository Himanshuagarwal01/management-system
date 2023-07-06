import { AppBar, Typography, Box, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Box sx={{ py: 10, flexGrow: 1 }}>
        {" "}
        <AppBar
          color="inherit"
          sx={{ flexDirection: "row", py: 2 }}
          component="nav"
          position="fixed"
        >
          <Typography
            component="div"
            variant="h6"
            fontSize="25px"
            fontWeight="600"
            sx={{ flexGrow: 1, pl: 2,pt:1 }}
          >
            Management
          </Typography>
          <NavLink>Employee</NavLink>
          <NavLink>Device</NavLink>
          <IconButton sx={{ mr: 2 }}>
            <AccountCircle sx={{fontSize:"40px"}} />
          </IconButton>
        </AppBar>
      </Box>{" "}
    </>
  );
}
