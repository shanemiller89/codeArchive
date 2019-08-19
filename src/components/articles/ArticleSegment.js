import React, { Component } from "react";
import {
  Segment,
  Header,
  Icon,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import ArticleEditForm from "./ArticleEditForm"

export default class ArticleSegment extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <Segment style={{ width: "83%", marginLeft: "5em" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Header as="h1">
              {this.props.article.title}
              <Header.Subheader>
                {this.props.article.reference}
              </Header.Subheader>
            </Header>
            <div>
              <Dropdown icon="bars" style={{ fontSize: "1.5em" }}>
                <Dropdown.Menu>
                  <ArticleEditForm
                    articleId={this.props.article.id}
                    updateArticle={this.props.updateArticle}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Article"
                    content="Are you sure you want to delete this article?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => this.props.deleteArticle(this.props.article.id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Segment.Inline>
            <div style={{ whiteSpace: "pre-wrap", fontSize: "1.25em" }}>
              <Icon
                style={{ color: "#15CA00", marginRight: ".25em" }}
                name="newspaper"
              />
              {this.props.article.synopsis}
            </div>
            <br />
            <div style={{ fontSize: "1.25em" }}>
              <Icon
                style={{ color: "#15CA00", marginRight: ".25em" }}
                name="linkify"
              />
                <a href={this.props.article.link}>Open Article</a>
            </div>
          </Segment.Inline>
        </Segment>
      </React.Fragment>
    );
  }
}
