import React, { Component } from "react";
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
import { register } from './userManager'

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
  fontSize: "1.25em"
};

export default class Register extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    name: "",
    profile: ""
  };

  submit = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      profile: ""
    }

    register(user)
      .then((user) => {
        this.props.onRegister(user);
        this.props.setAuthState()
        // this.props.history.push('/');
      });
  }


  render() {
    return (
      <Modal trigger={<Button>Sign Up</Button>} centered={false}>
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
                      fluid
                      icon="address card"
                      iconPosition="left"
                      placeholder="Full Name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="E-mail address"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon="image"
                      iconPosition="left"
                      placeholder="Upload Profile Pick"
                      type="file"
                    />
                    <Button primary fluid size="large" onClick={this.submit}>
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
  }
}
