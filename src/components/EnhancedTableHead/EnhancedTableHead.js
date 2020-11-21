import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./EnhancedTableHead.styles";

const EnhancedTableHead = (props) => {
  const { isAllowSort, orderBy, order, onCreateSortHandler } = props;

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            size="small"
            key={headCell.id}
            align={headCell.first ? "left" : "right"}
            padding={"default"}
          >
            {isAllowSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={onCreateSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  isAllowSort: PropTypes.bool.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onCreateSortHandler: PropTypes.func,
  center: PropTypes.bool,
};

export default EnhancedTableHead;
