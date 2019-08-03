import React, { Component } from "react";
import { Header, Icon, Grid, Container, Card } from "semantic-ui-react";
import API from "../../modules/API";
import LanguageCard from "./LanguageCard";
import LanguageForm from "./LanguageForm";

export default class Library extends Component {
  state = {
    languageLibraries: [],
    currentUser: JSON.parse(localStorage.getItem("user"))
  };

  componentDidMount() {
    const newState = {};
    API.getAll("libraries", `userId=${this.state.currentUser}&libraryTypeId=1`)
      .then(
        languageLibraries => (newState.languageLibraries = languageLibraries)
      )
      .then(() => this.setState(newState));
    console.log("where you go?", newState);
  }

  addLanguageLibrary = data => {
    API.post("libraries", data)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.state.currentUser}&libraryTypeId=1`
        )
      )
      .then(languageLibraries =>
        this.setState({
          languageLibraries: languageLibraries
        })
      );
  };

  deleteLanguageLibrary = id => {
    API.delete("libraries", id)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.state.currentUser}&libraryTypeId=1`
        )
      )
      .then(languageLibraries =>
        this.setState({
          languageLibraries: languageLibraries
        })
      );
  };

  updateLanguageLibrary = editedData => {
    API.put("libraries", editedData)
      .then(() =>
        API.getAll(
          "libraries",
          `userId=${this.state.currentUser}&libraryTypeId=1`
        )
      )
      .then(languageLibraries =>
        this.setState({ languageLibraries: languageLibraries })
      );
  };

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
          {/* Add Language Form */}
          <LanguageForm
            addLanguageLibrary={this.addLanguageLibrary}
            currentUser={this.state.currentUser}
          />
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
          {/* <Grid style={{ marginLeft: "25px", marginRight: "25px" }}>
            <Grid.Row columns={4} > */}
            <Card.Group itemsPerRow={4}>
              {this.state.languageLibraries.map(language => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  deleteLanguageLibrary={this.deleteLanguageLibrary}
                  updateLanguageLibrary={this.updateLanguageLibrary}
                />
              ))}
              </Card.Group>
            {/* </Grid.Row>
          </Grid> */}
        </div>
      </React.Fragment>
    );
  }
}
