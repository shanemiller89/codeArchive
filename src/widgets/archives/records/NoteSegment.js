import React, { Component } from "react";
import {
  Segment,
  Header,
  Icon,
  Image,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import NoteEditForm from "./NoteEditForm";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class NoteSegment extends Component {
  state = {
    open: false,
    isOpen: false
  };

  MoveUp = () => {
    const editedNote = {
      title: this.props.note.title,
      text: this.props.note.text,
      image: this.props.note.image,
      order: this.props.note.order - 1,
      language: this.props.snippet.language,
      archiveId: this.props.note.archiveId,
      recordTypeId: this.props.note.recordTypeId,
      id: this.props.note.id
    };
    this.props.updateNote(editedNote);
  };

  MoveDown = () => {
    const editedNote = {
      title: this.props.note.title,
      text: this.props.note.text,
      image: this.props.note.image,
      order: this.props.note.order + 1,
      language: this.props.snippet.language,
      archiveId: this.props.note.archiveId,
      recordTypeId: this.props.note.recordTypeId,
      id: this.props.note.id
    };
    this.props.updateNote(editedNote);
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  popupImage = link => {
    window.open(`${link}`, "popup", "width=600,height=600");
    return false;
  };

  render() {
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="sticky note" style={{ color: "#15CA00" }} />
          </Header>
          <Segment style={{ width: "80%" }}>
          <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Header as="h1">{this.props.note.title}</Header>
              <div>
              <Dropdown
                icon="bars"
                style={{ fontSize: "1.5em" }}
              >
                <Dropdown.Menu>
                  <NoteEditForm
                    noteId={this.props.note.id}
                    updateNote={this.props.updateNote}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Note"
                    content="Are you sure you want to delete this note?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => this.props.deleteNote(this.props.note.id)}
                  />
                  {this.props.note.order <= 1 ? null : (
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
              </div>
            </div>
            <div style={{ whiteSpace: "pre" }}>{this.props.note.text}</div>
            {this.props.note.image !== null ? (
              <div>
                <Image
                  src={this.props.note.image}
                  alt={this.props.note.title}
                  bordered
                  size="medium"
                  onClick={() => this.setState({ isOpen: true })}
                />
                {isOpen && (
                  <Lightbox
                    mainSrc={this.props.note.image}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
              </div>
            ) : null}
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}
