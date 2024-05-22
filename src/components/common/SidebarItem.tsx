import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import { Box, Button, Checkbox, Container, Grid, } from '@mui/material';
type Props = {
  collapsedSidebar: boolean;
  setCollapsedSidebar: Function;
  item: RouteType;
  childCount: number;
};

const SidebarItem = ({
  collapsedSidebar,
  setCollapsedSidebar,
  item,
  childCount,
}: Props) => {
  const { appState } = useSelector((state: RootState) => state.appState);
  const childPadding = childCount == 0 ? 0 : childCount * 24 + "px";

  return item.sidebarProps && item.path ? (
    <Box sx={{
      "&:hover .icon": {
    filter: "brightness(80%) invert(1) sepia(1) saturate(10000%) hue-rotate(0deg)",
  }}}>
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
          color: colorConfigs.sidebar.bg,
          transition: "background-color 0.3s ease, color 0.3s ease",
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.hoverBg : "unset",
        paddingY: "12px",
        paddingX: "10px",
        margin: `0 0 0 ${childPadding}`,
        color: appState === item.state ? colorConfigs.sidebar.bg : "unset",
        fontSize: "14px",
        borderRadius: "10px",
        // transition: "all 0.3s ease",
      }}
    >
      <ListItemIcon className="icon" 
        sx={{
          color: colorConfigs.textColor,
          minWidth: "33px",
          filter: appState === item.state ? "brightness(80%) invert(1) sepia(1) saturate(10000%) hue-rotate(0deg)" : null,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {!collapsedSidebar && item.sidebarProps.displayText}
    </ListItemButton>
    </Box>
  ) : null;
};

export default SidebarItem;
