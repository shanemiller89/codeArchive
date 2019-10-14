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

export default class VideoForm extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    archive_id: parseInt(this.props.archiveId),
    resource_type_id: 2,
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  submit = () => {
    const video = {
      title: this.state.title,
      link: this.state.link,
      description: this.state.description,
      archive_id: this.state.archive_id,
      resource_type_id: this.state.resource_type_id
    };
    this.props.addVideo(video);
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right" size="tiny" style={{marginLeft: "31.5em"}}>
              <Button style={{ background: "#15CA00", color: "white" }} icon size="tiny" onClick={this.toggle}>
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Video
              </Label>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon name="video" size="large" style={{ color: "#15CA00" }} />
              </div>
              Add A New Video
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Name of Video"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="URL of Resource"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.TextArea
                        fluid
                        placeholder="Description (optional)"
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                        id="description"
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
