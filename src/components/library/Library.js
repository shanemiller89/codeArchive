import React, { Component } from "react";
import {
  Header,
  Icon,
  Grid,
  Container,
} from "semantic-ui-react";
import LanguageCard from "./LanguageCard";
import LanguageForm from "./LanguageForm";

export default class Library extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "20em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", color: "#15CA00" }}>Library</Header>

          <LanguageForm
            addLanguage={this.props.addLanguage}
            currentUser={this.props.currentUser}
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
          <Grid columns={4} style={{marginLeft: "25px", marginRight: "25px"}} fluid >
            {this.props.languages.map(language => (
              <LanguageCard key={language.id} language={language} deleteLanguage={this.props.deleteLanguage} updateLanguage={this.props.updateLanguage} />
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
