import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./draggable-color-list";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./palette-form-nav";
import ColorPickerForm from "./color-picker-form";
const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 88px)",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
    };
    this.addColor = this.addColor.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addRandom = this.addRandom.bind(this);
  }
  addRandom() {
    const allColors = this.props.palettes.map((color) => color.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    this.setState({ colors: [...this.state.colors, allColors[rand]] });
  }
  handleDelete(name) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== name),
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  handleSave(paletteName) {
    const newPalette = {
      paletteName: paletteName,
      colors: this.state.colors,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }
  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addColor(currentColor) {
    const newColor = {
      color: currentColor.color,
      name: currentColor.name,
    };
    this.setState({ colors: [...this.state.colors, newColor] });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, palettes } = this.props;
    const { open } = this.state;
    const isPaletteFull = this.state.colors.length >= 20;

    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSave={this.handleSave}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Typography variant="h4"> Design Your Palette</Typography>
          <Divider />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ colors: [] })}
            >
              CLEAR PALETTE
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.addRandom}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            colors={this.state.colors}
            addColor={this.addColor}
          />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={this.state.colors}
            handleDelete={this.handleDelete}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}
NewPaletteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
