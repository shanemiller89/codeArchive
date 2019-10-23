import React, { Component } from "react";
import NoteSegment from "./NoteSegment";
import SnippetSegment from "./SnippetSegment";

export default class NotesAndSnippetsList extends Component {

  render() {

    return (
      <React.Fragment>
        {this.props.NotesAndSnippets.map((NotesAndSnippets) =>
          NotesAndSnippets.record_type_id === 1 ? (
              <NoteSegment
                key={NotesAndSnippets.id}
                note={NotesAndSnippets}
                arrayLength={this.props.NotesAndSnippets.length}
                deleteRecord={this.props.deleteRecord}
                updateRecord={this.props.updateRecord}
                resetOrderState={this.props.resetOrderState}
              />
          ) : (
              <SnippetSegment
                key={NotesAndSnippets.id}
                snippet={NotesAndSnippets}
                arrayLength={this.props.NotesAndSnippets.length}
                deleteRecord={this.props.deleteRecord}
                updateRecord={this.props.updateRecord}
                resetOrderState={this.props.resetOrderState}
              />
          )
        )}
      </React.Fragment>
    );
  }
}
