import React, { Component } from "react";
import { List, Dropdown, Confirm } from "semantic-ui-react";
import LanguageBookmarkEditForm from "./LanguageBookmarkEditForm";

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
          <List.Icon name="linkify" />
          <List.Content>
            <List.Header>
              <a
                href={this.props.bookmark.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {this.props.bookmark.title}
              </a>
              <Dropdown icon="list" floated="right">
                <Dropdown.Menu position="right">
                  <LanguageBookmarkEditForm
                    bookmark={this.props.bookmark}
                    updateLanguageBookmark={this.props.updateLanguageBookmark}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Library"
                    content="Are you sure you want to delete this library?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteLanguageBookmark(this.props.bookmark.id)
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
