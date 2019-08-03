import React, { Component } from "react";
import { Header, Image } from "semantic-ui-react";
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
      <div>
        <Header as="h1">User Profile</Header>
        <br />
        <div>
          {this.state.userInfo.map(userInfo => (
            <div key={userInfo.id}>
              <Image src={userInfo.profile} size="medium" circular />
              <h2 style={{color: "#15CA00"}}>{userInfo.username} </h2>
              <h3>{userInfo.name} </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
