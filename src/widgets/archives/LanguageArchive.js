import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";

export default class LanguageArchive extends Component {
  state = {
    languageArchive: []
  };

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.languageArchiveId}`)
      .then(languageArchive => (newState.languageArchive = languageArchive))
      .then(() => this.setState(newState));
  }

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
            {this.state.languageArchive.title}
          </Header>
          <a
            href={this.state.languageArchive.link}
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
          {/* <br /> */}
          {/* Add Sub Language Form */}

          {/* <br />
          <br /> */}
          {/* Add Language Archive Form */}
        </Container>
      </React.Fragment>
    );
  }
}
