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
    open: false,
    isOpen: false
  };

  MoveUp = () => {
    API.getAll(
      "records",
      `archiveId=${this.props.note.archiveId}&order=${this.props.note.order -
        1}`
    ).then(swappedNote => {
      const prevNote = {
        title: swappedNote[0].title,
        text: swappedNote[0].text,
        image: swappedNote[0].image,
        order: swappedNote[0].order + 1,
        language: swappedNote[0].language,
        archiveId: swappedNote[0].archiveId,
        recordTypeId: swappedNote[0].recordTypeId,
        id: swappedNote[0].id
      };
      API.put("records", prevNote).then(() => {
        const editedNote = {
          title: this.props.note.title,
          text: this.props.note.text,
          image: this.props.note.image,
          order: this.props.note.order - 1,
          language: this.props.note.language,
          archiveId: this.props.note.archiveId,
          recordTypeId: this.props.note.recordTypeId,
          id: this.props.note.id
        };
        this.props.updateNote(editedNote);
      });
    });
  };

  MoveDown = () => {
    API.getAll(
      "records",
      `archiveId=${this.props.note.archiveId}&order=${this.props.note.order +
        1}`
    ).then(swappedNote => {
      const prevNote = {
        title: swappedNote[0].title,
        text: swappedNote[0].text,
        image: swappedNote[0].image,
        order: swappedNote[0].order - 1,
        language: swappedNote[0].language,
        archiveId: swappedNote[0].archiveId,
        recordTypeId: swappedNote[0].recordTypeId,
        id: swappedNote[0].id
      };
      API.put("records", prevNote).then(() => {
        const editedNote = {
          title: this.props.note.title,
          text: this.props.note.text,
          image: this.props.note.image,
          order: this.props.note.order + 1,
          language: this.props.note.language,
          archiveId: this.props.note.archiveId,
          recordTypeId: this.props.note.recordTypeId,
          id: this.props.note.id
        };
        this.props.updateNote(editedNote);
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
      `${this.props.note.title}-${this.props.note.archiveId}`
    );
    imageRef
      .delete()
      .then(function() {
        console.log("Image Deleted");
      })
      .then(() => this.deleteAndOrder());
  };

  deleteAndOrder = () => {
    API.delete("records", this.props.note.id)
      .then(() => {
        return API.getAll(
          "records",
          `archiveId=${this.props.note.archiveId}&_sort=order&_order=asc`
        );
      })
      .then(records =>
        records.map(record => ({
          title: record.title,
          text: record.text,
          image: record.image,
          order: orderNumber++,
          language: record.language,
          archiveId: record.archiveId,
          recordTypeId: record.recordTypeId,
          id: record.id
        }))
      )
      // .then(records => {
      //   console.log(records)
      //   // for (let i = 0; i <= records.length; i++) {
      //   //   let newRecord = {
      //   //     title: records[i].title,
      //   //     text: records[i].text,
      //   //     image: records[i].image,
      //   //     order: orderNumber++,
      //   //     language: records[i].language,
      //   //     archiveId: records[i].archiveId,
      //   //     recordTypeId: records[i].recordTypeId,
      //   //     id: records[i].id
      //   //   };
      //   //   console.log(newRecord)
      //   //   this.props.updateNote(newRecord);
      //   // }
      // });
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
                      onConfirm={
                        this.props.note.image === null ||
                        this.props.note.image !==
                          `${this.props.note.title}-${this.props.note.archiveId}`
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
