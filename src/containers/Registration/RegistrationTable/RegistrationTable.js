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
} from "@material-ui/core";
import useStyles from "./RegistrationTable.styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import EnhancedToolbar from "../../../components/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "../../../components/EnhancedTableHead/EnhancedTableHead";
import { withStyles } from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const RegistrationTable = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lecturerId");

  const headCells = [
    {
      id: "lecturerId",
      first: true,
      label: "Lecturer ID",
    },
    {
      id: "fullName",
      label: "Full name",
    },
    {
      id: "courseName",
      label: "Course name",
    },
    {
      id: "group",
      label: "Group",
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
    console.log(a);
    console.log(orderBy);
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
    Math.min(rowsPerPage, props.teachings.length - page * rowsPerPage);

  return (
    <div className={classes.registrationTable}>
      <Paper className={classes.paper}>
        <EnhancedToolbar title={"Registration"} registrationTable />
        <TableContainer>
          <SimpleBar style={{ maxHeight: 300 }}>
            <Table style={{ minWidth: 700 }} stickyHeader>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onCreateSortHandler={createSortHandler}
                headCells={headCells}
                isAllowSort={true}
              />
              <TableBody>
                {stableSort(props.teachings, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.lecturerId}>
                      <TableCell size="small" component="th" scope="row">
                        {row.lecturerId}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {row.fullName}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {row.courseName}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {row.group}
                      </TableCell>
                      <TableCell size="small" align="right">
                        <IconButton>
                          <MoreVertIcon fontSize={"small"} />
                        </IconButton>
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
          rowsPerPageOptions={[5, 10, 25]}
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

RegistrationTable.propTypes = {
  teachings: PropTypes.array.isRequired,
};

export default RegistrationTable;
