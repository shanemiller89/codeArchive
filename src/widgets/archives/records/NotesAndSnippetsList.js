import React, { Component } from "react";
import NoteSegment from "./NoteSegment";
import SnippetSegment from "./SnippetSegment";

export default class NotesAndSnippetsList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.NotesAndSnippets.map(NotesAndSnippets =>
          NotesAndSnippets.recordTypeId === 1 ? (
            <NoteSegment
              key={NotesAndSnippets.id}
              note={NotesAndSnippets}
              deleteNote={this.props.deleteNote}
              updateNote={this.props.updateNote}
            />
          ) : (
            <SnippetSegment
              key={NotesAndSnippets.id}
              snippet={NotesAndSnippets}
              deleteSnippet={this.props.deleteSnippet}
              updateSnippet={this.props.updateSnippet}
            />
          )
        )
        }
      </React.Fragment>
    );
  }
}
