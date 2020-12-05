import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableRow,
  TablePagination,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./RequestTable.styles";
import PropTypes from "prop-types";
import EnhancedToolbar from "../../../hoc/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "../../../components/EnhancedTableHead/EnhancedTableHead";
import { withStyles } from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: `rgba(26, 115, 232, 0.1)`,
    },
  },
}))(TableRow);

const CourseTable = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const headCells = [
    {
      id: "#",
      label: "#",
    },
    {
      id: "id",
      label: "ID",
    },
    {
      id: "content",
      label: "Request Content",
    },
    {
      id: "lecturer",
      label: "Lecturer",
    },
    {
      id: "openDate",
      label: "Open date",
    },
    {
      id: "status",
      label: "Status",
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
    Math.min(rowsPerPage, props.requests.length - page * rowsPerPage);

  return (
    <div className={classes.requestTable}>
      <Paper className={classes.paper}>
        <EnhancedToolbar title={"Requests"} />
        <TableContainer>
          <SimpleBar style={{ maxHeight: 400 }}>
            <Table style={{ minWidth: 700 }} stickyHeader>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onCreateSortHandler={createSortHandler}
                headCells={headCells}
                isAllowSort={true}
              />
              <TableBody>
                {stableSort(props.requests, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={row.id} className={classes.row}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">
                        <Link to="/requests/id">{row.content}</Link>
                      </TableCell>
                      <TableCell align="left">{row.lecturer}</TableCell>
                      <TableCell align="left">{row.openDate}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="center">
                        <Button onClick={props.onResolve} variant="contained" color="secondary">Resolve</Button>
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
          count={props.requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

CourseTable.propTypes = {
  requests: PropTypes.array.isRequired,
  onResolve: PropTypes.func.isRequired,
};

export default CourseTable;
