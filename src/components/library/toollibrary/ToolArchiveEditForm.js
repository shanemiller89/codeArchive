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
import * as firebase from "firebase/app";
import "firebase/storage";
import API from "../../../modules/API"

export default class ToolArchiveEditForm extends Component {
  state = {
    title: "",
    link: "",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };


  componentDidMount() {
    API.get("archives", this.props.archive.archive.id)
    .then(archive => {
      this.setState({
        title: archive.title,
        link: archive.link,
      });
    });
  }

handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  submit = evt => {
    evt.preventDefault();
    const editedArchive = {
      title: this.state.title,
      link: this.state.link,
      id: this.props.archive.archive.id
    };
    this.props.updateArchive(editedArchive);
    this.toggle()
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
                  name="archive"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Existing Archive
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        value={this.state.title}
                        onChange={this.handleFieldChange}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        value={this.state.link}
                        onChange={this.handleFieldChange}
                        id="link"
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
