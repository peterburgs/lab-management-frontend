import React, { useCallback, useState } from "react";
import SideBar from "../components/Navigation/SideBar/SideBar";
import {
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Typography,
} from "@material-ui/core";
import useStyles from "./Layout.styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ElevationScroll from "../components/ElevationScroll/ElevationScroll";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import RequestPending from "../components/RequestPending/RequestPending";

const Layout = (props) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [sideBarMobileOpened, setSideBarMobileOpened] = useState(false);

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
            <RequestPending>Request 123 is pending</RequestPending>
            <div className={classes.grow}></div>
            <div className={classes.userSection}>
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
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <main className={classes.content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
