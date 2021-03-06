import React, { Component } from "react";
import {
  Header,
  Icon,
  Container,
  Card,
  Loader,
  Dimmer,
  Responsive
} from "semantic-ui-react";
import API from "../../modules/API";
import LanguageCard from "./LanguageCard";
import LanguageForm from "./LanguageForm";
import ToolForm from "./ToolForm";
import ToolCard from "./ToolCard";

export default class Library extends Component {
  state = {
    languageLibraries: [],
    toolLibraries: [],
    currentUser: JSON.parse(localStorage.getItem("user")),
    isLoading: true
  };

  componentDidMount() {
    const newState = {};
    API.getAll(
      "libraries",
      `library_type_id=1`
    )
      .then(
        languageLibraries => (newState.languageLibraries = languageLibraries)
      )
      .then(() => this.setState(newState))
      .then(() => {
        API.getAll(
          "libraries",
          `library_type_id=2`
        )
          .then(toolLibraries => (newState.toolLibraries = toolLibraries))
          .then(() => this.setState(newState)).then(() => {
            this.setState({
              isLoading: false
            })
          })
      });
  }

  addLanguageLibrary = data => {
    API.post("libraries", data)
      .then(() =>
        API.getAll(
          "libraries",
          `library_type_id=1`
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
          `library_type_id=1`
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
          `library_type_id=1`
        )
      )
      .then(languageLibraries =>
        this.setState({ languageLibraries: languageLibraries })
      );
  };

  // TOOL CRUD //

  addToolLibrary = data => {
    API.post("libraries", data)
      .then(() =>
        API.getAll(
          "libraries",
          `library_type_id=2`
        )
      )
      .then(toolLibraries =>
        this.setState({
          toolLibraries: toolLibraries
        })
      );
  };

  deleteToolLibrary = id => {
    API.delete("libraries", id)
      .then(() =>
        API.getAll(
          "libraries",
          `library_type_id=2`
        )
      )
      .then(toolLibraries =>
        this.setState({
          toolLibraries: toolLibraries
        })
      );
  };

  updateToolLibrary = editedData => {
    API.put("libraries", editedData)
      .then(() =>
        API.getAll(
          "libraries",
          `library_type_id=2`
        )
      )
      .then(toolLibraries => this.setState({ toolLibraries: toolLibraries }));
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      );
    } else {
      return (
        <React.Fragment>
          <Container
            fluid
            style={{
              background: "#E8E8E8",
              height: "18em",
              color: "#15CA00",
              padding: "1.5em"
            }}
          >
            <Responsive minWidth={480}>
            <Header style={{ fontSize: "5em", margin: ".1em 0 .2em 0" }}>
              <Icon style={{ color: "#15CA00" }} name="book" />
              Library
            </Header>
            </Responsive>
            {/* TEMP FIX */}
            <Responsive maxWidth={480}>
            <Header style={{ fontSize: "3.5em", margin: ".3em 0 .5em 0" }}>
              <Icon style={{ color: "#15CA00" }} name="book" />
              Library
            </Header>
            </Responsive>

            {/* Add Language Form */}
            <LanguageForm
              addLanguageLibrary={this.addLanguageLibrary}
              currentUser={this.state.currentUser}
            />
            <br />
            <br />
            {/* Add Tool Form */}
            <ToolForm
              addToolLibrary={this.addToolLibrary}
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
          </div>
          <div className="tool-container">
            <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
              <Icon name="cogs" style={{ color: "#15CA00" }} />
              <Header.Content>
                Tools
                <Header.Subheader>Manage your tool libraries</Header.Subheader>
              </Header.Content>
            </Header>
            <Card.Group itemsPerRow={4}>
              {this.state.toolLibraries.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  deleteToolLibrary={this.deleteToolLibrary}
                  updateToolLibrary={this.updateToolLibrary}
                />
              ))}
            </Card.Group>
          </div>
        </React.Fragment>
      );
    }
  }
}
