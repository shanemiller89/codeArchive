import React, { Component } from "react";
import { Container, Header, Icon, List, Card, Grid } from "semantic-ui-react";
import API from "../../../modules/API";
import BookmarksList from "../resources/BookmarksList";
import BookmarkForm from "../resources/BookmarkForm";
import VideoCard from "../resources/VideoCard";
import VideoForm from "../resources/VideoForm";
import NoteSegment from "../records/NoteSegment";
import NoteForm from "../records/NoteForm";
import SnippetSegment from "../records/SnippetSegment"
import SnippetForm from "../records/SnippetForm";

export default class LanguageArchive extends Component {
  state = {
    languageArchive: [],
    languageNotes: [],
    languageSnippets: [],
    languageBookmarks: [],
    languageVideos: []
  };

  archiveId = this.props.match.params.languageArchiveId;

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.languageArchiveId}`)
      .then(languageArchive => (newState.languageArchive = languageArchive))
      .then(() => this.setState(newState));
    // Get ALl Notes //
    API.getAll(
      "records",
      `archiveId=${this.props.match.params.languageArchiveId}&recordTypeId=1`
    )
      .then(languageNotes => (newState.languageNotes = languageNotes))
      .then(() => this.setState(newState));
    // Get All Snippets //
    API.getAll(
      "records",
      `archiveId=${this.props.match.params.languageArchiveId}&recordTypeId=2`
    )
      .then(languageSnippets => (newState.languageSnippets = languageSnippets))
      .then(() => this.setState(newState));
    // Get All bookmarks //
    API.getAll(
      "resources",
      `archiveId=${this.props.match.params.languageArchiveId}&resourceTypeId=1`
    )
      .then(
        languageBookmarks => (newState.languageBookmarks = languageBookmarks)
      )
      .then(() => this.setState(newState));
    // Get All videos //
    API.getAll(
      "resources",
      `archiveId=${this.props.match.params.languageArchiveId}&resourceTypeId=2`
    )
      .then(languageVideos => (newState.languageVideos = languageVideos))
      .then(() => this.setState(newState));
  }

  // FOR CRUD OF NOTE //
  addLanguageNote = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=1`
        )
      )
      .then(languageNotes =>
        this.setState({
          languageNotes: languageNotes
        })
      );
  };
  deleteLanguageNote = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=1`
        )
      )
      .then(languageNotes =>
        this.setState({
          languageNotes: languageNotes
        })
      );
  };
  updateLanguageNote = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=1`
        )
      )
      .then(languageNotes =>
        this.setState({
          languageNotes: languageNotes
        })
      );
  };
  // FOR CRUD SNIPPETS //
  addLanguageSnippet = data => {
    API.post("records", data)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=2`
        )
      )
      .then(languageSnippets =>
        this.setState({
          languageSnippets: languageSnippets
        })
      );
  };
  deleteLanguageSnippet = id => {
    API.delete("records", id)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=2`
        )
      )
      .then(languageSnippets =>
        this.setState({
          languageSnippets: languageSnippets
        })
      );
  };
  updateLanguageSnippet = editedData => {
    API.put("records", editedData)
      .then(() =>
        API.getAll(
          "records",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&recordTypeId=2`
        )
      )
      .then(languageSnippets =>
        this.setState({
          languageSnippets: languageSnippets
        })
      );
  };

  // FOR CRUD OF BOOKMARK //
  addLanguageBookmark = data => {
    API.post("resources", data)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=1`
        )
      )
      .then(languageBookmarks =>
        this.setState({
          languageBookmarks: languageBookmarks
        })
      );
  };
  deleteLanguageBookmark = id => {
    API.delete("resources", id)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=1`
        )
      )
      .then(languageBookmarks =>
        this.setState({
          languageBookmarks: languageBookmarks
        })
      );
  };
  updateLanguageBookmark = editedData => {
    API.put("resources", editedData)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=1`
        )
      )
      .then(languageBookmarks =>
        this.setState({
          languageBookmarks: languageBookmarks
        })
      );
  };
  // CRUD FOR VIDEOS
  addLanguageVideo = data => {
    API.post("resources", data)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=2`
        )
      )
      .then(languageVideos =>
        this.setState({
          languageVideos: languageVideos
        })
      );
  };
  deleteLanguageVideo = id => {
    API.delete("resources", id)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=2`
        )
      )
      .then(languageVideos =>
        this.setState({
          languageVideos: languageVideos
        })
      );
  };
  updateLanguageVideo = editedData => {
    API.put("resources", editedData)
      .then(() =>
        API.getAll(
          "resources",
          `archiveId=${
            this.props.match.params.languageArchiveId
          }&resourceTypeId=2`
        )
      )
      .then(languageVideos =>
        this.setState({
          languageVideos: languageVideos
        })
      );
  };

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
          {/* Main Documentation Link */}
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
          <br />
          {/* Add Note Form */}
          <NoteForm
            archiveId={this.archiveId}
            addLanguageNote={this.addLanguageNote}
          />
          <br />
          <br />
          {/* Add Code Snippet Form */}
          <SnippetForm 
          archiveId={this.archiveId}
          addLanguageSnippet={this.addLanguageSnippet}
          />
        </Container>
        <br />
        {/* Notes and Snippets */}
        {/* <Grid columns> */}
        {this.state.languageNotes.map(note => (
          <NoteSegment
            key={note.id}
            note={note}
            deleteLanguageNote={this.deleteLanguageNote}
            updateLanguageNote={this.updateLanguageNote}
          />
        ))}
        {this.state.languageSnippets.map(snippet => (
          <SnippetSegment
            key={snippet.id}
            snippet={snippet}
            deleteLanguageSnippet={this.deleteLanguageSnippet}
            updateLanguageSnippet={this.updateLanguageSnippet}
          />
        ))}
        {/* </Grid> */}
        <br />
        {/* Bookmarks */}
        <div>
          <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="bookmark" style={{ color: "#15CA00" }} />
            <Header.Content>
              Bookmarks
              <BookmarkForm
                archiveId={this.archiveId}
                addLanguageBookmark={this.addLanguageBookmark}
              />
              <Header.Subheader>
                All websites, articles, or documentation relating to this
                Archive
              </Header.Subheader>
            </Header.Content>
          </Header>
          <List>
            {this.state.languageBookmarks.map(bookmark => (
              <BookmarksList
                key={bookmark.id}
                bookmark={bookmark}
                deleteLanguageBookmark={this.deleteLanguageBookmark}
                updateLanguageBookmark={this.updateLanguageBookmark}
              />
            ))}
          </List>
        </div>
        {/* Videos */}
        <div>
          <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="video" style={{ color: "#15CA00" }} />
            <Header.Content>
              Videos
              <VideoForm
                archiveId={this.archiveId}
                addLanguageVideo={this.addLanguageVideo}
              />
              <Header.Subheader>
                All videos relating to this Archive
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Card.Group itemsPerRow={2}>
            {this.state.languageVideos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                deleteLanguageVideo={this.deleteLanguageVideo}
                updateLanguageVideo={this.updateLanguageVideo}
              />
            ))}
          </Card.Group>
        </div>
        <br />
        <br />
      </React.Fragment>
    );
  }
}
