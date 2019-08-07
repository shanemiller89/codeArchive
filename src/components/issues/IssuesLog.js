import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import IssuesList from "./IssuesList";
import IssueForm from "./IssueForm";
import { throwStatement } from "@babel/types";

// TODO: Refactor of Edit and Delete needed to edit and delete associated Archive

export default class IssuesLog extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    issueLogs: [],
    logArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("logs", `userId=${this.state.currentUser}&logTypeId=1`)
      .then(issueLogs => (newState.issueLogs = issueLogs))
      .then(() => this.setState(newState));
    API.getAll("logArchives", `_expand=archive&_expand=log`)
      .then(logArchives => (newState.logArchives = logArchives))
      .then(() => this.setState(newState));
  }

  // ADD ISSUE //
  addIssue = data => {
    return API.post("logs", data);
  };
  addArchive = data => {
    return API.post("archives", data);
  };
  addIssueArchive = data => {
    API.post("logArchives", data)
      .then(() => API.getAll("logArchives", `_expand=archive&_expand=log`))
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };
  // DELETE ISSUE //
  deleteIssue = (id1, id2) => {
    API.delete("logs", id1)
    .then(() => this.deleteArchive(id2))
  };
  deleteArchive = id => {
    API.delete("archives", id)
      .then(() => API.getAll("logArchives", `_expand=archive&_expand=log`))
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };

  // UPDATE ISSUE //
  updateIssue = (editedData1, editedData2) => {
    API.put("logs", editedData1)
    .then(() => this.updateArchive(editedData2))
  };
  updateArchive = editedData => {
    API.put("archives", editedData)
    .then(() => API.getAll("logArchives", `_expand=archive&_expand=log`))
    .then(logArchives =>
      this.setState({
        logArchives: logArchives
      })
    );
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
          {/* Add Issue Form */}
          <IssueForm
            addIssue={this.addIssue}
            addArchive={this.addArchive}
            addIssueArchive={this.addIssueArchive}
          />
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
          {this.state.logArchives
            .filter(
              issueArchive =>
                (issueArchive.log.logTypeId === 1) &
                (issueArchive.log.userId === this.state.currentUser)
            )
            .map(issueArchive => (
              <IssuesList
                key={issueArchive.archive.id}
                issueArchive={issueArchive}
                updateIssue={this.updateIssue}
                deleteIssue={this.deleteIssue}
              />
            ))}
        </div>
        <br />
      </React.Fragment>
    );
  }
}
