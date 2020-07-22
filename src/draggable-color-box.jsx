import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3.5px",
    backgroundColor: (props) => props.color,
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
};
const DraggableColorBox = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon className={classes.delete} />
      </div>
    </div>
  );
};
export default withStyles(styles)(DraggableColorBox);
