import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../../modules/API";
import SubLanguageForm from './SubLibraryForm'

export default class LanguageLibrary extends Component {
  state = {
    language: {}
  };

  componentDidMount() {
    const newState = {};
    API.get("libraries", `${this.props.match.params.languageLibraryId}`)
      .then(language => (newState.language = language))
      .then(() => this.setState(newState));
      console.log(newState)
  }

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
          <Header style={{ fontSize: "5em", color: "#15CA00" }}>{this.state.language.title}</Header>
          <a href={this.state.language.link} rel="noopener noreferrer" target="_blank"><Header as="h2">Documentation</Header></a>
        
          {/* <SubLanguageForm /> */}

        </Container>
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="file code outline" style={{ color: "#15CA00" }} />
            <Header.Content>
              Sub-Libraries
              <Header.Subheader>
                Frameworks and Libraries related to this Language
              </Header.Subheader>
            </Header.Content>
          </Header>
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
