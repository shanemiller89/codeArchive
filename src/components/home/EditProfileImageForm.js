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

export default class EditProfileImageForm extends Component {
  state = {
    username: "",
    email: "",
    name: "",
    profile: "",
    Id: this.props.currentUser
  };

  storageRef = firebase.storage().ref("library_profiles");

  submit = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(`${this.state.title}-${this.state.userId}`);

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(imageURL => {
        return this.props.updateProfile({
          username: this.props.userInfo.username,
          email: this.props.userInfo.email,
          name: this.props.userInfo.name,
          profile: imageURL,
          id: this.props.userInfo.id
        });
      });
    // .then(() => this.props.history.push('/'));
  };

  // TODO:
  // 1.Add toggle to close Modal

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button style={{ background: "#15CA00", color: "white" }} icon>
                <Icon name="user" />
                Change Profile Picture
              </Button>
            </Button>
          }
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="user"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
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
                      <Button primary fluid size="large" onClick={this.submit}>
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
