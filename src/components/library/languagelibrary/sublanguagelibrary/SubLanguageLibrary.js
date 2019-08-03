import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Segment,
  Image,
  Divider
} from "semantic-ui-react";
import API from "../../../../modules/API";

export default class SubLanguageLibrary extends Component {
  state = {
    subLanguage: [],
  };

  // TODO:Figure out why there is a render delay

  componentDidMount() {
    const newState = {};
    API.get("subLanguageLibraries", `${this.props.match.params.subLanguageLibraryId}`)
      .then(subLanguage => (newState.subLanguage = subLanguage))
      .then(() => this.setState(newState));
  }

  render() {
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
            {this.state.subLanguage.title}
          </Header>
          <a
            href={this.state.subLanguage.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Header as="h1">Documentation</Header>
          </a>
          <br />
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
      </React.Fragment>
    );
  }
}
