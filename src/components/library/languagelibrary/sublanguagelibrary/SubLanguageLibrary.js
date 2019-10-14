import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../../../modules/API";
import SubLanguageArchiveList from "./SubLanguageArchivesList";
import LibraryArchiveForm from "../../LibraryArchiveForm";
import LibraryArchiveSearchBar from "../../LibraryArchiveSearchBar";

export default class SubLanguageLibrary extends Component {
  state = {
    subLanguage: [],
    subLanguageArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      .then(subLanguage => (newState.subLanguage = subLanguage))
      .then(() => this.setState(newState));
    // ALL SUB LANGUAGE ARCHIVES //
    API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      .then(archives => (newState.subLanguageArchives = archives.archives))
      .then(() => {
        this.setState(newState);
      });
  }

  // CRUD FOR SUB LANGUAGE ARCHIVE //
  addArchive = data => {
    return API.post("archives", data)
      .then(() =>
        API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives.archives
        })
      );
  };

  addGoogleBookmark = data => {
    API.post("resources", data)
      .then(() =>
        API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives.archives
        })
      );
  };

  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives.archives
        })
      );
  };

  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.get("libraries", `${this.props.match.params.subLanguageLibraryId}`)
      )
      .then(subLanguageArchives =>
        this.setState({
          subLanguageArchives: subLanguageArchives.archives
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
          <LibraryArchiveForm
            libraryId={this.state.subLanguage.id}
            libraryTitle={this.state.subLanguage.title}
            addArchive={this.addArchive}
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
          {this.state.subLanguageArchives
            .sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            )
            .map(archive => (
              <SubLanguageArchiveList
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
