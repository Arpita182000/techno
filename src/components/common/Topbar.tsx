import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import userImage from "../../assets/images/userPhoto.png";
import Box from "@mui/material/Box";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import user from "../../assets/images/PNG/profile-user_64572.png";
import notificationicon from "../../assets/images/PNG/Notification Bell.png";
import logout from "../../assets/images/PNG/logout.png";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


type props = {
  collapsedSidebar: boolean;
};

const Topbar = ({ collapsedSidebar }: props) => {
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: collapsedSidebar
          ? `calc(100% - ${sizeConfigs.sidebar.collapsedWidth.width})`
          : `calc(100% - ${sizeConfigs.sidebar.unCollapsedWidth.width})`,
        // ml: '10px',
        // width: '100px',
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            p: "10px",
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              width: "25px",
              height: "25px",
            }}
          >
            <img
              src={notificationicon}
              alt="notification"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box sx={{ display: "inline-block" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={user}
                alt="notification"
                style={{ width: "100%", height: "100%" }}
              />

              <IconButton
                aria-label="show more"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ marginRight: "30px" }}
            >
              <MenuItem onClick={handleMenuClose}> <span><img
                src={user}
                alt="notification"
                style={{ width: "25px", height: "25px" }}
              /></span>&nbsp;&nbsp;Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>
                Log Out &nbsp;{" "}
                <span style={{ width: "20px", height: "20px" }}>
                  <img
                    src={logout}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </span>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* <Typography variant="h6" sx={{marginLeft: 'auto'}}>
          <img src={userImage} alt="user-photo" style={{height: '2rem', width: '2rem'}}/>
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
