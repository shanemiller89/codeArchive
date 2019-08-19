import React, { Component, createRef } from "react";
import { Button, Icon, Menu, Segment, Sidebar, Sticky } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ApplicationViews from "../../ApplicationViews";
import Footer from "./Footer";
import "./UI.css"

// TODO:
// 1.Revisit this, find a way to make side bar stick or fixed
// 2.Add Show/Hide Toggle

const height = {
  marginTop: "5.5em",
  marginLeft: "-1px",
  minHeight: "100vh"
};
export default class SideBar extends Component {

  render() {

    return (
      <div>
        <Sidebar.Pushable style={height} as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            vertical
            visible={this.props.visible}
            width="thin"
            size="huge"
          >
            <Link to="/">
              <Menu.Item>
                <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="home" />
                Home
                </div>
              </Menu.Item>
            </Link>
            <Link to="/library">
              <Menu.Item>
              <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="book" />
                Library
                </div>
              </Menu.Item>
            </Link>
            <Link to="/issues">
              <Menu.Item>
              <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="dont" />
                Issues
                </div>
              </Menu.Item>
            </Link>
            <Link className="link" to="/code">
              <Menu.Item>
              <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="code" />
                Code
                </div>
              </Menu.Item>
            </Link>
            <Link to="/articles">
              <Menu.Item>
              <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="newspaper" />
                Articles
                </div>
              </Menu.Item>
            </Link>
            <Link to="/events">
              <Menu.Item>
              <div className="link" style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Icon size="big" name="calendar alternate" />
                Events
                </div>
              </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher style={{ background: "#F5F5F5", minHeight: "100vh"}}>
            <ApplicationViews />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    );
  }
}
