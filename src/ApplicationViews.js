import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";

export default class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/"
          render={props => {
            return (
              <Home
                {...props}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
