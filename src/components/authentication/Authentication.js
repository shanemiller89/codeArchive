import React, { Component } from "react";
import LoginNavBar from "./LoginNavBar";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  Segment,
  Grid,
  Header,
  Icon,
  Message,
  Responsive
} from "semantic-ui-react";

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
          <Responsive minWidth={480}>
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
          </Responsive>
          <Responsive maxWidth={480}>
            <Header
              style={{
                fontSize: "3em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: ".5em"
              }}
            >
              <Icon style={{ color: "#15CA00" }} name="database" />
              <span style={{ color: "white" }}>code.</span>
              <span style={{ color: "#15CA00" }}>Archive</span>
            </Header>
          </Responsive>
          <Responsive minWidth={480}>
            <p
              style={{
                fontSize: "3em",
                color: "white"
              }}
            >
              All your resources . All in one place
            </p>
          </Responsive>
          <Responsive maxWidth={480}>
          <p
            style={{
              fontSize: "1.5em",
              color: "white"
            }}
          >
            All your resources . All in one place
          </p>
          </Responsive>
        </header>
        <Segment>
          <Message negative>
            <Message.Header>
              THIS APP IS CURRENTLY IN TESTING STAGES
            </Message.Header>
            <p>
              This app is only in testing phase. Please know your archives will
              be lost upon alpha deployment. Report bugs{" "}
              <a href="https://github.com/shanemiller89/codeArchive/issues">
                here.
              </a>
            </p>
          </Message>
        </Segment>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h2" style={{ fontSize: "2em", color: "#15CA00" }}>
                  Archive all your Resources
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <strong>
                    code.<span style={{ color: "#15CA00" }}>Archive</span>
                  </strong>{" "}
                  allows the software developer to archive and organize all of
                  their informational resources in a centralized location, in an
                  organized fashion. Separate your resources through Libraries
                  by Language, Tools, and Sub-Languages. Then archive different
                  concepts, and other related information in archives associated
                  with those libraries.
                </p>
                <Header as="h2" style={{ fontSize: "2em", color: "#15CA00" }}>
                  Save useful Code and more...
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  More than just resources, the software developer needs to be
                  able to save useful code, or issues they've encountered.
                  <strong>
                    {" "}
                    code.<span style={{ color: "#15CA00" }}>Archive</span>
                  </strong>{" "}
                  lets you accomplish just that. Never dig through old projects,
                  or Stack Overflow for that one forum post again. Now you can
                  save it all right here.
                </p>
              </Grid.Column>
              <Responsive minWidth={480}>
              <Grid.Column floated="right" width={6}>
                <Icon
                  bordered
                  rounded
                  style={{
                    fontSize: "20em",
                    boxShadow: "none",
                    color: "#15CA00"
                  }}
                  name="archive"
                />
              </Grid.Column>
              </Responsive>
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
