import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Label
} from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class IssueForm extends Component {
  state = {
    title: "",
    reference: "",
    logTypeId: 1,
    userId: JSON.parse(localStorage.getItem("user")),
    newIssueId: "",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  submit = () => {
    const issue = {
      title: this.state.title,
      reference: this.state.reference,
      logTypeId: this.state.logTypeId,
      userId: this.state.userId
    };
    this.props.addIssue(issue)
    .then(newIssue => this.setState({newIssueId: newIssue.id}))
    .then(() => this.props.addArchive({title: this.state.title, link: ""}))
    .then(newArchive =>
      this.props.addIssueArchive({logId: this.state.newIssueId, archiveId: newArchive.id})
      )
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button style={{ background: "#15CA00", color: "white" }} icon onClick={this.toggle}>
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Issue Log
              </Label>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="dont"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Issue
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Title for Issue"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Language, Program or Reference related to Issue"
                        onChange={e => this.setState({ reference: e.target.value })}
                        id="reference"
                      />
                      <div style={{display: "flex", justifyContent: "space-evenly"}}>
                      <Button style={{ background: "red", color: "white", width: "10em" }}size="large" onClick={this.toggle}>
                        Cancel
                      </Button>
                      <Button style={{ background: "#15CA00", color: "white", width: "10em" }} size="large" onClick={this.submit}>
                        Submit
                      </Button>
                      </div>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
