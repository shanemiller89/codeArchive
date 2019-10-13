import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../../../modules/API";
import SubLanguageArchiveList from "./SubLanguageArchivesList";
import SubLanguageArchiveForm from "./SubLanguageArchiveForm";
import LibraryArchiveSearchBar from "../../LibraryArchiveSearchBar";

export default class SubLanguageLibrary extends Component {
  state = {
    subLanguage: [],
    subLanguageArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.get(
      "libraries",
      `${this.props.match.params.subLanguageLibraryId}`
    )
      .then(subLanguage => (newState.subLanguage = subLanguage))
      .then(() => this.setState(newState));
    // ALL SUB LANGUAGE ARCHIVES //
    API.getAll(
      "subLibraryArchives",
      `_expand=archive&subLanguageLibraryId=${this.props.match.params.subLanguageLibraryId}`
    )
      .then(
        subLanguageArchives =>
          (newState.subLanguageArchives = subLanguageArchives)
      )
      .then(() => this.setState(newState));
  }

  // CRUD FOR SUB LANGUAGE ARCHIVE //

  addArchive = data => {
    return API.post("archives", data);
  };
  addSubLanguageArchive = data => {
    API.post("subLibraryArchives", data)
      .then(() =>
        API.getAll(
          "subLibraryArchives",
          `_expand=archive&subLanguageLibraryId=${this.props.match.params.subLanguageLibraryId}`
        )
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives
        })
      );
  };

  addGoogleBookmark = data => {
    API.post("resources", data);
  };

  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.getAll(
          "subLibraryArchives",
          `_expand=archive&subLanguageLibraryId=${this.props.match.params.subLanguageLibraryId}`
        )
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives
        })
      );
  };

  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.getAll(
          "subLibraryArchives",
          `_expand=archive&subLanguageLibraryId=${this.props.match.params.subLanguageLibraryId}`
        )
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "21em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon style={{ color: "#15CA00" }} name="file code outline" />
            {this.state.subLanguage.title}
          </Header>
          <a
            href={this.state.subLanguage.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Header as="h1">
              <Icon
                name="linkify"
                style={{ fontSize: "1em", color: "#15CA00" }}
              />
              <Header.Content>Documentation</Header.Content>
            </Header>
          </a>
          <br />
          <SubLanguageArchiveForm
            subLanguageId={this.state.subLanguage.id}
            subLanguageTitle={this.state.subLanguage.title}
            addArchive={this.addArchive}
            addSubLanguageArchive={this.addSubLanguageArchive}
            addGoogleBookmark={this.addGoogleBookmark}
          />
          <LibraryArchiveSearchBar
            archives={this.state.subLanguageArchives}
            style={{ marginTop: "1em" }}
          />
        </Container>
        {/* Archives */}
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="archive" style={{ color: "#15CA00" }} />
          <Header.Content>
            Archives
            <Header.Subheader>
              Concepts and other information relating to this Sub-Language
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.subLanguageArchives.sort((a, b) => (a.archive.title.toLowerCase() > b.archive.title.toLowerCase()) ? 1 : -1).map(archive => (
            <SubLanguageArchiveList
              key={archive.archive.id}
              archive={archive}
              updateArchive={this.updateArchive}
              deleteArchive={this.deleteArchive}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
