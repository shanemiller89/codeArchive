import React, { Component } from "react";
import { Header, Icon, Grid, Container } from "semantic-ui-react";
import API from "../../modules/API"
import LanguageCard from "./LanguageCard";
import LanguageForm from "./LanguageForm";

export default class Library extends Component {
  state = {
    librarys: [],
    currentUser: JSON.parse(localStorage.getItem("user")),
  }
 

  componentDidMount() {
   
    const newState = {};
    API.getAll("librarys", `userId=${this.state.currentUser}&libraryTypeId=1`)
      .then(librarys => (newState.librarys = librarys))
      .then(() => this.setState(newState));
      console.log("where you go?", newState)
   
  }

  addLanguageLibrary = data => {
    API.post("librarys", data)
      .then(() => API.getAll("librarys", `userId=${this.state.currentUser}&libraryTypeId=1`))
      .then(librarys =>
        this.setState({
          librarys: librarys
        })
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
          }}>

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
          <Grid
            fluid
            columns={4}
            style={{ marginLeft: "25px", marginRight: "25px" }}
          >
            {this.state.librarys.map(language => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  // deleteLanguage={this.props.deleteLanguage}
                  // updateLanguage={this.props.updateLanguage}
                />
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
