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
import API from "../../../modules/API";
import copy from "copy-to-clipboard";

let orderNumber = 1;

export default class SnippetSegment extends Component {
  state = {
    open: false
  };

  MoveUp = () => {
    API.getAll(
      "records",
      `archiveId=${this.props.snippet.archiveId}&order=${this.props.snippet.order -
        1}`
    )
      .then(swappedSnippet => {
        const prevSnippet = {
          title: swappedSnippet[0].title,
          text: swappedSnippet[0].text,
          image: swappedSnippet[0].image,
          order: swappedSnippet[0].order + 1,
          language: swappedSnippet[0].language,
          archiveId: swappedSnippet[0].archiveId,
          recordTypeId: swappedSnippet[0].recordTypeId,
          id: swappedSnippet[0].id
        };
        API.put("records", prevSnippet)
        .then(() => {
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
        });
      })
  };

  MoveDown = () => {
    API.getAll(
      "records",
      `archiveId=${this.props.snippet.archiveId}&order=${this.props.snippet.order +
        1}`
    )
      .then(swappedSnippet => {
        const prevSnippet = {
          title: swappedSnippet[0].title,
          text: swappedSnippet[0].text,
          image: swappedSnippet[0].image,
          order: swappedSnippet[0].order - 1,
          language: swappedSnippet[0].language,
          archiveId: swappedSnippet[0].archiveId,
          recordTypeId: swappedSnippet[0].recordTypeId,
          id: swappedSnippet[0].id
        };
        API.put("records", prevSnippet)
        .then(() => {
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
        });
      })
  };


  deleteAndOrder = () => {
    API.delete("records", this.props.snippet.id)
      .then(() => 
        API.getAll(
          "records",
          `archiveId=${this.props.snippet.archiveId}&_sort=order&_order=asc`
        )
      )
      .then(records => (
        records.map(record => {
          const movedRecord = {
          title: record.title,
          text: record.text,
          image: record.image,
          order: orderNumber++,
          language: record.language,
          archiveId: record.archiveId,
          recordTypeId: record.recordTypeId,
          id: record.id
          }
          API.put("records", movedRecord)
        })
      )).then(() => this.props.resetOrderState(), orderNumber = 1)
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
                        this.deleteAndOrder()
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
