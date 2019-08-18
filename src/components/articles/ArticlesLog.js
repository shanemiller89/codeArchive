import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import ArticleSegment from "./ArticleSegment";
import ArticleForm from "./ArticleForm";

export default class ArticlesLog extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    articles: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("articles", `userId=${this.state.currentUser}`)
      .then(articles => (newState.articles = articles))
      .then(() => this.setState(newState));
  }

  // CRUD //
  addArticle = data => {
    API.post("articles", data)
      .then(() => API.getAll("articles", `userId=${this.state.currentUser}`))
      .then(articles =>
        this.setState({
          articles: articles
        })
      );
  };

  deleteArticle = id => {
    API.delete("articles", id)
      .then(() => API.getAll("articles", `userId=${this.state.currentUser}`))
      .then(articles =>
        this.setState({
          articles: articles
        })
      );
  };

  updateArticle = editedData => {
    API.put("articles", editedData)
      .then(() => API.getAll("articles", `userId=${this.state.currentUser}`))
      .then(articles =>
        this.setState({
          articles: articles
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "20em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="newspaper"
            />
            Article Log
          </Header>
          <ArticleForm addArticle={this.addArticle} />
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
          {this.state.articles.map(article => (
            <ArticleSegment
              key={article.id}
              article={article}
              deleteArticle={this.deleteArticle}
              updateArticle={this.updateArticle}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
