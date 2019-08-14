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
import API from "../../modules/API";

export default class ToolEditForm extends Component {
  state = {
    title: "",
    link: "",
    image: null,
    libraryTypeId: null,
    userId: JSON.parse(localStorage.getItem("user")),
    disabled: true,
    checked: false,
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("libraries", this.props.tool.id).then(tool => {
      this.setState({
        title: tool.title,
        link: tool.link,
        image: tool.image,
        libraryTypeId: tool.libraryTypeId,
        userId: this.state.userId
      });
    });
  }

  checkedToggle = () => {
    this.setState({
      checked: !this.state.checked,
      disabled: !this.state.disabled
    });
  };

  storageRef = firebase.storage().ref("library_profiles");

  submitWithImage = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(
      `${this.state.title}-${this.state.userId}`
    );

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(iURL => {
        return this.props.updateToolLibrary({
          title: this.state.title,
          link: this.state.link,
          image: iURL,
          libraryTypeId: this.state.libraryTypeId,
          userId: this.state.userId,
          id: this.props.tool.id
        });
      })
      .then(() => this.toggle());
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  submit = evt => {
    evt.preventDefault();
    const editedTool = {
      title: this.state.title,
      link: this.state.link,
      image: this.state.image,
      libraryTypeId: this.state.libraryTypeId,
      userId: this.state.userId,
      id: this.props.tool.id
    };
    this.props.updateToolLibrary(editedTool);
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
          style={{ width: "36em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="cogs"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Tool
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Tool"
                        onChange={this.handleFieldChange}
                        id="title"
                        value={this.state.title}
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL"
                        onChange={this.handleFieldChange}
                        id="link"
                        value={this.state.link}
                      />
                      <Form.Checkbox
                        fluid
                        width={10}
                        label="Do you want to replace existing image?"
                        checked={this.state.checked}
                        onChange={this.checkedToggle}
                      />
                      <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e =>
                          this.setState({ image: e.target.files[0] })
                        }
                        type="file"
                        id="imageURL"
                        disabled={this.state.disabled}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <Button
                          style={{
                            background: "red",
                            color: "white",
                            width: "10em"
                          }}
                          size="large"
                          onClick={this.toggle}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            background: "#15CA00",
                            color: "white",
                            width: "10em"
                          }}
                          size="large"
                          onClick={
                            this.state.disabled
                              ? this.submit
                              : this.submitWithImage
                          }
                        >
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
