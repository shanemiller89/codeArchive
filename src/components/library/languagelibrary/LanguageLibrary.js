import React, { Component } from "react";
import { Container, Header, Icon, Responsive } from "semantic-ui-react";
import API from "../../../modules/API";
import SubLanguageLibraryList from "./SubLanguageLibraryList";
import SubLanguageLibraryForm from "./sublanguagelibrary/SubLanguageLibraryForm";
import LanguageArchiveList from "./LanguageArchivesList";
import LibraryArchiveForm from "../LibraryArchiveForm";
import LibraryArchiveSearchBar from "../LibraryArchiveSearchBar";

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
      .then(() => {
        this.setState(newState);
      });
    // Gets ALL sub languages associated with this language
    API.getAll(
      "libraries",
      `userId=${this.props.currentUser}&parent_library_id=${this.props.match.params.languageLibraryId}`
    )
      .then(
        subLanguageLibraries =>
          (newState.subLanguageLibraries = subLanguageLibraries)
      )
      .then(() => this.setState(newState));
    // Get Archives
    API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      .then(archives => (newState.languageArchives = archives.archives))
      .then(() => {
        this.setState(newState);
      });
  }

  // FOR CRUD OF SUB-LANGUAGE //

  addSubLanguageLibrary = data => {
    API.post("libraries", data)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.props.currentUser}&parent_library_id=${this.props.match.params.languageLibraryId}`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({
          subLanguageLibraries: subLanguageLibraries
        })
      );
  };

  deleteSubLanguageLibrary = id => {
    API.delete("libraries", id)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.props.currentUser}&parent_library_id=${this.props.match.params.languageLibraryId}`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({
          subLanguageLibraries: subLanguageLibraries
        })
      );
  };

  updateSubLanguageLibrary = editedData => {
    API.put("libraries", editedData)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.props.currentUser}&parent_library_id=${this.props.match.params.languageLibraryId}`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({ subLanguageLibraries: subLanguageLibraries })
      );
  };

  // FOR CRUD OF LANGUAGE ARCHIVES //

  addArchive = data => {
    return API.post("archives", data)
      .then(() =>
        API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      )
      .then(languageArchives =>
        this.setState({
          languageArchives: languageArchives.archives
        })
      );
  };

  addGoogleBookmark = data => {
    API.post("resources", data)
      .then(() =>
        API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      )
      .then(languageArchives =>
        this.setState({
          languageArchives: languageArchives.archives
        })
      );
  };

  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      )
      .then(languageArchives =>
        this.setState({
          languageArchives: languageArchives.archives
        })
      );
  };

  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      )
      .then(languageArchives =>
        this.setState({
          languageArchives: languageArchives.archives
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
          <Responsive minWidth={480}>
            <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
              <Icon style={{ color: "#15CA00" }} name="file code outline" />
              {this.state.language.title}
            </Header>
          </Responsive>
          <Responsive maxWidth={480}>
            <Header style={{ fontSize: "1.5em", margin: ".5em 0 1em 0" }}>
              <Icon style={{ color: "#15CA00" }} name="file code outline" />
              {this.state.language.title}
            </Header>
          </Responsive>
          <a
            href={this.state.language.link}
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
            libraryId={this.state.language.id}
            libraryTitle={this.state.language.title}
            addArchive={this.addArchive}
            addGoogleBookmark={this.addGoogleBookmark}
          />
          <LibraryArchiveSearchBar
            archives={this.state.languageArchives}
            style={{ marginTop: "1em" }}
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
          {this.state.languageArchives
            .sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            )
            .map(archive => (
              <LanguageArchiveList
                key={archive.id}
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
