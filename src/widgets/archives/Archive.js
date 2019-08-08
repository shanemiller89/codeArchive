import React, { Component } from "react";
import { Container, Header, Icon, List, Card, Grid } from "semantic-ui-react";
import API from "../../modules/API";
import BookmarksList from "./resources/BookmarksList";
import BookmarkForm from "./resources/BookmarkForm";
import VideoCard from "./resources/VideoCard";
import VideoForm from "./resources/VideoForm";
import NoteSegment from "./records/NoteSegment";
import NoteForm from "./records/NoteForm";
import SnippetSegment from "./records/SnippetSegment";
import SnippetForm from "./records/SnippetForm";

export default class Archive extends Component {
  state = {
    Archive: [],
    Notes: [],
    Snippets: [],
    Bookmarks: [],
    Videos: []
  };

  archiveId = this.props.match.params.ArchiveId;

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.ArchiveId}`)
      .then(Archive => (newState.Archive = Archive))
      .then(() => this.setState(newState));
    // Get ALl Notes //
    API.getAll(
      "records",
      `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=1`
    )
      .then(Notes => (newState.Notes = Notes))
      .then(() => this.setState(newState));
    // Get All Snippets //
    API.getAll(
      "records",
      `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=2`
    )
      .then(Snippets => (newState.Snippets = Snippets))
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
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=1`
        )
      )
      .then(Notes =>
        this.setState({
          Notes: Notes
        })
      );
  };
  deleteNote = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=1`
        )
      )
      .then(Notes =>
        this.setState({
          Notes: Notes
        })
      );
  };
  updateNote = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=1`
        )
      )
      .then(Notes =>
        this.setState({
          Notes: Notes
        })
      );
  };
  // FOR CRUD SNIPPETS //
  addSnippet = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=2`
        )
      )
      .then(Snippets =>
        this.setState({
          Snippets: Snippets
        })
      );
  };
  deleteSnippet = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=2`
        )
      )
      .then(Snippets =>
        this.setState({
          Snippets: Snippets
        })
      );
  };
  updateSnippet = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${this.props.match.params.ArchiveId}&recordTypeId=2`
        )
      )
      .then(Snippets =>
        this.setState({
          Snippets: Snippets
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

  // {this.props.note.image !== null ? (
  //   <Image src={this.props.note.image} alt={this.props.note.title}/>
  // ) : null}

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
          <NoteForm archiveId={this.archiveId} addNote={this.addNote} />
          <br />
          <br />
          {/* Add Code Snippet Form */}
          <SnippetForm
            archiveId={this.archiveId}
            addSnippet={this.addSnippet}
          />
        </Container>
        <br />
        {/* Notes and Snippets */}
        {/* <Grid columns> */}
        {this.state.Notes.map(note => (
          <NoteSegment
            key={note.id}
            note={note}
            deleteNote={this.deleteNote}
            updateNote={this.updateNote}
          />
        ))}
        {this.state.Snippets.map(snippet => (
          <SnippetSegment
            key={snippet.id}
            snippet={snippet}
            deleteSnippet={this.deleteSnippet}
            updateSnippet={this.updateSnippet}
          />
        ))}
        {/* </Grid> */}
        <br />
        {/* Bookmarks */}
        {this.props.location.pathname.indexOf(
          `/code-log-archive/${this.props.match.params.ArchiveId}`
        ) ? (
          <div>
            <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
              <Icon name="bookmark" style={{ color: "#15CA00" }} />
              <Header.Content>
                Bookmarks
                <BookmarkForm
                  archiveId={this.archiveId}
                  addBookmark={this.addBookmark}
                />
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
                Videos
                <VideoForm
                  archiveId={this.archiveId}
                  addVideo={this.addVideo}
                />
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
