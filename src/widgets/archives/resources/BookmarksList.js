import React, { Component } from "react";
import { List, Dropdown, Confirm } from "semantic-ui-react";
import BookmarkEditForm from "./BookmarkEditForm";

export default class BookmarksList extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <List.Item style={{ marginLeft: "6em" }}>
          <List.Icon style={{color: "#15CA00"}} name="linkify" />
          <List.Content>
            <List.Header as="h3">
              <a
                href={this.props.bookmark.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {this.props.bookmark.title}
              </a>
              <Dropdown icon="bars" floated="right" style={{marginLeft: ".5em"}}>
                <Dropdown.Menu position="right">
                  <BookmarkEditForm
                    bookmark={this.props.bookmark}
                    updateBookmark={this.props.updateBookmark}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Bookmark"
                    content="Are you sure you want to delete this bookmark?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteBookmark(this.props.bookmark.id)
                    }
                  />
                </Dropdown.Menu>
              </Dropdown>
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
