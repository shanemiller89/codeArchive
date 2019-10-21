import React, { useState, useEffect } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import useSimpleAuth from "../../hooks/useSimpleAuth"
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";
import API from "../../modules/API";
import "./UI.css"

// TODO:
// 1.Add Link hover over logout
// 3.Fix Refresh to logout bug
//FIX LOGOUT

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

const NavBar = (props) => {
  const { logout } = useSimpleAuth();
  const [coder, setCoder] = useState({ user: {} });
  const [visible, setVisible] = useState(false)

  // state = {
  //   activeItem: "",
  //   redirect: false,
  // };

  const toggle = () => {
    setVisible(!visible);
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const getCoder = () => {
    API.getAll("coders/profile")
      .then(data => {
        setCoder(data);
      });
  };

  useEffect(getCoder, []);

  const logUserOut = () => {
    logout();
    props.history.push("/");
    window.location.reload();
  };

    return (
      <React.Fragment>
        <Menu borderless size="huge" fixed="top" stackable inverted>
          <Menu.Item>
            <Icon className="link" name="bars" size="large" onClick={toggle} />
          </Menu.Item>
          <Menu.Item header as="h2">
            <Icon name="database" style={archiveColor} size="large" />
            code.<span style={archiveColor}>Archive</span>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item header as="h3">
              {
                coder.profile_image === "" ? <Image src="https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Fprofile_placeholder.png?alt=media&token=a47e94d2-94b5-419c-8da3-9ccb382d5f70" size="mini" circular /> :
                <Image src={coder.profile_image} size="mini" circular />
              }
            </Menu.Item>
            <Menu.Item>
              <div style={flexbox}>
                <span style={usernameDisplay}>
                  {coder.user.username}
                </span>
                <span className="link" onClick={logUserOut}>Logout</span>
              </div>
            </Menu.Item>
            <Menu.Item vertical>
                <Icon
                  className="link"
                  name="angle double up"
                  size="big"
                  onClick={toTop}
                />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <SideBar visible={visible} />
      </React.Fragment>
    );
}

export default withRouter(NavBar);
