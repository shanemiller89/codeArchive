import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Library from "./components/library/Library";
import API from './modules/API'

export default class ApplicationViews extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    languages: []
  }
  componentDidMount() {
    const newState = {} 
    API.getAll("languages", `userId=${this.state.currentUser}`)
      .then(languages => newState.languages = languages)
      .then(() => this.setState(newState))
      console.log(newState)
  }


  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/"
          render={props => {
            return <Home {...props} />;
          }}
        />
        <Route
          path="/library"
          render={props => {
            return <Library {...props} languages={this.state.languages} />;
          }}
        />
      </React.Fragment>
    );
  }
}
