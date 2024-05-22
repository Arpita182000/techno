import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { useState } from "react";

const MainLayout = () => {
  
  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(true);
  return (
    <Box sx={{ display: "flex", }}>
      <Topbar collapsedSidebar={collapsedSidebar} />
      <Box
        component="nav"
        sx={{
          width: collapsedSidebar ?  sizeConfigs.sidebar.collapsedWidth.width :  sizeConfigs.sidebar.unCollapsedWidth.width,
          flexShrink: 0,
          
        }}
      >
        <Sidebar collapsedSidebar={collapsedSidebar} setCollapsedSidebar={setCollapsedSidebar} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: collapsedSidebar ? `calc(100% - ${sizeConfigs.sidebar.collapsedWidth.width})` : `calc(100% - ${sizeConfigs.sidebar.unCollapsedWidth.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;