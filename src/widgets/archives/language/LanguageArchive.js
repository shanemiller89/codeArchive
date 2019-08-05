import React, { Component } from "react";
import { Container, Header, Icon, List, Card, Grid } from "semantic-ui-react";
import API from "../../../modules/API";
import BookmarksList from "../resources/language/BookmarksList";
import LanguageBookmarkForm from "../resources/language/LanguageBookmarkForm";
import LanguageVideoCard from "../resources/language/LanguageVideoCard";
import LanguageVideoForm from "../resources/language/LanguageVideoForm";
import LanguageNoteSegment from "../records/language/LanguageNoteSegment";
import LanguageNoteForm from "../records/language/LanguageNoteForm";

export default class LanguageArchive extends Component {
  state = {
    languageArchive: [],
    languageNotes: [],
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
          {/* Add Archive Form */}
          <LanguageNoteForm
            archiveId={this.archiveId}
            addLanguageNote={this.addLanguageNote}
          />
          {/* <br />
          <br /> */}
          {/* Add Language Archive Form */}
        </Container>
        <br />
        {/* Notes and Snippets */}
        {/* <Grid columns> */}
        {this.state.languageNotes.map(note => (
          <LanguageNoteSegment
            key={note.id}
            note={note}
            deleteLanguageNote={this.deleteLanguageNote}
            updateLanguageNote={this.updateLanguageNote}
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
              <LanguageBookmarkForm
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
              <LanguageVideoForm
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
              <LanguageVideoCard
                key={video.id}
                video={video}
                deleteLanguageVideo={this.deleteLanguageVideo}
                updateLanguageVideo={this.updateLanguageVideo}
              />
            ))}
          </Card.Group>
        </div>
      </React.Fragment>
    );
  }
}
