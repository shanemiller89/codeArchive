import _ from "lodash";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import API from "../../modules/API";
import "./IssuesSearchBar.css";

// const initialState = { isLoading: false, results: [], value: '' }

export default class IssuesSearchBar extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    results: [],
    value: "",
    issue: []
  };

  componentDidMount() {
    const newState = {};

    API.getAll("logArchives", `_expand=archive&_expand=log`)
      .then(logArchives =>
        logArchives.filter(
          issueArchives =>
            (issueArchives.log.logTypeId === 1) &
            (issueArchives.log.userId === this.state.currentUser)
        ).map( issue => ({
          title: issue.archive.title,
          reference: issue.log.reference,
          archiveId: issue.archive.id
        }))
      )
      .then(issue => (newState.issue= issue))
      .then(() => this.setState(newState));
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({ isLoading: false, results: [], value: "" });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.reference);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.issue, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const resultRender = ({ title, reference, archiveId }) => (
      <span key="title">
        <Link
          to={`/issue-log-archive/${archiveId}`}
          style={{ textDecoration: "none" }}
        >
          <h1>{title} </h1>
          {reference}
        </Link>
      </span>
    );
    console.log("issue", this.state.issue);

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
