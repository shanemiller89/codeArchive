import React, { Component } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";

export default class Footer extends Component {
  render() {
    return (
      <Menu borderless size="huge" fixed="bottom" widths={1} inverted>
        <Menu.Item>
          code.Archive<Icon name="copyright outline" style={{marginLeft: ".5em", color: "#15CA00"}} />
        </Menu.Item>
      </Menu>
    );
  }
}
