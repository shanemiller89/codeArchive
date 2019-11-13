import React, { useState } from "react";
import { Segment, Header, Icon, Dropdown, Confirm } from "semantic-ui-react";
import ArticleEditForm from "./ArticleEditForm";

const ArticleSegment = props => {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <Segment style={{ width: "83%", marginLeft: "5em" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Header as="h1">
            {props.article.title}
            <Header.Subheader>{props.article.reference}</Header.Subheader>
          </Header>
          <div>
            <Dropdown icon="bars" style={{ fontSize: "1.5em" }}>
              <Dropdown.Menu>
                <ArticleEditForm
                  articleId={props.article.id}
                  updateArticle={props.updateArticle}
                />
                <Dropdown.Item
                  icon="trash alternate"
                  description="Delete"
                  onClick={openMenu}
                />
                <Confirm
                  size="mini"
                  header="Delete Article"
                  content="Are you sure you want to delete this article?"
                  confirmButton="Yes"
                  open={open}
                  onCancel={closeMenu}
                  onConfirm={() => props.deleteArticle(props.article.id)}
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
            {props.article.synopsis}
          </div>
          <br />
          <div style={{ fontSize: "1.25em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="linkify"
            />
            <a href={props.article.link}>Open Article</a>
          </div>
        </Segment.Inline>
      </Segment>
    </>
  );
};

export default ArticleSegment;
