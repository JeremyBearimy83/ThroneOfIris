import React, { Component } from "react";
import Palette from "./palette.jsx";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import defaultPaletteData from "./default-palette-data";
import { generatePalette } from "./color-shades-generator";
import PaletteList from "./palette-list.jsx";
import SingleColorPalette from "./single-color-palette.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.getPalette = this.getPalette.bind(this);
  }
  getColor(props) {
    const colorName = props.match.params.colorName;
    const id = props.match.params.id;
    const currentPalette = defaultPaletteData.find((el) => el.id === id);
    const paletteData = generatePalette(currentPalette);
    let color = {};
    const singleColor = [];
    let shadeArray;
    for (let i = 0; i < 20; i++) {
      color = {};
      for (const shade in paletteData.colors) {
        shadeArray = paletteData.colors[shade];
        color[shade] = shadeArray[i];
      }
      singleColor.push(color);
    }
    const currentColor = singleColor.find((el) => el[50].id === colorName);
    return <SingleColorPalette {...currentColor} paletteId={id} />;
  }
  getPalette(props) {
    let id = props.match.params.id;
    const currentPalette = defaultPaletteData.find((el) => el.id === id);
    const paletteData = generatePalette(currentPalette);
    return <Palette palette={paletteData} />;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <PaletteList {...routeProps} />}
          />

          <Route exact path="/palette/:id" render={this.getPalette}></Route>
          <Route
            exact
            path="/palette/:id/more/:colorName"
            render={this.getColor}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
