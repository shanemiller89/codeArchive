import React, { Component } from "react";
import { Button, Menu, Icon } from "semantic-ui-react";

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
export default class NavBar extends Component {
  state = { activeItem: "", redirect: false };


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
              <a>Logout</a>
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

// export default withRouter(NavBar)