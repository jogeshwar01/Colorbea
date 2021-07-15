import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette"
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors"
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";

class App extends Component {
  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };   //if nothing in localStorage then only use seedColors

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage     //passed syncLocalStorage as a callback so that it is called after setState is done
    );
  }

  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={routeProps => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />

        <Route
          exact
          path='/'
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )}
        />

        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />

        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}   //to know which color are we displaying
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />

      </Switch>

      // <div>
      //   <Palette palette={generatePalette(seedColors[1])} />
      // </div>
    );
  }
}

export default App;