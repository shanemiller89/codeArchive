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

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
    fontSize: "1.25em"
  };

export default class Login extends Component {
  render() {
    return (
      <Modal trigger={<Button>Login</Button>} centered={false}>
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
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                    <Button primary fluid size="large">
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
