import React, { useState, useEffect } from "react";
import { Container, Header, Icon, Responsive } from "semantic-ui-react";
import API from "../../modules/API";
import ArticleSegment from "./ArticleSegment";
import ArticleForm from "./ArticleForm";
import ArticleSearchBar from "./ArticleSearchBar";

const ArticlesLog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    API.getAll("articles").then(articles => {
      setArticles(articles);
    });
  }, []);

  // CRUD //
  const addArticle = data => {
    API.post("articles", data)
      .then(() => API.getAll("articles"))
      .then(articles => setArticles(articles));
  };

  const deleteArticle = id => {
    API.delete("articles", id)
      .then(() => API.getAll("articles"))
      .then(articles => setArticles(articles));
  };

  const updateArticle = editedData => {
    API.put("articles", editedData)
      .then(() => API.getAll("articles"))
      .then(articles => setArticles(articles));
  };

  return (
    <>
      <Container
        style={{
          background: "#E8E8E8",
          height: "18em",
          color: "#15CA00",
          padding: "1em"
        }}
        fluid
      >
        <Responsive minWidth={480}>
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="newspaper"
            />
            Article Log
          </Header>
        </Responsive>
        <Responsive maxWidth={480}>
          <Header style={{ fontSize: "3em", margin: ".1em 0 .2em 0" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="newspaper"
            />
            Article Log
          </Header>
        </Responsive>
        <ArticleForm addArticle={addArticle} />
        <br />
        <br />
        <ArticleSearchBar articles={articles} />
      </Container>
      <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
        <Icon name="newspaper" style={{ color: "#15CA00" }} />
        <Header.Content>
          Article Archives
          <Header.Subheader>
            Logs of Articles found relating to Software Development or related
            content
          </Header.Subheader>
        </Header.Content>
      </Header>
      <div>
        {articles.map(article => (
          <ArticleSegment
            key={article.id}
            article={article}
            deleteArticle={deleteArticle}
            updateArticle={updateArticle}
          />
        ))}
      </div>
    </>
  );
};

export default ArticlesLog;
