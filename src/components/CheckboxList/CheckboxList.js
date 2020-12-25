import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import useStyles from "./CheckboxList.styles";

const CheckboxList = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.items.map((item) => {
        const labelId = `checkbox-list-label-${item.id}`;
        return (
          <ListItem
            key={item.id}
            role={undefined}
            dense
            button
            onClick={props.onSelectItem(item)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={
                  props.selectedItems.findIndex((e) => e.id === item.id) !== -1
                }
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${item.id} - ${item.name}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CheckboxList;
