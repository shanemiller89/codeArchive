import React, { Component } from "react";
import { List } from "semantic-ui-react";

export default class BookmarksList extends Component {
  render() {
    return (
      <React.Fragment>
        <List.Item style={{ marginLeft: "6em" }}>
          <List.Icon name="linkify" />
          <List.Content>
            <List.Header
              as="a"
              href={this.props.bookmark.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {this.props.bookmark.title}
            </List.Header>
            <List.Description>
              {this.props.bookmark.description}
            </List.Description>
          </List.Content>
        </List.Item>
      </React.Fragment>
    );
  }
}
