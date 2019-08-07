import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Library from "./components/library/Library";
import LanguageLibrary from "./components/library/languagelibrary/LanguageLibrary";
import SubLanguageLibrary from "./components/library/languagelibrary/sublanguagelibrary/SubLanguageLibrary";
import API from "./modules/API";
import LanguageArchive from "./widgets/archives/language/LanguageArchive";
import IssuesLog from "./components/issues/IssuesLog";
import IssueArchive from "./widgets/archives/logs/IssueArchive";

export default class ApplicationViews extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    languageLibraries: [],
    subLanguageLibraries: [],
    languageArchives: [],
    issueLogs: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("libraries", `userId=${this.state.currentUser}&libraryTypeId=1`)
      .then(
        languageLibraries => (newState.languageLibraries = languageLibraries)
      )
      .then(() => this.setState(newState));
    API.getAll("subLanguageLibraries", `userId=${this.state.currentUser}`)
      .then(
        subLanguageLibraries =>
          (newState.subLanguageLibraries = subLanguageLibraries)
      )
      .then(() => this.setState(newState));
    API.getAll("libraryArchives", `_expand=archive`)
      .then(languageArchives => (newState.languageArchives = languageArchives))
      .then(() => this.setState(newState));
    API.getAll("logs", `userId=${this.state.currentUser}&logTypeId=1`)
      .then(issueLogs => (newState.issueLogs = issueLogs))
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
              language =>
                language.id === parseInt(props.match.params.languageLibraryId)
            );
            return (
              <LanguageLibrary
                {...props}
                currentUser={this.state.currentUser}
              />
            );
          }}
        />
        <Route
          exact
          path="/library/language/sublanguage/:subLanguageLibraryId(\d+)"
          render={props => {
            this.state.subLanguageLibraries.find(
              subLanguage =>
                subLanguage.id ===
                parseInt(props.match.params.subLanguageLibraryId)
            );
            return (
              <SubLanguageLibrary
                {...props}
                currentUser={this.state.currentUser}
              />
            );
          }}
        />
        <Route
          exact
          path="/library/archive/:languageArchiveId(\d+)"
          render={props => {
            this.state.languageArchives.find(
              languageArchive =>
                languageArchive.archive.id ===
                parseInt(props.match.params.subLanguageLibraryId)
            );
            return (
              <LanguageArchive
                {...props}
                // languageArchive={this.state.languageArchive}
              />
            );
          }}
        />
        <Route
          exact
          path="/issues"
          render={props => {
            return <IssuesLog {...props} />;
          }}
        />
        <Route
          exact
          path="/issues/archive/:issueLogId(\d+)"
          render={props => {
            this.state.issueLogs.find(
              issueLog =>
                issueLog.id === parseInt(props.match.params.issueLogId)
            );
            return (
              <IssueArchive
                {...props}
                // languageArchive={this.state.languageArchive}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
