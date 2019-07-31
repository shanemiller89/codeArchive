import React, { Component, createRef } from "react";
import { Button, Icon, Menu, Segment, Sidebar, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ApplicationViews from "../../ApplicationViews";

// TODO:
// 1.Revisit this, find a way to make side bar stick or fixed
// 2.Add Show/Hide Toggle

const height = {
  marginTop: "45px",
  height: "150vh"
};
export default class SideBar extends Component {
  state = { visible: false };

  contextRef = createRef()

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>
        <Sticky context={this.contextRef} pushing>
        <Sidebar.Pushable style={height} as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={true}
            width="thin"
            size="huge"
          >
            <Link to="/">
              <Menu.Item>
                <Icon name="home" />
                Home
              </Menu.Item>
            </Link>
            <Link to="/library">
              <Menu.Item>
                <Icon name="book" />
                Library
              </Menu.Item>
            </Link>
            <Link to="/issues">
              <Menu.Item>
                <Icon name="dont" />
                Issues
              </Menu.Item>
            </Link>
            <Link to="/code">
              <Menu.Item>
                <Icon name="code" />
                Code
              </Menu.Item>
            </Link>
          </Sidebar>

          <Sidebar.Pusher style={{ background: "#F5F5F5"}}>
            <ApplicationViews />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </Sticky>
      </div>
    );
  }
}
