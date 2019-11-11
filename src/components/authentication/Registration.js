import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/useSimpleAuth";
import * as firebase from "firebase/app";
import "firebase/storage";
import {
  Modal,
  Button,
  Header,
  Icon,
  Container,
  Form,
  Segment,
  Grid
} from "semantic-ui-react";

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
  fontSize: "1.25em"
};

const Register = props => {
  const [checked, setIsChecked] = useState(false);
  const [disabled, setIsDisabled] = useState(true);
  const [profile_image, setProfileImage] = useState("");
  const [detail, setUserDetail] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: ""
  });
  const { register } = useSimpleAuth();

  const checkedToggle = () => {
    setIsChecked(!checked);
    setIsDisabled(!disabled);
  };

  const storageRef = firebase.storage().ref("profile_picture");

  const submitWithImage = () => {
    const ref = storageRef.child(detail.username);

    return ref
      .put(profile_image)
      .then(data => data.ref.getDownloadURL())
      .then(imageUrl => {
        if (detail.password !== detail.verifyPassword) {
          alert("Your passwords do not match. Please check your passwords.");
        } else {
          const user = {
            username: detail.username,
            email: detail.email,
            password: detail.password,
            first_name: detail.firstName,
            last_name: detail.lastName,
            profile_image: imageUrl
          };
          register(user)
            .catch(error => {
              alert("Username or email already in use!");
            })
            .then(() => {
              props.history.push({
                pathname: "/home"
              })
              window.location.reload(true);
            });
        }
      });
  };

  const submit = () => {
    if (detail.password !== detail.verifyPassword) {
      alert("Your passwords do not match. Please check your passwords.");
    } else {
      const user = {
        username: detail.username,
        email: detail.email,
        password: detail.password,
        first_name: detail.firstName,
        last_name: detail.lastName,
        profile_image: profile_image
      };
      register(user)
        .catch(error => {
          alert("Username or Email is already in use!");
        })
        // .then(() => {
        //   props.history.push({
        //     pathname: "/home"
        //   })
        //   window.location.reload(true);
        // });
    }
  };

  return (
    <Modal
      trigger={
        <Button style={{ background: "#15CA00", color: "white" }}>
          Sign Up
        </Button>
      }
      centered={false}
    >
      <Modal.Content>
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
                    icon="address card"
                    iconPosition="left"
                    placeholder="First Name"
                    onChange={e =>
                      setUserDetail({
                        username: detail.username,
                        firstName: e.target.value,
                        lastName: detail.lastName,
                        email: detail.email,
                        password: detail.password,
                        verifyPassword: detail.verifyPassword
                      })
                    }
                  />
                  <Form.Input
                    icon="address card"
                    iconPosition="left"
                    placeholder="Last Name"
                    onChange={e =>
                      setUserDetail({
                        username: detail.username,
                        firstName: detail.firstName,
                        lastName: e.target.value,
                        email: detail.email,
                        password: detail.password,
                        verifyPassword: detail.verifyPassword
                      })
                    }
                  />
                  <Form.Input
                    required
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    onChange={e =>
                      setUserDetail({
                        username: e.target.value,
                        firstName: detail.firstName,
                        lastName: detail.lastName,
                        email: detail.email,
                        password: detail.password,
                        verifyPassword: detail.verifyPassword
                      })
                    }
                  />
                  <Form.Input
                    required
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={e =>
                      setUserDetail({
                        username: detail.username,
                        firstName: detail.firstName,
                        lastName: detail.lastName,
                        email: e.target.value,
                        password: detail.password,
                        verifyPassword: detail.verifyPassword
                      })
                    }
                  />
                  <Form.Input
                    required
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={e =>
                      setUserDetail({
                        username: detail.username,
                        firstName: detail.firstName,
                        lastName: detail.lastName,
                        email: detail.email,
                        password: e.target.value,
                        verifyPassword: detail.verifyPassword
                      })
                    }
                  />
                  <Form.Input
                    required
                    icon="lock"
                    iconPosition="left"
                    placeholder="Verify Password"
                    type="password"
                    onChange={e =>
                      setUserDetail({
                        username: detail.username,
                        firstName: detail.firstName,
                        lastName: detail.lastName,
                        email: detail.email,
                        password: detail.password,
                        verifyPassword: e.target.value
                      })
                    }
                  />
                  <Form.Checkbox
                    width={6}
                    label="Do you want to include a Profile Image?"
                    checked={checked}
                    onChange={checkedToggle}
                  />
                  <Form.Input
                    icon="image"
                    iconPosition="left"
                    placeholder="Upload Profile Pick"
                    type="file"
                    onChange={e => setProfileImage(e.target.files[0])}
                    id="imageURL"
                    disabled={disabled}
                  />
                  <Button
                    style={{ background: "#15CA00", color: "white" }}
                    size="large"
                    onClick={
                      (detail.username === "") |
                      (detail.email === "") |
                      (detail.password === "")
                        ? null
                        : disabled
                        ? submit
                        : submitWithImage
                    }
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default withRouter(Register);
