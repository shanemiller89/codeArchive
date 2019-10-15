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
                deleteNote={this.props.deleteNote}
                updateNote={this.props.updateNote}
                resetOrderState={this.props.resetOrderState}
              />
          ) : (
              <SnippetSegment
                key={NotesAndSnippets.id}
                snippet={NotesAndSnippets}
                arrayLength={this.props.NotesAndSnippets.length}
                deleteSnippet={this.props.deleteSnippet}
                updateSnippet={this.props.updateSnippet}
                resetOrderState={this.props.resetOrderState}
              />
          )
        )}
      </React.Fragment>
    );
  }
}
