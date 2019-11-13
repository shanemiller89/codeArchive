import React, { useState } from "react";
import _ from "lodash";
import { Search, Grid, Header, Icon } from "semantic-ui-react";
import "./ArticleSearchBar.css";

const ArticleSearchBar = props => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentValue, setValue] = useState("");

  const handleResultSelect = (e, { result }) => {
    setValue(result.title);
  };

  const handleSearchChange = (e, { currentValue }) => {
    setLoading(true);
    setValue(currentValue);

    setTimeout(() => {
      if (currentValue.length < 1)
        return setLoading(false); setResults([]); setValue("");

      const re = new RegExp(_.escapeRegExp(currentValue), "i");
      const isMatch = result => re.test(result.reference);

      setLoading(false);
      setResults(_.filter(props.articles, isMatch));
    }, 300);
  };

  // const { isLoading, value, results } = this.state;
  const resultRender = ({ title, reference, link }) => (
    <span key="title">
      <a href={link} rel="noopener noreferrer" target="_blank">
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
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true
          })}
          placeholder="Search by Reference"
          results={results}
          value={currentValue}
          resultRenderer={resultRender}
          {...props}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ArticleSearchBar