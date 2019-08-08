import React, { Component } from "react";
import LoginNavBar from "./LoginNavBar";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Segment, Grid, Header, Icon, Image } from "semantic-ui-react";

export default class Authentication extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginNavBar setAuthState={this.props.setAuthState} />
        <header
          style={{
            background: "#1b1c1d",
            width: "100%",
            height: "40em",
            marginTop: "-2em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Header
            style={{
              fontSize: "5em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon style={{ color: "#15CA00" }} name="database" />
            <span style={{ color: "white" }}>code.</span>
            <span style={{ color: "#15CA00" }}>Archive</span>
          </Header>
          <p
            style={{
              fontSize: "3em",
              color: "white"
            }}
          >
            Witty Tagline Here
          </p>
        </header>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Lorem Ipsum Header
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae enim libero. Ut blandit ex lectus, eget
                  laoreet erat porttitor sit amet. Suspendisse posuere malesuada
                  malesuada. Cras pellentesque magna id mattis gravida. Fusce id
                  est mauris. Donec suscipit semper efficitur. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Aliquam erat volutpat.
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Lorem Ipsum Header
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae enim libero. Ut blandit ex lectus, eget
                  laoreet erat porttitor sit amet.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Icon
                  bordered
                  rounded
                  style={{ fontSize: "20em" }}
                  name="archive"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center" />
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
