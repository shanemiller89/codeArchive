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

export default class ToolForm extends Component {
  state = {
    title: "",
    link: "",
    image: "",
    image_title: "",
    parent_library_id: null,
    library_type_id: 2,
    openForm: false,
    disabled: true,
    checked: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

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
      .then(imageURL => {
        return this.props.addToolLibrary({
          title: this.state.title,
          link: this.state.link,
          image: imageURL,
          image_title: `${this.state.title}-${this.state.userId}`,
          parent_library_id: this.state.parent_library_id,
          library_type_id: 2,
        });
      })
      .then(() => this.toggle());
  };

  submit = () => {
    const newTool = {
      title: this.state.title,
      link: this.state.link,
      image: "",
      image_title: "",
      parent_library_id: this.state.parent_library_id,
      library_type_id: 2,
    };
    this.props.addToolLibrary(newTool);
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button
                style={{ background: "#15CA00", color: "white" }}
                icon
                onClick={this.toggle}
              >
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Tool Library
              </Label>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content fluid>
            <Header size="huge" textAlign="center">
              <div>
                <Icon name="cogs" size="large" style={{ color: "#15CA00" }} />
              </div>
              Add A New Tool
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Tool"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Checkbox
                        fluid
                        width={12}
                        label="Do you want to upload the Tool Logo?"
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
                          onClick={this.state.disabled ? this.submit : this.submitWithImage}
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
