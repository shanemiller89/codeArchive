import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Modal,
  Button,
  Header,
  Icon,
  Message,
  Form,
  Segment,
  Grid,
  Container
} from "semantic-ui-react";
// import { login } from "./userManager";
import Register from "./Registration";
import useSimpleAuth from "../../hooks/useSimpleAuth";

// TODO:
// 1.Form Validation

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
  fontSize: "1.25em"
};

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useSimpleAuth();

  const submit = () => {
    const credentials = {
      username: username,
      password: password
    };
    login(credentials)
    .then(() => {
      if (isAuthenticated()) {
        props.history.push({
          pathname: "/home"
        });
        window.location.reload(true);
      } else {
        alert("Wrong Username or Password");
      }
    });
  };

  return (
    <Modal
      trigger={
        <Button style={{ background: "#15CA00", color: "white" }}>Login</Button>
      }
      centered={false}
    >
      <Modal.Content fluid>
        <Header size="huge" textAlign="center">
          <div>
            <Icon name="database" style={archiveColor} size="large" />
            code.<span style={archiveColor}>Archive</span>
          </div>
        </Header>
        <Container textAlign="center">
          <p style={textLarge}>All your resources</p>
          <p style={textLarge}>All in one place</p>
          <br />
        </Container>

        <Modal.Description>
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    required
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                  />
                  <Form.Input
                    required
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button
                    style={{ background: "#15CA00", color: "white" }}
                    fluid
                    size="large"
                    onClick={username === "" || password === "" ? null : submit}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Don't have an Account? Be Sure to{" "}
                <span style={{ marginLeft: "1em" }}>
                  <Register />
                </span>
              </Message>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default withRouter(Login);
