import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import IssuesList from "./IssuesList";
import IssueForm from "./IssueForm";
import IssuesSearchBar from "./IssuesSearchBar";

export default class IssuesLog extends Component {
  state = {
    logArchives: [],
  };

  componentDidMount() {
    const newState = {};
    API.getAll("logs", `log_type_id=1`)
      .then(logArchives => (newState.logArchives = logArchives))
      .then(() => this.setState(newState));
  }

  // ADD ISSUE //
  addIssue = data => {
    API.post("logs", data)
      .then(() =>
        API.getAll("logs", `log_type_id=1`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };
  // DELETE ISSUE //
  deleteIssue = (id1, id2) => {
    API.delete("logs", id1).then(() => this.deleteArchive(id2));
  };
  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.getAll("logs", `log_type_id=1`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };

  // UPDATE ISSUE //
  updateIssue = (editedData1, editedData2) => {
    API.put("logs", editedData1).then(() => this.updateArchive(editedData2));
  };
  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.getAll("logs", `log_type_id=1`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };

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
          <Header style={{ fontSize: "5em", marginTop: ".1em"}}>
            <Icon style={{color: "#15CA00"}} name="dont" />
            Issue Log
          </Header>
          {/* Add Issue Form */}
          <IssueForm
            addIssue={this.addIssue}
            addArchive={this.addArchive}
            addIssueArchive={this.addIssueArchive}
          />
          <br />
          <br />
          <br />

            <IssuesSearchBar issueLogs={this.state.logArchives}/>

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
            .map(issueArchive => (
              <IssuesList
                key={issueArchive.id}
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
