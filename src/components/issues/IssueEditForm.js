import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Dropdown
} from "semantic-ui-react";
import API from "../../modules/API"

export default class IssueEditForm extends Component {
  state = {
    title: "",
    reference: "",
    logTypeId: "",
    userId: "",
    issueId: "",
    archiveId: "",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("logs", this.props.issueId)
    .then(issue => {
      this.setState({
        title: issue.title,
        reference: issue.reference,
        logTypeId: issue.logTypeId,
        userId: issue.userId
      });
    });
  }


// Update Existing Log //
  submit = () => {
    const editedIssue = {
      title: this.state.title,
      reference: this.state.reference,
      logTypeId: this.state.logTypeId,
      userId: this.state.userId,
      id: this.props.issueId
    }
    const editedArchive = {
      title: this.state.title,
      link: "",
      id: this.props.archiveId
    };
    this.props.updateIssue(editedIssue, editedArchive)
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Dropdown.Item
            icon="pencil"
            description="Edit"
            onClick={this.toggle}
          />
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
              Edit Existing Issue
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                        value={this.state.title}
                      />
                      <Form.Input
                        fluid
                        onChange={e => this.setState({ reference: e.target.value })}
                        id="reference"
                        value={this.state.reference}
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
