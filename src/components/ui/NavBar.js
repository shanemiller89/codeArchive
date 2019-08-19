import React, { Component } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { logout } from "../authentication/userManager";
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";
import API from "../../modules/API";
import "./UI.css"

// TODO:
// 1.Add Link hover over logout
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
};

class NavBar extends Component {
  state = {
    activeItem: "",
    redirect: false,
    currentUser: JSON.parse(localStorage.getItem("user")),
    username: [],
    visible: false
  };

  toggle = () => {
    console.log("I've been clicked");
    this.setState({ visible: !this.state.visible });
  };

  toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  componentDidMount() {
    const newState = {};
    API.getAll("users", `id=${this.state.currentUser}`)
      .then(username => (newState.username = username))
      .then(() => this.setState(newState));
  }

  logUserOut = () => {
    this.setState({ user: null });
    logout();
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <Menu borderless size="huge" fixed="top" stackable inverted>
          <Menu.Item>
            <Icon className="link" name="bars" size="large" onClick={this.toggle} />
          </Menu.Item>
          <Menu.Item header as="h2">
            <Icon name="database" style={archiveColor} size="large" />
            code.<span style={archiveColor}>Archive</span>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item header as="h3">
              {this.state.username.map(username => (
                <Image src={username.profile} size="mini" circular />
              ))}
            </Menu.Item>
            <Menu.Item>
              <div style={flexbox}>
                <span style={usernameDisplay}>
                  {this.state.username.map(username => username.username)}
                </span>
                <span className="link" onClick={this.logUserOut}>Logout</span>
              </div>
            </Menu.Item>
            <Menu.Item vertical>
              {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}> */}
                <Icon
                  className="link"
                  name="angle double up"
                  size="big"
                  onClick={this.toTop}
                />
                {/* <span style={{ fontSize: ".8em", marginTop: ".1em" }}>
                  Top
                </span> */}
              {/* </div> */}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <SideBar visible={this.state.visible} />
      </React.Fragment>
    );
  }
}

export default withRouter(NavBar);
