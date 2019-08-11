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
    issueLogs: [],
    // searchLog: _.times(5, () => ({
    //     title: this.state.issueLogs.title,
    //     reference: this.state.issueLogs.reference
    //   }))
  };
  
  componentDidMount() {
    const newState = {};
    API.getAll("logs", `userId=${this.state.currentUser}&logTypeId=1`)
      .then(issueLogs => (newState.issueLogs = issueLogs))
      .then(() => this.setState(newState));
      console.log("search", newState)
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
        results: _.filter(this.state.issueLogs, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

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
            {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state.issueLogs, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
      </Grid>
    );
  }
}
