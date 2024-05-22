import { Avatar, Drawer, List, Stack, Toolbar, Typography } from "@mui/material";
import assets from "../../assets";
import logoMain from "../../assets/images/logo.png";
import logoCopy from "../../assets/images/logo copy.png";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
// import './sideBar.css';

type props = {
  collapsedSidebar: boolean,
  setCollapsedSidebar: Function
}

const Sidebar = ({collapsedSidebar, setCollapsedSidebar}: props) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsedSidebar ?  sizeConfigs.sidebar.collapsedWidth.width :  sizeConfigs.sidebar.unCollapsedWidth.width,
        flexShrink: 0,
        
        "& .MuiDrawer-paper": {
          width: collapsedSidebar ?  sizeConfigs.sidebar.collapsedWidth.width :  sizeConfigs.sidebar.unCollapsedWidth.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }
      }}
    >
      <List disablePadding sx={!collapsedSidebar ? null : { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }} >
        <Toolbar sx={{ marginBottom: "20px",background: " #FFFFFF",}}>
          <Stack
            sx={{ width: "100%", display: 'flex', justifyContent: 'space-between',}}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
           
            {!collapsedSidebar ? <><img  style={{ width: '100px', }} src={logoMain} /> <Typography sx={{color:"black",fontSize:"8px",fontWeight:"600"}}>MARKETING AUTOMATION</Typography></>:
            <img  style={{ width: '30px'}} src={logoCopy} /> }
             
            <DehazeIcon sx={{
               "&: hover": {
                cursor: 'pointer'
              },
              color:colorConfigs.primaryColor.red[600],
                        }} 
            onClick={() => setCollapsedSidebar(!collapsedSidebar)} />
          </Stack>
        </Toolbar >
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child && !collapsedSidebar ? (
              
              <SidebarItemCollapse  collapsedSidebar={collapsedSidebar} setCollapsedSidebar={setCollapsedSidebar} item={route} key={index} childCount={0} />
             
            ) : (
              <div onClick={() => setCollapsedSidebar(!collapsedSidebar)}>
              <SidebarItem collapsedSidebar={collapsedSidebar} setCollapsedSidebar={setCollapsedSidebar} item={route} key={index} childCount={0}/>
              </div>
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;