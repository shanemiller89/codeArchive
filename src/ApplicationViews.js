import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Library from "./components/library/Library";
import LanguageLibrary from "./components/library/languagelibrary/LanguageLibrary";
import SubLanguageLibrary from "./components/library/languagelibrary/sublanguagelibrary/SubLanguageLibrary";
import ToolLibrary from "./components/library/toollibrary/ToolLibrary";
import API from "./modules/API";
import Archive from "./widgets/archives/Archive";
import IssuesLog from "./components/issues/IssuesLog";
import CodeLog from "./components/code/CodeLog";
import ArticlesLog from "./components/articles/ArticlesLog"

export default class ApplicationViews extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    languageLibraries: [],
    toolLibraries: [],
    subLanguageLibraries: [],
    languageArchives: [],
    logArchives: []
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
    API.getAll("libraries", `userId=${this.state.currentUser}&libraryTypeId=2`)
      .then(toolLibraries => (newState.toolLibraries = toolLibraries))
      .then(() => this.setState(newState));
    API.getAll("libraryArchives", `_expand=archive`)
      .then(languageArchives => (newState.languageArchives = languageArchives))
      .then(() => this.setState(newState));
    API.getAll("logArchives", `_expand=archive`)
      .then(logArchives => (newState.logArchives = logArchives))
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
          path="/library/tool/:toolLibraryId(\d+)"
          render={props => {
            this.state.toolLibraries.find(
              tool => tool.id === parseInt(props.match.params.toolLibraryId)
            );
            return (
              <ToolLibrary {...props} currentUser={this.state.currentUser} />
            );
          }}
        />
        <Route
          exact
          path="/library-archive/:ArchiveId(\d+)"
          render={props => {
            this.state.languageArchives.find(
              languageArchive =>
                languageArchive.archive.id ===
                parseInt(props.match.params.ArchiveId)
            );
            return <Archive {...props} />;
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
          path="/issue-log-archive/:ArchiveId(\d+)"
          render={props => {
            this.state.logArchives.find(
              logArchive =>
                logArchive.archive.id === parseInt(props.match.params.ArchiveId)
            );
            return <Archive {...props} />;
          }}
        />
        <Route
          exact
          path="/code"
          render={props => {
            return <CodeLog {...props} />;
          }}
        />
        <Route
          exact
          path="/code-log-archive/:ArchiveId(\d+)"
          render={props => {
            this.state.logArchives.find(
              logArchive =>
                logArchive.archive.id === parseInt(props.match.params.ArchiveId)
            );
            return <Archive {...props} />;
          }}
        />
        <Route
          exact
          path="/articles"
          render={props => {
            return <ArticlesLog {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}
