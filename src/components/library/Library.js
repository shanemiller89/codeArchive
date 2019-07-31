import React, { Component } from "react";
import { Header, Icon, Grid, Container, Button, Label } from "semantic-ui-react";
import LanguageCard from "./LanguageCard";

const placeHolder = {
  height: "250px",
  width: "100%",
  background: "lightgray"
};

export default class Library extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          fluid
          style={{
            background: "#E8E8E8",
            height: "20em",
            color: "#15CA00",
            padding: "1em"
          }}
        >
          <Header style={{ fontSize: "5em", color: "#15CA00" }}>Library</Header>

          <Button primary as="div" labelPosition="right">
            <Button style={{background: "#15CA00", color: "white"}} icon>
              <Icon name="plus" />
              Add
            </Button>
            <Label basic pointing="left">
              Library
            </Label>
          </Button>

        </Container>
        <div className="language-container">

          <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon name="file code outline" style={{ color: "#15CA00" }} />
            <Header.Content>
              Languages
              <Header.Subheader>
                Manage your language libraries
              </Header.Subheader>
            </Header.Content>
          </Header>

          {/* <Header as="h1" icon style={{ marginLeft: 20, marginTop: 20 }}>
            <Icon style={{ color: "#15CA00" }} name="file code outline" />
            Languages
          </Header> */}
          <Grid style={{ margin: 20 }}>
            {this.props.languages.map(language => (
              <LanguageCard language={language} />
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
