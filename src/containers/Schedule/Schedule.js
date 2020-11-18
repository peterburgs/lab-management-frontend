import React, { useEffect, useState } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import TimeTable from "../../components/TimeTable/TimeTable";
import produce from "immer";

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState("");
  const [currentPos, setCurrentPos] = useState(0);

  const debounce = (fn, ms) => {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this);
      }, ms);
    };
  };

  useEffect(() => {
    const captureWindowSize = () => {
      if (window.innerWidth < 600 && windowSize !== "xs") {
        setWindowSize("xs");
        setCurrentPos(0);
      }
      if (
        window.innerWidth >= 600 &&
        window.innerWidth < 960 &&
        windowSize !== "sm"
      ) {
        setWindowSize("sm");
        setCurrentPos(0);
      }
      if (
        window.innerWidth >= 960 &&
        window.innerWidth < 1280 &&
        windowSize !== "md"
      ) {
        setWindowSize("md");
        setCurrentPos(0);
      }
      if (
        window.innerWidth >= 1280 &&
        window.innerWidth < 1920 &&
        windowSize !== "lg"
      ) {
        setWindowSize("lg");
        setCurrentPos(0);
      }
      if (window.innerWidth > 1920 && windowSize !== "xl") {
        setWindowSize("xl");
        setCurrentPos(0);
      }
    };
    captureWindowSize();

    const debounceHandleResize = debounce(() => {
      captureWindowSize();
    }, 500);

    window.addEventListener("resize", debounceHandleResize);

    return () => {
      window.removeEventListener("resize", debounceHandleResize);
    };
  }, [windowSize]);

  return [windowSize, currentPos, setCurrentPos];
};

const useSwipe = (windowSize, currentPos, setCurrentPos, labUsages) => {
  const [isPrev, setIsPrev] = useState(true);
  const [isNext, setIsNext] = useState(true);
  const [displayedDays, setDisplayedDays] = useState([]);
  const [displayedLabUsages, setDisplayedLabUsages] = useState([]);

  useEffect(() => {
    console.log(windowSize);
    if (windowSize === "sm" || windowSize === "xs") {
      const updatedDisplayedLabUsages = [];
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos)
      );

      setDisplayedLabUsages(updatedDisplayedLabUsages);

      const updatedDisplayedDays = [];
      updatedDisplayedDays.push(currentPos);

      setDisplayedDays(updatedDisplayedDays);

      setIsNext(currentPos < 5);
    }
    if (windowSize === "md") {
      const updatedDisplayedLabUsages = [];
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos)
      );
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos + 1)
      );

      setDisplayedLabUsages(updatedDisplayedLabUsages);

      const updatedDisplayedDays = [];
      updatedDisplayedDays.push(currentPos);
      updatedDisplayedDays.push(currentPos + 1);

      setDisplayedDays(updatedDisplayedDays);

      setIsNext(currentPos < 4);
    }
    if (windowSize === "lg" || windowSize === "xl") {
      const updatedDisplayedLabUsages = [];
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos)
      );
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos + 1)
      );
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos + 2)
      );
      updatedDisplayedLabUsages.push(
        labUsages.filter((labUsage) => labUsage.dayOfWeek === currentPos + 3)
      );

      setDisplayedLabUsages(updatedDisplayedLabUsages);

      const updatedDisplayedDays = [];
      updatedDisplayedDays.push(currentPos);
      updatedDisplayedDays.push(currentPos + 1);
      updatedDisplayedDays.push(currentPos + 2);
      updatedDisplayedDays.push(currentPos + 3);

      setDisplayedDays(updatedDisplayedDays);

      setIsNext(currentPos < 2);
    }
    setIsPrev(currentPos > 0);
  }, [currentPos, windowSize, labUsages]);

  const handleNext = () => {
    setCurrentPos((prevPos) => (prevPos += 1));
  };
  const handlePrev = () => {
    setCurrentPos((prevPos) => (prevPos -= 1));
  };

  return [
    handlePrev,
    handleNext,
    displayedLabUsages,
    isNext,
    isPrev,
    displayedDays,
  ];
};

const Schedule = () => {
  const classes = useStyles();
  const [labUsages, setLabUsages] = useState([
    {
      id: "1123",
      lab: "A3-102",
      dayOfWeek: 0,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Monday",
      lecturerName: "abc",
    },
    {
      id: "1124",
      lab: "A3-102",
      dayOfWeek: 0,
      startPeriod: 6,
      endPeriod: 8,
      courseName: "Monday",
      lecturerName: "abc",
    },
    {
      id: "1125",
      lab: "A3-102",
      dayOfWeek: 1,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Tuesday",
      lecturerName: "abc",
    },
    {
      id: "1126",
      lab: "A3-102",
      dayOfWeek: 2,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Wednesday",
      lecturerName: "abc",
    },
    {
      id: "1127",
      lab: "A3-102",
      dayOfWeek: 3,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Thursday",
      lecturerName: "abc",
    },
    {
      id: "1128",
      lab: "A3-102",
      dayOfWeek: 4,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Friday",
      lecturerName: "abc",
    },
    {
      id: "1129",
      lab: "A3-102",
      dayOfWeek: 5,
      startPeriod: 1,
      endPeriod: 3,
      courseName: "Saturday",
      lecturerName: "abc",
    },
  ]);

  const [windowSize, currentPos, setCurrentPos] = useWindowResize();
  const [
    handlePrev,
    handleNext,
    displayedLabUsages,
    isNext,
    isPrev,
    displayedDays,
  ] = useSwipe(windowSize, currentPos, setCurrentPos, labUsages);

  return (
    <div className={classes.schedule}>
      <Grid container spacing={0}>
        <Grid className={classes.toolbarLeft} item container spacing={1} lg={7}>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit lab usage
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              style={{ backgroundColor: "#388E3C", color: "#fff" }}
              startIcon={<ImportExportIcon />}
            >
              Export lab usage
            </Button>
          </Grid>
          <Grid item>
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
              // value={week}
              // onChange={handleChange}
              label="Week"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Week 1</MenuItem>
              <MenuItem value={2}>Week 2</MenuItem>
              <MenuItem value={3}>Week 3</MenuItem>
              <MenuItem value={4}>Week 4</MenuItem>
              <MenuItem value={5}>Week 5</MenuItem>
              <MenuItem value={6}>Week 6</MenuItem>
              <MenuItem value={7}>Week 7</MenuItem>
              <MenuItem value={8}>Week 8</MenuItem>
              <MenuItem value={9}>Week 9</MenuItem>
              <MenuItem value={10}>Week 10</MenuItem>
              <MenuItem value={11}>Week 11</MenuItem>
              <MenuItem value={12}>Week 12</MenuItem>
              <MenuItem value={13}>Week 13</MenuItem>
              <MenuItem value={14}>Week 14</MenuItem>
              <MenuItem value={15}>Week 15</MenuItem>
            </Select>
          </FormControl>
          <Typography>From Oct 1st, 2020 To Oct 6th, 2020</Typography>
        </Grid>
        <Grid item xs={12}>
          <TimeTable
            isPrev={isPrev}
            isNext={isNext}
            onPrev={handlePrev}
            onNext={handleNext}
            displayedDays={displayedDays}
            displayedLabUsages={displayedLabUsages}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Schedule;
