import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Segment,
  Header,
  Icon,
  Image,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import SnippetEditForm from "./SnippetEditForm";

export default class SnippetSegment extends Component {
  state = {
    open: false
  };

  MoveUp = () => {
    const editedSnippet = {
      title: this.props.snippet.title,
      text: this.props.snippet.text,
      image: this.props.snippet.image,
      order: this.props.snippet.order - 1,
      archiveId: this.props.snippet.archiveId,
      recordTypeId: this.props.snippet.recordTypeId,
      id: this.props.snippet.id
    };
    this.props.updateSnippet(editedSnippet);
  };

  MoveDown = () => {
    const editedSnippet = {
      title: this.props.snippet.title,
      text: this.props.snippet.text,
      image: this.props.snippet.image,
      order: this.props.snippet.order + 1,
      archiveId: this.props.snippet.archiveId,
      recordTypeId: this.props.snippet.recordTypeId,
      id: this.props.snippet.id
    };
    this.props.updateSnippet(editedSnippet);
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="code" style={{ color: "#15CA00" }} />
          </Header>
          <Segment style={{ width: "80%" }}>
            <Header as="h1">
              {this.props.snippet.title}
              <Dropdown
                icon="bars"
                style={{ fontSize: ".75em", marginLeft: "1em" }}
              >
                <Dropdown.Menu>
                  <SnippetEditForm
                    snippetId={this.props.snippet.id}
                    updateSnippet={this.props.updateSnippet}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Snippet"
                    content="Are you sure you want to delete this code snippet?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteSnippet(this.props.snippet.id)
                    }
                  />
                  {this.props.snippet.order <= 1 ? null : (
                    <Dropdown.Item
                      icon="sort amount up"
                      description="Move Up"
                      onClick={this.MoveUp}
                    />
                  )}
                  {/* <Dropdown.Item
                    icon="sort amount up"
                    description="Move Up"
                    onClick={this.MoveUp}
                  /> */}
                  <Dropdown.Item
                    icon="sort amount down"
                    description="Move Down"
                    onClick={this.MoveDown}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Header>
            <SyntaxHighlighter
              language="javascript"
              style={dark}
              showLineNumbers={true}
            >
              {this.props.snippet.text}
            </SyntaxHighlighter>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}
