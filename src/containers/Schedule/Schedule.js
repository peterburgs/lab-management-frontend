import React, { useState } from "react";
import {
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import useStyles from "./Schedule.styles";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import TimeTable from "./TimeTable/TimeTable";
import LabUsageForm from "./LabUsageForm/LabUsageForm";

const Schedule = () => {
  const classes = useStyles();
  const [week, setWeek] = useState(1);
  const [labUsageFormOpened, setLabUsageFormOpened] = useState(false);
  const [labs] = useState([
    {
      id: 1,
      name: "A3-102",
    },
    {
      id: 2,
      name: "A3-103",
    },
    {
      id: 3,
      name: "A3-104",
    },
    {
      id: 4,
      name: "A3-105",
    },
    {
      id: 5,
      name: "A3-106",
    },
  ]);
  const [labUsages] = useState([
    {
      id: "1123",
      lab: "A3-102",
      dayOfWeek: 0,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Web Programming",
      lecturerName: "Nguyen Duc Khoan",
      week: 1,
    },
    {
      id: "1124",
      lab: "A3-102",
      dayOfWeek: 0,
      startPeriod: 6,
      endPeriod: 8,
      courseName: "New Technology",
      lecturerName: "Le Vinh Thinh",
      week: 1,
    },
    {
      id: "1200",
      lab: "A3-102",
      dayOfWeek: 0,
      startPeriod: 13,
      endPeriod: 15,
      courseName: "System Testing",
      lecturerName: "Nguyen Tran Thi Van",
      week: 1,
    },
    {
      id: "1201",
      lab: "A3-104",
      dayOfWeek: 0,
      startPeriod: 13,
      endPeriod: 15,
      courseName: "Software Project Management",
      lecturerName: "Nguyen Duc Khoan",
      week: 1,
    },
    {
      id: "1202",
      lab: "A3-105",
      dayOfWeek: 0,
      startPeriod: 13,
      endPeriod: 15,
      courseName: "Machine Learning",
      lecturerName: "Nguyen Thien Bao",
      week: 1,
    },
    {
      id: "1125",
      lab: "A3-102",
      dayOfWeek: 1,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Windows Programming",
      lecturerName: "Le Vinh Thinh",
      week: 1,
    },
    {
      id: "1126",
      lab: "A3-102",
      dayOfWeek: 2,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Networking Essentials",
      lecturerName: "Nguyen Dang Quang",
      week: 1,
    },
    {
      id: "1127",
      lab: "A3-102",
      dayOfWeek: 3,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Windows Programming",
      lecturerName: "Le Van Vinh",
      week: 1,
    },
    {
      id: "1128",
      lab: "A3-102",
      dayOfWeek: 4,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Programming Techniques",
      lecturerName: "Nguyen Thien Bao",
      week: 1,
    },
    {
      id: "1129",
      lab: "A3-102",
      dayOfWeek: 5,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Database System",
      lecturerName: "C.Chau",
      week: 1,
    },
  ]);

  const handleAddLabUsage = () => {
    setLabUsageFormOpened(true);
  };

  const handleSubmitAddLabUsage = () => {
    setLabUsageFormOpened(false);
  };

  const handleCancelAddLabUsage = () => {
    setLabUsageFormOpened(false);
  };

  return (
    <div className={classes.schedule}>
      <LabUsageForm
        isOpen={labUsageFormOpened}
        onCancel={handleCancelAddLabUsage}
        onSubmit={handleSubmitAddLabUsage}
      />
      <Grid container spacing={0}>
        <Grid className={classes.toolbarLeft} item container spacing={1} lg={7}>
          <Grid item xs={12} sm={"auto"}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddLabUsage}
            >
              Add lab usage
            </Button>
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <Button
              className={classes.button}
              variant="contained"
              style={{ backgroundColor: "#388E3C", color: "#fff" }}
              startIcon={<ImportExportIcon />}
            >
              Export lab usage
            </Button>
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <Button
              className={classes.button}
              variant="contained"
              style={{ backgroundColor: "#388E3C", color: "#fff" }}
              startIcon={<ImportExportIcon />}
            >
              Export theory room usage
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.toolbarRight} item lg={5}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Week</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              label="Week"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <Typography>From</Typography>
          <Typography color="secondary">Oct 1st, 2020</Typography>
          <Typography>to</Typography>
          <Typography color="secondary">Oct 2nd, 2020</Typography>
        </Grid>
        <Grid item xs={12}>
          <TimeTable labs={labs} labUsages={labUsages} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Schedule;
