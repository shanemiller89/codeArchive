import React, { Component } from "react";
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
import { login } from './userManager';


// TODO:
// 1.Form Validation

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
    fontSize: "1.25em"
  };

export default class Login extends Component {

  submit = () => {
    login(this.state.email, this.state.password)
      .then((user) => {
        this.props.setAuthState()
        this.props.onLogin(user);
        // this.props.history.push('/');
      });
  }

  render() {
    return (
      <Modal trigger={<Button style={{ background: "#15CA00", color: "white" }}>Login</Button>} centered={false}>

        <Modal.Content>

            <Header size="huge" textAlign="center">       
            <div><Icon name="database" style={archiveColor} size="large" />
                code.<span style={archiveColor}>Archive</span></div>
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
                    <Button style={{ background: "#15CA00", color: "white" }} fluid size="large" onClick={this.submit}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  Don't have an Account? <a href="#">Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
