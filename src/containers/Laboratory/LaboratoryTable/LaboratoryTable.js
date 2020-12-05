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
import { Link } from "react-router-dom";
import useStyles from "./LaboratoryTable.styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import EnhancedToolbar from "../../../hoc/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "../../../components/EnhancedTableHead/EnhancedTableHead";
import { withStyles } from "@material-ui/core/styles";
import SimpleBar from "simplebar-react";
import AddIcon from "@material-ui/icons/Add";

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: `rgba(26, 115, 232, 0.1)`,
    },
  },
}))(TableRow);

const LaboratoryTable = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const openActionMenu = Boolean(actionMenuAnchorEl);

  const headCells = [
    {
      id: "#",
      label: "#",
    },
    {
      id: "name",
      label: "name",
    },
    {
      id: "capacity",
      isNumber: true,
      label: "Capacity",
    },
    {
      id: "createdAt",
      label: "Created At",
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
    Math.min(rowsPerPage, props.labs.length - page * rowsPerPage);

  // handle open menu context when clicking account icon
  const handleOpenActionMenu = (event) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  // handle close menu context when clicking account icon
  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  return (
    <div className={classes.labTable}>
      <Paper className={classes.paper}>
        <EnhancedToolbar title={"Laboratories"}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={props.onAddLab}
          >
            New lab
          </Button>
        </EnhancedToolbar>
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
                {stableSort(props.labs, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={row.id} className={classes.row}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <Link to="/laboratories/id">{row.name}</Link>
                      </TableCell>
                      <TableCell align="center">{row.capacity}</TableCell>
                      <TableCell align="left">{row.createdAt}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={handleOpenActionMenu}
                          style={{ padding: 0 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
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
                          open={openActionMenu}
                          onClose={handleActionMenuClose}
                        >
                          <MenuItem
                            onClick={() => {
                              props.onEditClick();
                              setActionMenuAnchorEl(null);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              props.onDeleteClick();
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.labs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

LaboratoryTable.propTypes = {
  labs: PropTypes.array.isRequired,
  onAddLab: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default LaboratoryTable;
