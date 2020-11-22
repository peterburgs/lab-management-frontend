import React, { useCallback, useState } from "react";
import SideBar from "../components/Navigation/SideBar/SideBar";
import {
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./Layout.styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ElevationScroll from "../components/ElevationScroll/ElevationScroll";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import RequestPending from "../components/RequestPending/RequestPending";
import PropTypes from "prop-types";

const Layout = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  const [sideBarMobileOpened, setSideBarMobileOpened] = useState(false);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const open = Boolean(accountMenuAnchorEl);

  const classes = useStyles();

  const handleSidebarToggle = useCallback(() => {
    if (sideBarOpened) {
      setSideBarOpened(false);
    } else {
      setSideBarOpened(true);
    }
  }, [sideBarOpened]);

  const handleSideBarMobileToggle = () => {
    if (sideBarMobileOpened) {
      setSideBarMobileOpened(false);
    } else {
      setSideBarMobileOpened(true);
    }
  };

  const handleAccountMenu = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  return (
    <React.Fragment>
      <SideBar
        onMobileToggle={handleSideBarMobileToggle}
        mobileOpen={sideBarMobileOpened}
        onToggle={handleSidebarToggle}
        open={sideBarOpened}
      />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: sideBarOpened,
            [classes.appBarRegistration]: props.registrationPage,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleSideBarMobileToggle}
              edge="start"
              className={classes.menuIcon}
            >
              <MenuIcon />
            </IconButton>
            <RequestPending />
            <div className={classes.grow}></div>
            <div
              className={clsx(classes.userSection, {
                [classes.userSectionRegistration]: props.registrationPage,
              })}
            >
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Typography>Le Duc Thinh</Typography>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleAccountMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={accountMenuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleAccountMenuClose}
              >
                <MenuItem onClick={handleAccountMenuClose}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
        <main className={classes.content}>{props.children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  registrationPage: PropTypes.bool,
};

export default Layout;
