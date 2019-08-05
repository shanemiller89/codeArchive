import React, { Component } from "react";
import { Container, Header, Icon, List, Card } from "semantic-ui-react";
import API from "../../../modules/API";
import BookmarksList from "../resources/language/BookmarksList";
import LanguageBookmarkForm from "../resources/language/LanguageBookmarkForm";
import LanguageVideoCard from "../resources/language/LanguageVideoCard";
import LanguageVideoForm from "../resources/language/LanguageVideoForm";

export default class LanguageArchive extends Component {
  state = {
    languageArchive: [],
    languageBookmarks: [],
    languageVideos: []
  };

  archiveId = this.props.match.params.languageArchiveId;

  componentDidMount() {
    const newState = {};
    API.get("archives", `${this.props.match.params.languageArchiveId}`)
      .then(languageArchive => (newState.languageArchive = languageArchive))
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
    API.getAll(
      "resources",
      `archiveId=${this.props.match.params.languageArchiveId}&resourceTypeId=2`
    )
      .then(languageVideos => (newState.languageVideos = languageVideos))
      .then(() => this.setState(newState));
    // Get All Videos //
  }

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
          {/* <br /> */}
          {/* Add Sub Language Form */}

          {/* <br />
          <br /> */}
          {/* Add Language Archive Form */}
        </Container>
        {/* Resources */}
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
          <Card.Group itemsPerRow={3}>
            {this.state.languageVideos.map(video => (
              <LanguageVideoCard
                key={video.id}
                video={video}
                // deleteLanguageLibrary={this.deleteLanguageLibrary}
                // updateLanguageLibrary={this.updateLanguageLibrary}
              />
            ))}
          </Card.Group>
        </div>
      </React.Fragment>
    );
  }
}