import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import SideBar from "components/SideBar";
// import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const name = useSelector((state) => state.global.name);
  const email = useSelector((state) => state.global.email);
  const user = { name, email };
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        user={user || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
