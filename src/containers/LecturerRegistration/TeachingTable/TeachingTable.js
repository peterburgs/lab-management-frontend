import React, { useState } from "react";
import {
  IconButton,
  Paper,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableRow,
  TablePagination,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  setTeachingIdToEdit,
  setTeachingIdToDelete,
} from "../LecturerRegistrationSlice";
import useStyles from "./TeachingTable.styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EnhancedToolbar from "../../../hoc/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "../../../components/EnhancedTableHead/EnhancedTableHead";
import { withStyles } from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: `rgba(26, 115, 232, 0.1)`,
    },
  },
}))(TableRow);

const TeachingTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("courseName");

  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);

  const headCells = [
    {
      id: "#",
      label: "#",
    },

    {
      id: "courseId",
      label: "Course ID",
    },
    {
      id: "courseName",
      label: "Course Name",
    },
    {
      id: "group",
      isNumber: true,
      label: "Group",
    },
    {
      id: "period",
      label: "Period",
    },
    {
      id: "credit",
      isNumber: true,
      label: "Credit",
    },

    {
      id: "numberOfStudents",
      isNumber: true,
      label: "Number of Students",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      props.teachings.length - page * rowsPerPage
    );

  // handle open menu context when clicking account icon
  const handleOpenActionMenu = (event) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  // handle close menu context when clicking account icon
  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  return (
    <div className={classes.teachingTable}>
      <Paper className={classes.paper}>
        <EnhancedToolbar title={"Teachings"}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={props.onAddTeaching}
          >
            New Teaching
          </Button>
        </EnhancedToolbar>
        <TableContainer>
          <SimpleBar style={{ maxHeight: "calc(100% - 10px)" }}>
            <Table style={{ minWidth: 700 }} stickyHeader>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onCreateSortHandler={createSortHandler}
                headCells={headCells}
                isAllowSort={true}
              />
              <TableBody>
                {stableSort(
                  props.teachings,
                  getComparator(order, orderBy)
                )
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => (
                    <StyledTableRow
                      key={row._id}
                      className={classes.row}
                    >
                      <TableCell component="th" scope="row">
                        {rowsPerPage * page + index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          style={{
                            color: "#d7385e",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            dispatch(setTeachingIdToEdit(row._id));
                            console.log(row);
                          }}
                        >
                          {row.course._id}
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        {row.course.courseName}
                      </TableCell>

                      <TableCell align="center">
                        {row.group}
                      </TableCell>
                      <TableCell align="left">
                        {row.startPeriod}&nbsp;&#8594;&nbsp;
                        {row.endPeriod}
                      </TableCell>
                      <TableCell align="center">
                        {row.course.numberOfCredits}
                      </TableCell>
                      <TableCell align="center">
                        {row.numberOfStudents}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          id={`${row._id}-menu`} // <-- Magic code
                          onClick={handleOpenActionMenu}
                          style={{ padding: 0 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={actionMenuAnchorEl}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={
                            actionMenuAnchorEl
                              ? actionMenuAnchorEl.id ===
                                `${row._id}-menu`
                              : false
                          } // <-- Magic code
                          onClose={handleCloseActionMenu}
                        >
                          <MenuItem
                            onClick={() => {
                              dispatch(setTeachingIdToEdit(row._id));
                              setActionMenuAnchorEl(null);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              dispatch(
                                setTeachingIdToDelete(row._id)
                              );
                              setActionMenuAnchorEl(null);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SimpleBar>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={props.teachings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TeachingTable;
