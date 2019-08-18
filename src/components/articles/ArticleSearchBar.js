import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Icon } from "semantic-ui-react";
import "./ArticleSearchBar.css";


export default class ArticleSearchBar extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    results: [],
    value: ""
  };

//   componentDidMount() {
//     const newState = {};

//     API.getAll("logArchives", `_expand=archive&_expand=log`)
//       .then(logArchives =>
//         logArchives
//           .filter(
//             codeArchives =>
//               (codeArchives.log.logTypeId === 2) &
//               (codeArchives.log.userId === this.state.currentUser)
//           )
//           .map(code => ({
//             title: code.archive.title,
//             reference: code.log.reference,
//             archiveId: code.archive.id
//           }))
//       )
//       .then(code => (newState.code = code))
//       .then(() => this.setState(newState));
//   }

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
      const isMatch = result => re.test(result.reference);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.articles, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const resultRender = ({ title, reference, link }) => (
      <span key="title">
          <a href={link}>
        <Header as="h3">
        <Icon name="search" style={{ color: "#15CA00" }} />
        <Header.Content>
          {title}
          <Header.Subheader>{reference}</Header.Subheader>
          </Header.Content>
        </Header>
        </a>
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
            placeholder="Search by Reference"
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


