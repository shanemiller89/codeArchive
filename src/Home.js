import React, { Component } from "react";
import { Header, Image, Container, List, Segment } from "semantic-ui-react";
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
            height: "9em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", color: "#15CA00" }}>
            User Profile
          </Header>
          <br />
        </Container>
        <br />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
          <Segment style={{ width: "30%", height: "60vh", marginTop: "2em", marginLeft: "-5em" }}>
            <div>
              {this.state.userInfo.map(userInfo => (
                <div key={userInfo.id}>
                  <Image src={userInfo.profile} size="medium" circular />
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
          </Segment>
          <Segment style={{ width: "40%", height: "60vh" }}>
            <Header style={{ fontSize: "4em", color: "#15CA00" }}>Stats</Header>
            <List>

            </List>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}
