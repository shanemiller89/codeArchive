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
import API from "../../modules/API"
export default class LanguageArchiveEditForm extends Component {
  state = {
    title: "",
    link: "",
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

  updateExistingArchive = evt => {
    evt.preventDefault();
    const editedArchive = {
      title: this.state.title,
      link: this.state.link,
      id: this.props.archive.archive.id
    };
    this.props.updateArchive(editedArchive);
  };

  // TODO:
  // 1.Add toggle to close Modal

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Dropdown.Item
            icon="pencil"
            description="Edit"
          />
          }
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="file code outline"
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
                      <Button primary fluid size="large" onClick={this.updateExistingArchive}>
                        Submit
                      </Button>
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