import React, { Component } from "react";
import { Container, Header, Icon, List, Card, Responsive } from "semantic-ui-react";
import API from "../../modules/API";
import BookmarksList from "./resources/BookmarksList";
import BookmarkForm from "./resources/BookmarkForm";
import VideoCard from "./resources/VideoCard";
import VideoForm from "./resources/VideoForm";
import NoteForm from "./records/NoteForm";
import SnippetForm from "./records/SnippetForm";
import NotesAndSnippetsList from "./records/NotesAndSnippetsList";

export default class Archive extends Component {
  state = {
    Archive: [],
    Resources: [],
    NotesAndSnippets: [],
  };

  archiveId = this.props.match.params.ArchiveId;

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.ArchiveId}`)
    .then(Archive => {
      newState.Archive = Archive;
      newState.Resources = Archive.resources;
      })
      .then(() => this.setState(newState));

    // Get ALl Notes and Snippets
    API.getAll(
      "records",
      `archive_id=${this.props.match.params.ArchiveId}`
    )
      .then(NotesAndSnippets => (newState.NotesAndSnippets = NotesAndSnippets))
      .then(() => this.setState(newState));
 
    // API.getAll(
    //   "records",
    //   `archive_id=${this.props.match.params.ArchiveId}&_sort=order&_order=asc`
    // )
    //   .then(NotesAndSnippets => (newState.NotesAndSnippets = NotesAndSnippets))
    //   .then(() => this.setState(newState));
 
  }

  // FOR CRUD OF Records //
  addRecord = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archive_id=${this.props.match.params.ArchiveId}`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  deleteRecord = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archive_id=${this.props.match.params.ArchiveId}`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  updateRecord = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archive_id=${this.props.match.params.ArchiveId}`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };


  resetOrderState = () => {
    API.getAll(
      "records",
      `archive_id=${this.props.match.params.ArchiveId}`
    ).then(NotesAndSnippets =>
      this.setState({
        NotesAndSnippets: NotesAndSnippets
      })
    );
  };

  // FOR CRUD OF BOOKMARK //
  addResource = data => {
    API.post("resources", data)
      .then(() => API.get("archives", `${this.props.match.params.ArchiveId}`))
      .then(Archive =>
        this.setState({
          Resources: Archive.resources
        })
      );
  };
  deleteResource = id => {
    API.delete("resources", id)
      .then(() => API.get("archives", `${this.props.match.params.ArchiveId}`))
      .then(Archive =>
        this.setState({
          Resources: Archive.resources
        })
      );
  };
  updateResource = editedData => {
    API.put("resources", editedData)
      .then(() => API.get("archives", `${this.props.match.params.ArchiveId}`))
      .then(Archive =>
        this.setState({
          Resources: Archive.resources
        })
      );
  };


  render() {
    console.log("NotesAndSnippets", this.state.NotesAndSnippets)
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "22em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Responsive minWidth={480}>
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon style={{ color: "#15CA00" }} name="archive" />
            {this.state.Archive.title}
          </Header>
          </Responsive>
          <Responsive maxWidth={480}>
          <Header style={{ fontSize: "2em", marginTop: ".1em" }}>
            <Icon style={{ color: "#15CA00" }} name="archive" />
            {this.state.Archive.title}
          </Header>
          </Responsive>
          {/* Main Documentation Link */}
          {this.state.Archive.link !== "" ? (
            <a
              href={this.state.Archive.link}
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
          ) : null}
          <br />
          {/* Add Note Form */}
          <NoteForm
            archiveId={this.archiveId}
            addRecord={this.addRecord}
            arrayLength={this.state.NotesAndSnippets.length}
          />
          <br />
          <br />
          {/* Add Code Snippet Form */}
          <SnippetForm
            archiveId={this.archiveId}
            addRecord={this.addRecord}
            arrayLength={this.state.NotesAndSnippets.length}
          />
        </Container>
        <br />
        {/* Notes and Snippets */}
        <NotesAndSnippetsList
          NotesAndSnippets={this.state.NotesAndSnippets}
          deleteRecord={this.deleteRecord}
          updateRecord={this.updateRecord}
          deleteRecord={this.deleteRecord}
          updateRecord={this.updateRecord}
          resetOrderState={this.resetOrderState}
        />
        <br />
        {/* Bookmarks */}
        {this.props.location.pathname.indexOf(
          `/code-log-archive/${this.props.match.params.ArchiveId}`
        ) ? (
          <div>
            <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
              <Icon name="bookmark" style={{ color: "#15CA00" }} />
              <Header.Content>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  Bookmarks
                  <div>
                    <BookmarkForm
                      archiveId={this.archiveId}
                      addResource={this.addResource}
                    />
                  </div>
                </div>
                <Header.Subheader>
                  All websites, articles, or documentation relating to this
                  Archive
                </Header.Subheader>
              </Header.Content>
            </Header>
            <List>
              {this.state.Resources.filter(
                bookmarks => bookmarks.resource_type_id === 1
              ).map(bookmark => (
                <BookmarksList
                  key={bookmark.id}
                  bookmark={bookmark}
                  deleteResource={this.deleteResource}
                  updateResource={this.updateResource}
                />
              ))}
            </List>
          </div>
        ) : null}
        {/* Videos */}
        {this.props.location.pathname.indexOf(
          `/code-log-archive/${this.props.match.params.ArchiveId}`
        ) ? (
          <div>
            <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
              <Icon name="video" style={{ color: "#15CA00" }} />
              <Header.Content>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  Videos
                  <div>
                    <VideoForm
                      archiveId={this.archiveId}
                      addResource={this.addResource}
                    />
                  </div>
                </div>
                <Header.Subheader>
                  All videos relating to this Archive
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Card.Group itemsPerRow={2}>
              {this.state.Resources.filter(
                videos => videos.resource_type_id === 2
              ).map(video => (
                <VideoCard
                  key={video.id}
                  video={video}
                  deleteResource={this.deleteResource}
                  updateResource={this.updateResource}
                />
              ))}
            </Card.Group>
          </div>
        ) : null}
        <br />
        <br />
      </React.Fragment>
    );
  }
}
