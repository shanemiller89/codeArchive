import React, { Component } from "react";
import { Menu, Icon, Responsive } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Registration";

const archiveColor = {
  color: "#15CA00"
};

export default class NavBar extends Component {
  state = { activeItem: "", redirect: false };

  render() {
    return (
      <Menu borderless size="huge" inverted>
        <Responsive minWidth={480}>
        <Menu.Item header as="h2">
          <Icon name="database" style={archiveColor} size="large" />
          code.<span style={archiveColor}>Archive</span>
        </Menu.Item>
        </Responsive>

        <Menu.Menu position="right">
          <Menu.Item><Login/></Menu.Item>
          <Menu.Item><Register/></Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
