import _ from "lodash";
import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Search, Grid, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import "./IssuesSearchBar.css";

class IssuesSearchBar extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    results: [],
    value: "",
    issue: []
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.id }, () =>
      this.props.history.push(`/issue-log-archive/${result.archives[0].id}`)
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
        results: _.filter(this.props.issueLogs, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const resultRender = ({ title, reference, archives }) => (
      <span key="title">
        <Link
          to={`/issue-log-archive/${archives[0].id}`}
          style={{ textDecoration: "none" }}
        >
        <Header as="h2">
        <Icon name="search" style={{ color: "#15CA00" }} />
        <Header.Content>
          {title}
          <Header.Subheader>{reference}</Header.Subheader>
          </Header.Content>
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

export default withRouter(IssuesSearchBar);
