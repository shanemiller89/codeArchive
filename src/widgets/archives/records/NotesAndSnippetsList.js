import React, { Component } from "react";
import NoteSegment from "./NoteSegment";
import SnippetSegment from "./SnippetSegment";
import { Button } from "semantic-ui-react";

export default class NotesAndSnippetsList extends Component {
 state = {
     NotesAndSnippets: this.props.NotesAndSnippets
 }

  onMoveUp(key) {
    if (key === 0) return;
    const { NotesAndSnippets } = this.props;
    const index = key - 1;
    const itemAbove = NotesAndSnippets[index];
    NotesAndSnippets[key - 1] = NotesAndSnippets[key];
    NotesAndSnippets[key] = itemAbove;
    this.setState({ NotesAndSnippets });
  }

  onMoveDown(key) {
    const { NotesAndSnippets } = this.props;
    if (key === NotesAndSnippets.length - 1) return;
    const index = key + 1;
    const itemBelow = NotesAndSnippets[index];
    NotesAndSnippets[key + 1] = NotesAndSnippets[key];
    NotesAndSnippets[key] = itemBelow;
    this.setState({ NotesAndSnippets });
  }

  render() {
    return (
      <React.Fragment>
        {console.log(this.props.NotesAndSnippets)}
        {this.props.NotesAndSnippets.map((NotesAndSnippets, key) =>
          NotesAndSnippets.recordTypeId === 1 ? (
            <li key={key}>
              <NoteSegment
                key={NotesAndSnippets.id}
                note={NotesAndSnippets}
                deleteNote={this.props.deleteNote}
                updateNote={this.props.updateNote}
              />
              <Button onClick={() => this.onMoveUp(key)}>UP</Button>
              <Button onClick={() => this.onMoveDown(key)}>DOWN</Button>
            </li>
          ) : (
            <li key={key}>
              <SnippetSegment
                key={NotesAndSnippets.id}
                snippet={NotesAndSnippets}
                deleteSnippet={this.props.deleteSnippet}
                updateSnippet={this.props.updateSnippet}
              />
              <Button onClick={() => this.onMoveUp(key)}>UP</Button>
              <Button onClick={() => this.onMoveDown(key)}>DOWN</Button>
            </li>
          )
        )}
      </React.Fragment>
    );
  }
}
