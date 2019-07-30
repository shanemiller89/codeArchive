import React, { Component } from "react";
import { Menu, Icon, Button } from "semantic-ui-react";
import { logout } from '../authentication/userManager';

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

let username = localStorage.getItem("user")
username =  JSON.parse(username)
export default class NavBar extends Component {
  state = { activeItem: "", redirect: false };

  logUserOut = () => {
    this.setState({ user: null });
    logout();
  }


  render() {
    return (
      <Menu borderless size="huge">
        <Menu.Item header as="h2">
          <Icon name="database" style={archiveColor} size="large" />
          code.<span style={archiveColor}>Archive</span>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item header as="h3">
            <Icon name="user circle" size="big" />
          </Menu.Item>
          <Menu.Item>
            <div style={flexbox}>
              <span style={usernameDisplay}>Username</span>
              <span onClick={this.logUserOut}>Logout</span>
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

// export default withRouter(NavBar)
