import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Library from "./components/library/Library";
import LanguageLibrary from "./components/library/languagelibrary/LanguageLibrary";
import API from "./modules/API";

export default class ApplicationViews extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    languageLibraries: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("libraries", `userId=${this.state.currentUser}&libraryTypeId=1`)
      .then(
        languageLibraries => (newState.languageLibraries = languageLibraries)
      )
      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Home {...props} />;
          }}
        />
        <Route
          exact
          path="/library"
          render={props => {
            return <Library {...props} />;
          }}
        />
        <Route
          exact
          path="/library/language/:languageLibraryId(\d+)"
          render={props => {
            this.state.languageLibraries.find(
              language => language.id === parseInt(props.match.params.languageLibraryId)
            );
            return (
              <LanguageLibrary
                {...props}
                currentUser={this.state.currentUser}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
