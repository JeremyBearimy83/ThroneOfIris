import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, paletteName: "" };
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.props.hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <Picker />
          <ValidatorForm
            onSubmit={() => this.props.handleSave(this.state.paletteName)}
          >
            <DialogContent>
              <DialogContentText>
                Enter a name for your new custom palette. Make sure the name is
                unique!
              </DialogContentText>

              <TextValidator
                fullWidth
                margin="normal"
                placeholder="Palette Name   "
                onChange={this.handleFormChange}
                value={this.state.paletteName}
                name="paletteName"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "This field cannot be left blank!",
                  "Palette name should be unique",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
