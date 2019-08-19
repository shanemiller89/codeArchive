import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Icon } from "semantic-ui-react";
import "./EventSearchBar.css";


export default class EventSearchBar extends Component {
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
      const isMatch = result => re.test(result.reference);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.events, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const resultRender = ({ title, reference, date, location, link }) => (
      <span key="title">
          <a href={link} rel="noopener noreferrer" target="_blank">
        <Header as="h3">
        <Icon name="search" style={{ color: "#15CA00" }} />
        <Header.Content>
          {title}
          <Header.Subheader><strong>{date}</strong></Header.Subheader>
          <Header.Subheader><strong>{location}</strong></Header.Subheader>
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


