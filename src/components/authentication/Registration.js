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

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
    fontSize: "1.25em"
  };

export default class Register extends Component {
  render() {
    return (
      <Modal trigger={<Button>Sign Up</Button>} centered={false}>
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
                      icon="address card"
                      iconPosition="left"
                      placeholder="Full Name"
                    />
                  <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                    />
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
