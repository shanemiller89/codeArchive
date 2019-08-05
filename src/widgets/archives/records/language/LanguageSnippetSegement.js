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
import LanguageNoteEditForm from "./LanguageNoteEditForm";

export default class LanguageSnippetSegment extends Component {
  state = {
    open: false
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
              {/* <Dropdown
                icon="list"
                style={{ fontSize: ".75em", marginLeft: "1em" }}
              >
                <Dropdown.Menu>
                  <LanguageNoteEditForm
                    noteId={this.props.note.id}
                    updateLanguageNote={this.props.updateLanguageNote}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Library"
                    content="Are you sure you want to delete this library?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteLanguageNote(this.props.note.id)
                    }
                  />
                </Dropdown.Menu>
              </Dropdown> */}
            </Header>
            <SyntaxHighlighter language="javascript" style={dark} showLineNumbers={true}>
              {this.props.snippet.text}
            </SyntaxHighlighter>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}
