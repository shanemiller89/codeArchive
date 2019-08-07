import React, { Component } from "react";
import { Container, Header, Icon, List, Card, Grid } from "semantic-ui-react";
import API from "../../../modules/API"

export default class IssueArchive extends Component {
    state = {
        issueArchive: [],
        issueNotes: [],
        issueSnippets: [],
        issueBookmarks: [],
        issueVideos: []
      };
    
      archiveId = this.props.match.params.issueArchiveId

      componentDidMount() {
        const newState = {};
        API.get("archives", `${this.props.match.params.issueArchiveId}`)
          .then(issueArchive => (newState.issueArchive = issueArchive))
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
            {this.state.issueArchive.title}
          </Header>
          <br />
          {/* Add Note Form */}
          {/* <NoteForm
            archiveId={this.archiveId}
            addLanguageNote={this.addLanguageNote}
          /> */}
          <br />
          <br />
          {/* Add Code Snippet Form */}
          {/* <SnippetForm
            archiveId={this.archiveId}
            addLanguageSnippet={this.addLanguageSnippet}
          /> */}
        </Container>
        <br />
      </React.Fragment>
    );
  }
}
