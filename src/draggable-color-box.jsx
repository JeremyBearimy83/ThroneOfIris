import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-4.77px",
    backgroundColor: (props) => props.color,
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  delete: {
    transition: "all 0.3s ease-in-out",
    position: "relative",
    right: "20px",
  },
};
const DraggableColorBox = SortableElement((props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon onClick={props.handleDelete} className={classes.delete} />
      </div>
    </div>
  );
});
export default withStyles(styles)(DraggableColorBox);
