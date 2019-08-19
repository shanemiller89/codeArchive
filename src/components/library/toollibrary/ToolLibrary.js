import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../../modules/API";
import ToolArchivesList from "./ToolArchivesList";
import ToolArchiveForm from "./ToolArchiveForm";

export default class ToolLibrary extends Component {
  state = {
    tool: [],
    toolArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.get("libraries", `${this.props.match.params.toolLibraryId}`)
      .then(tool => (newState.tool = tool))
      .then(() => this.setState(newState));
    // Gets ALL archives associated with this tool
    API.getAll(
      "libraryArchives",
      `_expand=archive&libraryId=${this.props.match.params.toolLibraryId}`
    )
      .then(toolArchives => (newState.toolArchives = toolArchives))
      .then(() => this.setState(newState));
  }

  // FOR CRUD OF TOOL ARCHIVES //

  addArchive = data => {
    return API.post("archives", data);
  };
  addToolArchive = data => {
    API.post("libraryArchives", data)
      .then(() =>
        API.getAll(
          "libraryArchives",
          `_expand=archive&libraryId=${
            this.props.match.params.toolLibraryId
          }`
        )
      )
      .then(toolArchives =>
        this.setState({
          toolArchives: toolArchives
        })
      );
  };

  addGoogleBookmark = data => {
    API.post("resources", data)
  }

  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.getAll(
          "libraryArchives",
          `_expand=archive&libraryId=${
            this.props.match.params.toolLibraryId
          }`
        )
      )
      .then(toolArchives =>
        this.setState({
          toolArchives: toolArchives
        })
      );
  };

  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.getAll(
          "libraryArchives",
          `_expand=archive&libraryId=${
            this.props.match.params.toolLibraryId
          }`
        )
      )
      .then(toolArchives =>
        this.setState({
          toolArchives: toolArchives
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
          <Header style={{ fontSize: "5em", marginTop: ".1em", }}>
            <Icon style={{ color: "#15CA00", marginRight: ".25em"  }} name="cogs" />
            {this.state.tool.title}
          </Header>
          <a
            href={this.state.tool.link}
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
          {/* Add Tool Archive Form */}
          <ToolArchiveForm
            toolId={this.state.tool.id}
            toolTitle={this.state.tool.title}
            addArchive={this.addArchive}
            addToolArchive={this.addToolArchive}
            addGoogleBookmark={this.addGoogleBookmark}
          />
        </Container>
        {/* Archives */}
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="archive" style={{ color: "#15CA00" }} />
          <Header.Content>
            Archives
            <Header.Subheader>
              Concepts and other information relating to this Tool
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.toolArchives.map(archive => (
            <ToolArchivesList
              key={archive.archive.id}
              archive={archive}
              updateArchive={this.updateArchive}
              deleteArchive={this.deleteArchive}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
