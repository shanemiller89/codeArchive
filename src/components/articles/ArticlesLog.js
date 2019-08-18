import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";

export default class ArticlesLog extends Component {
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
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="newspaper"
            />
            Article Log
          </Header>
        </Container>
      </React.Fragment>
    );
  }
}
