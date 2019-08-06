import React, { Component, createRef } from "react";
import { Button, Icon, Menu, Segment, Sidebar, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ApplicationViews from "../../ApplicationViews";

// TODO:
// 1.Revisit this, find a way to make side bar stick or fixed
// 2.Add Show/Hide Toggle

const height = {
  marginTop: "5.5em",
  marginLeft: "-1px",
  minHeight: "100vh"
};
export default class SideBar extends Component {
  state = { visible: false };

  // contextRef = createRef()

  toggle = () => this.setState({ visible: !this.state.visible });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div>
        {/* <Sticky context={this.contextRef} pushing> */}
        <Sidebar.Pushable style={height} as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            // onHide={this.handleSidebarHide}
            vertical
            visible={visible}
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
          <Sidebar.Pusher style={{ background: "#F5F5F5", minHeight: "100vh"}}>
          <Button attached="top" onClick={this.toggle} icon="exchange" style={{background: "#1b1c1d", color: "lightgray"}}></Button>
            <ApplicationViews />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        {/* </Sticky> */}
      </div>
    );
  }
}
