import React, { Component } from "react";
import { Header, Icon, Grid } from "semantic-ui-react";
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
        <div style={placeHolder} />
        <div className="language-container">
        <Header as="h1" icon style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon style={{ color: "#15CA00" }} name="file code outline" />
          Languages
        </Header>
        <Grid style={{margin: 20}}>
            {this.props.languages.map(language => (
              <LanguageCard language={language}/>
            ))}
        </Grid>
        </div>
      </React.Fragment>
    );
  }
}
