import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Segment,
  Image,
  Divider
} from "semantic-ui-react";
import API from "../../../modules/API";
import SubLanguageLibraryList from "./sublanguagelibrary/SubLanguageLibraryList";
import SubLanguageLibraryForm from "./sublanguagelibrary/SubLanguageLibraryForm";
import LibraryArchiveList from "../../../widgets/archives/LibraryArchivesList";
import LibraryArchiveForm from "../../../widgets/archives/LibraryArchiveForm";

export default class LanguageLibrary extends Component {
  state = {
    language: [],
    subLanguageLibraries: [],
    languageArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      .then(language => (newState.language = language))
      .then(() => this.setState(newState));
    // Gets ALL sub languages associated with this language
    API.getAll(
      "subLanguageLibraries",
      `userId=${this.props.currentUser}&libraryId=${
        this.props.match.params.languageLibraryId
      }`
    )
      .then(
        subLanguageLibraries =>
          (newState.subLanguageLibraries = subLanguageLibraries)
      )
      .then(() => this.setState(newState));
    // Gets ALL archives associated with this language
    API.getAll(
      "libraryArchives",
      `_expand=archive&libraryId=${this.props.match.params.languageLibraryId}`
    )
      .then(languageArchives => (newState.languageArchives = languageArchives))
      .then(() => this.setState(newState));
  }

  // FOR CRUD OF SUB-LANGUAGE //

  addSubLanguageLibrary = data => {
    API.post("subLanguageLibraries", data)
      .then(() =>
        API.getAll(
          "subLanguageLibraries",
          `userId=${this.props.currentUser}&libraryId=${
            this.props.match.params.languageLibraryId
          }`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({
          subLanguageLibraries: subLanguageLibraries
        })
      );
  };

  deleteSubLanguageLibrary = id => {
    API.delete("subLanguageLibraries", id)
      .then(() =>
        API.getAll(
          "subLanguageLibraries",
          `userId=${this.props.currentUser}&libraryId=${
            this.props.match.params.languageLibraryId
          }`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({
          subLanguageLibraries: subLanguageLibraries
        })
      );
  };

  updateSubLanguageLibrary = editedData => {
    API.put("subLanguageLibraries", editedData)
      .then(() =>
        API.getAll(
          "subLanguageLibraries",
          `userId=${this.props.currentUser}&libraryId=${
            this.props.match.params.languageLibraryId
          }`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({ subLanguageLibraries: subLanguageLibraries })
      );
  };

  // FOR CRUD OF LANGUAGE ARCHIVES //

  addArchive = data => {
    API.post("archives", data)
  };
  addLibraryArchive = data => {
    API.post("libraryArchives", data)
      .then(() =>
        API.getAll(
          "libraryArchives",
          `_expand=archive&libraryId=${
            this.props.match.params.languageLibraryId
          }`
        )
      )
      .then(languageArchives =>
        this.setState({
          languageArchives: languageArchives
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "25em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", color: "#15CA00" }}>
            {this.state.language.title}
          </Header>
          <a
            href={this.state.language.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Header as="h1">Documentation</Header>
          </a>
          <br />
          {/* Add Sub Language Form */}
          <SubLanguageLibraryForm
            languageId={this.state.language.id}
            currentUser={this.props.currentUser}
            addSubLanguageLibrary={this.addSubLanguageLibrary}
          />
          <br />
          <br />
          {/* Add Language Archive Form */}
          <LibraryArchiveForm
            languageId={this.state.language.id}
            addArchive={this.addArchive}
            addLibraryArchive={this.addLibraryArchive}
          />
        </Container>
        {/* Sub-Languages */}
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="file code outline" style={{ color: "#15CA00" }} />
          <Header.Content>
            Sub-Language Libraries
            <Header.Subheader>
              Frameworks and Libraries related to this Language
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.subLanguageLibraries.map(subLanguage => (
            <SubLanguageLibraryList
              key={subLanguage.id}
              subLanguage={subLanguage}
              updateSubLanguageLibrary={this.updateSubLanguageLibrary}
              deleteSubLanguageLibrary={this.deleteSubLanguageLibrary}
            />
          ))}
        </div>
        {/* Archives */}
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="archive" style={{ color: "#15CA00" }} />
          <Header.Content>
            Archives
            <Header.Subheader>
              Concepts and other information relating to this Language
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.languageArchives.map(archive => (
            <LibraryArchiveList
              key={archive.archive.id}
              archive={archive}
              // updateSubLanguageLibrary={this.updateSubLanguageLibrary}
              // deleteSubLanguageLibrary={this.deleteSubLanguageLibrary}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
