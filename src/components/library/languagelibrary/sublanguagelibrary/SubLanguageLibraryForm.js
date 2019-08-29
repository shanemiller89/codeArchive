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

export default class SubLanguageLibraryForm extends Component {
  state = {
    title: "",
    link: "",
    image: null,
    image_title: "",
    libraryId: "",
    userId: this.props.currentUser,
    openForm: false,
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  storageRef = firebase.storage().ref("sub_library_profiles");

  submit = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(`${this.state.title}-${this.state.userId}`);

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(iURL => {
        return this.props.addSubLanguageLibrary({
          title: this.state.title,
          link: this.state.link,
          image: iURL,
          image_title: `${this.state.title}-${this.state.userId}`,
          libraryId: this.props.languageId,
          userId: this.props.currentUser
        });
      })
      .then(() => this.toggle());
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
                Sub-Language Library
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
                  name="file code outline"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Sub-Language
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Sub-Language"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e =>
                          this.setState({ image: e.target.files[0] })
                        }
                        type="file"
                        id="image"
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
