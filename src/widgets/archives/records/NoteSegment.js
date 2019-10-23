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
import API from "../../../modules/API";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as firebase from "firebase/app";
import "firebase/storage";

let orderNumber = 1;

export default class NoteSegment extends Component {
  state = {
    userId: JSON.parse(localStorage.getItem("user")),
    open: false,
    isOpen: false
  };

  MoveUp = () => {
    API.getAll(
      "records",
      `archive_id=${this.props.note.archive_id}&order=${this.props.note.order -
        1}`
    ).then(swappedNote => {
      const prevNote = {
        title: swappedNote[0].title,
        text: swappedNote[0].text,
        image: swappedNote[0].image,
        image_title: swappedNote[0].image_title,
        order: swappedNote[0].order + 1,
        language: swappedNote[0].language,
        archive_id: swappedNote[0].archive_id,
        record_type_id: swappedNote[0].record_type_id,
        id: swappedNote[0].id
      };
      API.put("records", prevNote).then(() => {
        const editedNote = {
          title: this.props.note.title,
          text: this.props.note.text,
          image: this.props.note.image,
          image_title: this.props.note.image_title,
          order: this.props.note.order - 1,
          language: this.props.note.language,
          archive_id: this.props.note.archive_id,
          record_type_id: this.props.note.record_type_id,
          id: this.props.note.id
        };
        this.props.updateRecord(editedNote);
      });
    });
  };

  MoveDown = () => {
    API.getAll(
      "records",
      `archive_id=${this.props.note.archive_id}&order=${this.props.note.order +
        1}`
    ).then(swappedNote => {
      if (swappedNote.length < 1) return;
      const prevNote = {
        title: swappedNote[0].title,
        text: swappedNote[0].text,
        image: swappedNote[0].image,
        image_title: swappedNote[0].image_title,
        order: swappedNote[0].order - 1,
        language: swappedNote[0].language,
        archive_id: swappedNote[0].archive_id,
        record_type_id: swappedNote[0].record_type_id,
        id: swappedNote[0].id
      };
      API.put("records", prevNote).then(() => {
        const editedNote = {
          title: this.props.note.title,
          text: this.props.note.text,
          image: this.props.note.image,
          image_title: this.props.note.image_title,
          order: this.props.note.order + 1,
          language: this.props.note.language,
          archive_id: this.props.note.archive_id,
          record_type_id: this.props.note.record_type_id,
          id: this.props.note.id
        };
        this.props.updateRecord(editedNote);
      });
    });
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  popupImage = link => {
    window.open(`${link}`, "popup", "width=600,height=600");
    return false;
  };

  deleteImageNote = () => {
    const storageRef = firebase.storage().ref("archive_images");
    const imageRef = storageRef.child(
      `${this.props.note.image_title}`
    );
    imageRef
      .delete()
      .then(function() {
        console.log("Image Deleted");
      })
      .then(() => this.deleteAndOrder())
      // .catch(function(error) {
      //   console.log(error.message, 7000);
      // });
  };

  deleteAndOrder = () => {
    API.delete("records", this.props.note.id)
      .then(() =>
        API.getAll(
          "records",
          `archive_id=${this.props.note.archive_id}`
        )
      )
      .then(records =>
        records.map(record => {
          const movedRecord = {
            title: record.title,
            text: record.text,
            image: record.image,
            image_title: record.image_title,
            order: orderNumber++,
            language: record.language,
            archive_id: record.archive_id,
            record_type_id: record.record_type_id,
            id: record.id
          };
          API.put("records", movedRecord);
        })
      )
      .then(() => this.props.resetOrderState(), (orderNumber = 1));
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
                <Dropdown icon="bars" style={{ fontSize: "1.5em" }}>
                  <Dropdown.Menu>
                    <NoteEditForm
                      noteId={this.props.note.id}
                      updateRecord={this.props.updateRecord}
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
                      onConfirm={
                        this.props.note.image === ""
                          ? () => this.deleteAndOrder()
                          : () => this.deleteImageNote()
                      }
                    />
                    {this.props.note.order <= 1 ? null : (
                      <Dropdown.Item
                        icon="sort amount up"
                        description="Move Up"
                        onClick={this.MoveUp}
                      />
                    )}
                    {this.props.arrayLength === this.props.note.order ? null : (
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
            <div style={{ whiteSpace: "pre-wrap" }}>{this.props.note.text}</div>
            {this.props.note.image !== "" ? (
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
