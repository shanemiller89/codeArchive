import React, { Component } from "react";
import {
  Header,
  Image,
  Container,
  List,
  Segment,
  Grid,
  Divider,
  Icon,
  Search,
  Button
} from "semantic-ui-react";
import API from "./modules/API";

export default class Home extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    userInfo: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("users", `id=${this.state.currentUser}`)
      .then(userInfo => (newState.userInfo = userInfo))
      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "7.5em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em" }}>
            <Icon style={{color: "#15CA00"}} name="address card" />
            User Profile
          </Header>
          <br />
        </Container>

        <Segment placeholder style={{marginTop: "5em"}}>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical />

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <div>
                  {this.state.userInfo.map(userInfo => (
                    <div key={userInfo.id}>
                      <Image src={userInfo.profile} size="medium" circular style={{margin: "0 auto"}} />
                      <h2>
                        Username:{" "}
                        <span style={{ color: "#15CA00" }}>
                          {userInfo.username}{" "}
                        </span>{" "}
                      </h2>
                      <h3>Name: {userInfo.name} </h3>
                      <h3>Email: {userInfo.email} </h3>
                    </div>
                  ))}
                </div>
              </Grid.Column>

              <Grid.Column>
              <Header style={{ fontSize: "4em", color: "#15CA00" }}>Stats</Header>
            <List>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Libraries:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Issue Logs:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Code Logs:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Archives:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
            </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
