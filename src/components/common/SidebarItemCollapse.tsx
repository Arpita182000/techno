import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Button, Checkbox, Container, Grid, } from '@mui/material';
type Props = {
  collapsedSidebar: boolean,
  setCollapsedSidebar: Function,
  item: RouteType;
  childCount: number
};

const SidebarItemCollapse = ({ collapsedSidebar, setCollapsedSidebar, item, childCount }: Props) => {
  const [open, setOpen] = useState(false);

  const { appState } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
      <Box sx={{
        "&:hover .icon": {
      filter: "brightness(80%) invert(1) sepia(1) saturate(10000%) hue-rotate(0deg)",
    }}}>
        <ListItemButton
          onClick={() => {
            setOpen(!open);
            setCollapsedSidebar(false);
          }}
          sx={{
            "&: hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg,
              color: colorConfigs.sidebar.bg,
              borderRadius:"10px"
            },
            paddingY: "12px",
            paddingX: "24px"
          }}
        >
          <ListItemIcon className="icon" sx={{
            color: colorConfigs.sidebar.color,
            filter: appState === item.state ? "brightness(80%) invert(1) sepia(1) saturate(10000%) hue-rotate(0deg)" : null,
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {!collapsedSidebar && item.sidebarProps.displayText}
              </Typography>
            }
          />
          {!collapsedSidebar && (open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />)}
        </ListItemButton>
      </Box>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse collapsedSidebar={collapsedSidebar} setCollapsedSidebar={setCollapsedSidebar} item={route} key={index} childCount={childCount+1} />
                ) : (
                  <SidebarItem collapsedSidebar={collapsedSidebar} setCollapsedSidebar={setCollapsedSidebar} item={route} key={index} childCount={childCount+1}/>
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;