import React, { Component } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Segment,
  Header,
  Icon,
  Button,
  Popup,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import SnippetEditForm from "./SnippetEditForm";
import copy from "copy-to-clipboard";

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
      language: this.props.snippet.language,
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
      language: this.props.snippet.language,
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Header as="h1">{this.props.snippet.title}</Header>
              <div>
                <Popup
                  content="Copy Code"
                  position="left center"
                  inverted
                  trigger={
                    <Button
                      icon="copy"
                      onClick={() => copy(this.props.snippet.text)}
                      style={{
                        border: "none",
                        background: "none",
                        fontSize: "1.5em"
                      }}
                    />
                  }
                />
                <Dropdown icon="bars" style={{ fontSize: "1.5em" }}>
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
                    {this.props.arrayLength ===
                    this.props.snippet.order ? null : (
                      <Dropdown.Item
                        icon="sort amount down"
                        description="Move Down"
                        onClick={this.MoveDown}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <SyntaxHighlighter
              language={this.props.snippet.language}
              style={atomDark}
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
