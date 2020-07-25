import React, { Component } from "react";
import ColorBox from "./color-box";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/SingleColorPaletteStyles";
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(format) {
    this.setState({ format: format });
  }
  render() {
    const { classes } = this.props;
    const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    const colorBoxes = shades.map((shade) => (
      <ColorBox
        singleColor={true}
        color={this.props[shade][this.state.format]}
        name={this.props[shade].name}
      />
    ));
    console.log(this.props[50]);
    return (
      <div className={classes.singleColorPalette}>
        <Navbar
          singleColor={true}
          format={this.state.format}
          handleFormat={this.changeFormat}
        />

        <div className={classes.colorBoxContainer}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${this.props.palette.id}`}>
              <div>
                <span>GO BACK</span>
              </div>
            </Link>
          </div>
        </div>
        <footer className={classes.footer}>
          {this.props.palette.paletteName}
          <span className={classes.icon}>{this.props.palette.emoji}</span>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
