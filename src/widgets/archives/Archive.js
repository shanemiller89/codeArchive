import React, { Component } from "react";
import { Container, Header, Icon, List, Card } from "semantic-ui-react";
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
    Bookmarks: [],
    Videos: [],
    NotesAndSnippets: []
  };

  archiveId = this.props.match.params.ArchiveId;

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.ArchiveId}`)
      .then(Archive => (newState.Archive = Archive))
      .then(() => this.setState(newState));
    // Get ALl Notes and Snippets //
    API.getAll(
      "records",
      `archiveId=${this.props.match.params.ArchiveId}&_sort=order&_order=asc`
    )
      .then(NotesAndSnippets => (newState.NotesAndSnippets = NotesAndSnippets))
      .then(() => this.setState(newState));
    // Get All bookmarks //
    API.getAll(
      "resources",
      `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=1`
    )
      .then(Bookmarks => (newState.Bookmarks = Bookmarks))
      .then(() => this.setState(newState));
    // Get All videos //
    API.getAll(
      "resources",
      `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=2`
    )
      .then(Videos => (newState.Videos = Videos))
      .then(() => this.setState(newState));
  }

  // FOR CRUD OF NOTE //
  addNote = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  deleteNote = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  updateNote = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  // FOR CRUD SNIPPETS //
  addSnippet = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  deleteSnippet = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };
  updateSnippet = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.ArchiveId
          }&_sort=order&_order=asc`
        )
      )
      .then(NotesAndSnippets =>
        this.setState({
          NotesAndSnippets: NotesAndSnippets
        })
      );
  };

  // FOR CRUD OF BOOKMARK //
  addBookmark = data => {
    API.post("resources", data)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=1`
        )
      )
      .then(Bookmarks =>
        this.setState({
          Bookmarks: Bookmarks
        })
      );
  };
  deleteBookmark = id => {
    API.delete("resources", id)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=1`
        )
      )
      .then(Bookmarks =>
        this.setState({
          Bookmarks: Bookmarks
        })
      );
  };
  updateBookmark = editedData => {
    API.put("resources", editedData)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=1`
        )
      )
      .then(Bookmarks =>
        this.setState({
          Bookmarks: Bookmarks
        })
      );
  };
  // CRUD FOR VIDEOS
  addVideo = data => {
    API.post("resources", data)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=2`
        )
      )
      .then(Videos =>
        this.setState({
          Videos: Videos
        })
      );
  };
  deleteVideo = id => {
    API.delete("resources", id)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=2`
        )
      )
      .then(Videos =>
        this.setState({
          Videos: Videos
        })
      );
  };
  updateVideo = editedData => {
    API.put("resources", editedData)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${this.props.match.params.ArchiveId}&resourceTypeId=2`
        )
      )
      .then(Videos =>
        this.setState({
          Videos: Videos
        })
      );
  };

  render() {
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
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon style={{ color: "#15CA00" }} name="archive" />
            {this.state.Archive.title}
          </Header>
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
            addNote={this.addNote}
            arrayLength={this.state.NotesAndSnippets.length}
          />
          <br />
          <br />
          {/* Add Code Snippet Form */}
          <SnippetForm
            archiveId={this.archiveId}
            addSnippet={this.addSnippet}
            arrayLength={this.state.NotesAndSnippets.length}
          />
        </Container>
        <br />
        {/* Notes and Snippets */}
        <NotesAndSnippetsList
          NotesAndSnippets={this.state.NotesAndSnippets}
          deleteNote={this.deleteNote}
          updateNote={this.updateNote}
          deleteSnippet={this.deleteSnippet}
          updateSnippet={this.updateSnippet}
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
                <div style ={{display: "flex", alignItems: "flex-end"}}>
                  Bookmarks
                  <div>
                    <BookmarkForm
                      archiveId={this.archiveId}
                      addBookmark={this.addBookmark}
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
              {this.state.Bookmarks.map(bookmark => (
                <BookmarksList
                  key={bookmark.id}
                  bookmark={bookmark}
                  deleteBookmark={this.deleteBookmark}
                  updateBookmark={this.updateBookmark}
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
              <div style ={{display: "flex", alignItems: "flex-end"}}>
                Videos
                <div>
                <VideoForm
                  archiveId={this.archiveId}
                  addVideo={this.addVideo}
                />
                </div>
                </div>
                <Header.Subheader>
                  All videos relating to this Archive
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Card.Group itemsPerRow={2}>
              {this.state.Videos.map(video => (
                <VideoCard
                  key={video.id}
                  video={video}
                  deleteVideo={this.deleteVideo}
                  updateVideo={this.updateVideo}
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
