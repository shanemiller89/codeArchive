import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid
} from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class EditProfileImageForm extends Component {
  state = {
    profile: "",
    Id: this.props.currentUser,
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  storageRef = firebase.storage().ref("profile_picture");

  submit = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(
      `${this.props.coder.user.username}`
    );

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(imageURL => {
        return this.props.updateProfileImage({
          profile_image: imageURL,
          id: this.props.coder.id
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
              <Button
                style={{ background: "#15CA00", color: "white" }}
                icon
                onClick={this.toggle}
              >
                <Icon name="user" />
                Change Profile Picture
              </Button>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon name="user" size="large" style={{ color: "#15CA00" }} />
              </div>
              Change Profile Picture
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e =>
                          this.setState({ image: e.target.files[0] })
                        }
                        type="file"
                        id="imageURL"
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
