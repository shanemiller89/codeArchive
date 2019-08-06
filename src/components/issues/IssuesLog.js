import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API"
import IssuesList from "./IssuesList"
import IssueForm from "./IssueForm"

export default class IssuesLog extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    issueLogs: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("logs", `userId=${this.state.currentUser}&logTypeId=1`)
      .then(
        issueLogs => (newState.issueLogs = issueLogs)
      )
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
            Issues Log
          </Header>
          <IssueForm />
        </Container>
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="dont" style={{ color: "#15CA00" }} />
          <Header.Content>
            Issue Archives
            <Header.Subheader>
              Logs of Errors and the solutions to them
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
        {this.state.issueLogs.map(issue => (
            <IssuesList 
              key={issue.id}
              issue={issue}
              updateSubLanguageLibrary={this.updateSubLanguageLibrary}
              deleteSubLanguageLibrary={this.deleteSubLanguageLibrary}
            />
          ))}
        </div>
        <br />
      </React.Fragment>
    );
  }
}
