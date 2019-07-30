import React, { Component } from "react";
import { Button, Menu, Icon } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Registration";

const archiveColor = {
  color: "#15CA00"
};

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
          <Menu.Item><Login setAuthState={this.props.setAuthState} onLogin={(user) => this.setState({ user: user }) }/></Menu.Item>
          <Menu.Item><Register setAuthState={this.props.setAuthState} onRegister={(user) => this.setState({ user: user })}/></Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
