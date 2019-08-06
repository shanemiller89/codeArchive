import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";

export default class IssuesLog extends Component {
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
            Issues Log
          </Header>
        </Container>
      </React.Fragment>
    );
  }
}
