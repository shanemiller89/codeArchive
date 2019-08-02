import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Library from "./components/library/Library";
import LanguageLibrary from "./components/library/languagelibrary/LanguageLibrary";
import API from "./modules/API";

export default class ApplicationViews extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user"))
  };
  // updateLanguage = editedData => {
  //   API.put("languages", editedData)
  //     .then(() => API.getAll("languages", `userId=${this.state.currentUser}`))
  //     .then(languages => this.setState({ languages: languages }));
  // };

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
        {/* <Route
          exact path="/library/language/:languageId(\d+)"
          render={props => {
            let language = this.state.languages.find( language =>
              language.id === parseInt(props.match.params.languageId))
              console.log("this is language", language)
            return (
              <LanguageLibrary
                {...props}
                currentUser={this.state.currentUser}
              />
            );
          }}
        /> */}
      </React.Fragment>
    );
  }
}
