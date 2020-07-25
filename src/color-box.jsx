import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";

import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.handleCopyOverlay = this.handleCopyOverlay.bind(this);
  }
  handleCopyOverlay() {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 1500)
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <CopyToClipboard text={this.props.color} onCopy={this.handleCopyOverlay}>
        <div
          className={classes.colorBox}
          style={
            this.props.goBack
              ? { backgroundColor: "black" }
              : { backgroundColor: this.props.color }
          }
        >
          <div
            className={`${classes.copyOverlay} ${
              this.state.copied ? classes.show : ""
            }`}
            style={{
              backgroundColor: this.props.color,
              border: `5px solid ${this.props.color}`,
            }}
          />
          <div
            className={`${classes.copyMessage} ${
              this.state.copied ? classes.copyMessageShow : ""
            }`}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.color}</p>
          </div>

          <button className={classes.copyButton}>copy</button>
          <span className={classes.colorName}>{this.props.name}</span>
          {!this.props.singleColor && (
            <Link to={this.props.moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.more}>more</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
