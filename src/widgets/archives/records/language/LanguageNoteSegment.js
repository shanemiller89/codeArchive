import React, { Component } from "react";
import {
  Segment,
  Header,
  Icon,
  Image,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import LanguageNoteEditForm from "./LanguageNoteEditForm";

export default class LanguageNoteSegment extends Component {
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
            <Icon name="sticky note" style={{ color: "#15CA00" }} />
          </Header>
          <Segment style={{ width: "80%" }}>
            <Header as="h1">
              {this.props.note.title}
              <Dropdown
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
                    content="Are you sure you want to delete this note?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteLanguageNote(this.props.note.id)
                    }
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Header>
            <div style={{ whiteSpace: "pre" }}>{this.props.note.text}</div>
            {this.props.note.image === !null ? (
              <Image src={this.props.note.title} />
            ) : null}
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}
