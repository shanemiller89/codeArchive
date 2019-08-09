import React, { Component } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { logout } from '../authentication/userManager';
import {withRouter} from "react-router-dom";
import API from '../../modules/API'

// TODO:
// 1.Add Link hover over logout
// 2. Implement Username Display
// 3.Fix Refresh to logout bug

const archiveColor = {
  color: "#15CA00"
};

const usernameDisplay = {
  fontSize: "1.5em",
  marginRight: "25px"
};

const flexbox = {
    display: "flex",
    flexDirection: "column"
}

class NavBar extends Component {
  state = { 
    activeItem: "", 
    redirect: false,
    currentUser: JSON.parse(localStorage.getItem("user")),
    username: []
   };

   componentDidMount() {
    const newState = {} 
    API.getAll("users", `id=${this.state.currentUser}`)
      .then(username => newState.username = username)
      .then(() => this.setState(newState))
  }

  logUserOut = () => {
    this.setState({ user: null });
    logout();
    this.props.history.push("/")
    window.location.reload();
  }

  render() {
    return (
      <Menu borderless size="huge" fixed="top" stackable inverted>
        <Menu.Item header as="h2">
          <Icon name="database" style={archiveColor} size="large" />
          code.<span style={archiveColor}>Archive</span>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item header as="h3">
          {this.state.username.map(username => <Image src={username.profile} size="mini" circular />)}
          </Menu.Item>
          <Menu.Item>
            <div style={flexbox}>
              <span style={usernameDisplay}>{this.state.username.map(username => username.username)}</span>
              <span onClick={this.logUserOut}>Logout</span>
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(NavBar)
