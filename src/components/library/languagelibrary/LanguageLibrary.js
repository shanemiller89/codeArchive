import React, { Component } from "react";
import { Container, Header, Icon, Segment, Image, Divider } from "semantic-ui-react";
import API from "../../../modules/API";
import SubLanguageLibraryList from "./sublanguagelibrary/SubLanguageLibraryList"
import SubLanguageLibraryForm from "./sublanguagelibrary/SubLanguageLibraryForm";

export default class LanguageLibrary extends Component {
  state = {
    language: [],
    subLanguageLibraries: []
  };

  // TODO:Figure out why there is a render delay

  componentDidMount() {
    const newState = {};
    API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      .then(language => (newState.language = language))
      .then(() => this.setState(newState));
      API.getAll("subLanguageLibraries", `userId=${this.props.currentUser}&libraryId=${this.props.match.params.languageLibraryId}`)
      .then(subLanguageLibraries => (newState.subLanguageLibraries = subLanguageLibraries))
      .then(() => this.setState(newState));
  }

  addSubLanguageLibrary = data => {
    API.post("subLanguageLibraries", data)
      .then(() =>
        API.getAll(
          "subLanguageLibraries",
          `userId=${this.props.currentUser}&libraryId=${this.props.match.params.languageLibraryId}`
        )
      )
      .then(subLanguageLibraries =>
        this.setState({
          subLanguageLibraries: subLanguageLibraries
        })
      );
  };

  render() {
    console.log("Are you here?", this.props.language);
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "20em",
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
          <SubLanguageLibraryForm languageId={this.state.language.id} currentUser={this.props.currentUser} addSubLanguageLibrary={this.addSubLanguageLibrary} />
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
      </React.Fragment>
    );
  }
}
