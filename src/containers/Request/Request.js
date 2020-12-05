import React, { useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./Request.styles";
import { Grid, Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RequestTable from "./RequestTable/RequestTable";
import RequestDialog from "./RequestDialog/RequestDialog";

const Request = () => {
  const classes = useStyles();
  const [openedRequestDialog, setOpenedRequestDialog] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const [requests] = useState([
    {
      id: "REQ-1",
      content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
      lecturer: "Le Vinh Thinh",
      courseName: "Introduction to information techonology - INTROIT1234",
      group: 1,
      openDate: "11/12/2020 7:00 AM",
      status: "open",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "REQ-2",
      content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
      lecturer: "Le Vinh Thinh",
      courseName: "Introduction to information techonology - INTROIT1234",
      group: 1,
      openDate: "11/12/2020 7:00 AM",
      status: "open",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "REQ-3",
      content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
      lecturer: "Le Vinh Thinh",
      courseName: "Introduction to information techonology - INTROIT1234",
      group: 1,
      openDate: "11/12/2020 7:00 AM",
      status: "open",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "REQ-4",
      content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
      lecturer: "Le Vinh Thinh",
      courseName: "Introduction to information techonology - INTROIT1234",
      group: 1,
      openDate: "11/12/2020 7:00 AM",
      status: "open",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "REQ-5",
      content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
      lecturer: "Le Vinh Thinh",
      courseName: "Introduction to information techonology - INTROIT1234",
      group: 1,
      openDate: "11/12/2020 7:00 AM",
      status: "open",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);

  // handle approve button click in request dialog
  const handleRequestDialogApproveButtonClick = () => {
    setOpenedRequestDialog(false);
  };

  // handle check schedule button click in request dialog
  const handleRequestDialogCheckScheduleButtonClick = () => {
    history.push("/schedule");
  };

  // handle deny button click in request dialog
  const handleRequestDialogDenyButtonClick = () => {
    setOpenedRequestDialog(false);
  };

  // handle cancel button click in request dialog
  const handleRequestDialogCancelButtonClick = () => {
    history.replace("/requests");
    if (openedRequestDialog) {
      setOpenedRequestDialog(false);
    }
  };

  const handleResolveClick = () => {
    history.replace("/requests/id");
  };

  return (
    <div className={classes.request}>
      <Route path={match.path + "/id"}>
        <RequestDialog
          isOpen={true}
          onCancel={handleRequestDialogCancelButtonClick}
          onApprove={handleRequestDialogApproveButtonClick}
          onCheckSchedule={handleRequestDialogCheckScheduleButtonClick}
          onDeny={handleRequestDialogDenyButtonClick}
        />
      </Route>
      <RequestDialog
        isOpen={openedRequestDialog}
        onCancel={handleRequestDialogCancelButtonClick}
        onApprove={handleRequestDialogApproveButtonClick}
        onCheckSchedule={handleRequestDialogCheckScheduleButtonClick}
        onDeny={handleRequestDialogDenyButtonClick}
      />
      <Grid container justify="center">
        <Grid item xs={11}>
          <Paper component="form" className={classes.paper}>
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Enter request content or lecturer name"
              inputProps={{
                "aria-label": "enter request content or lecturer name",
              }}
            />
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={11}>
          <RequestTable onResolve={handleResolveClick} requests={requests} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Request;
