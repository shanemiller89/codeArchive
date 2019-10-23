import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Search, Grid, Header, Icon } from "semantic-ui-react";
import { conditionalExpression } from "@babel/types";
// import "./ArticleSearchBar.css";Art

export default class LibraryArchiveSearchBar extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    results: [],
    value: ""
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.id }, () =>
      this.setState({ value: result.title })
    );

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({ isLoading: false, results: [], value: "" });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.archives, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const resultRender = ({ title, url }) => (
      <span key={title}>
        <Link to={`/library-archive/${url.split("s/")[1]}`}>
          <Header as="h2">
            <Icon name="search" style={{ color: "#15CA00" }} />
            <Header.Content>{title}</Header.Content>
          </Header>
        </Link>
      </span>
    );

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            fluid
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            placeholder="Search Archives by Title"
            results={results}
            value={value}
            resultRenderer={resultRender}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
