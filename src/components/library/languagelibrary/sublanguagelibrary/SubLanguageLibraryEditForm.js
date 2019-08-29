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
import API from "../../../../modules/API";

// TODO:
// 1.Handle image editing

export default class subLanguageLibraryEditForm extends Component {
  state = {
    title: "",
    link: "",
    image: "",
    image_title: "",
    libraryId: "",
    userId: JSON.parse(localStorage.getItem("user")),
    disabled: true,
    checked: false,
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("subLanguageLibraries", this.props.subLanguage.id).then(
      subLanguage => {
        this.setState({
          title: subLanguage.title,
          link: subLanguage.link,
          image: subLanguage.image,
          image_title: subLanguage.image_title,
          libraryId: subLanguage.libraryId,
          userId: this.state.userId
        });
      }
    );
  }

  checkedToggle = () => {
    this.setState({
      checked: !this.state.checked,
      disabled: !this.state.disabled
    });
  };

  storageRef = firebase.storage().ref("sub_library_profiles");

  submitWithImage = () => {
    //deletes old image
    const storageRef = firebase.storage().ref("sub_library_profiles");
    const imageRef = storageRef.child(
      `${this.props.subLanguage.image_title}`
    );
    imageRef.delete().then(function() {
      console.log("Image Deleted")
    })
    //will determine name of storage reference
    const ref = this.storageRef.child(
      `${this.state.title}-${this.state.userId}`
    );

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(iURL => {
        return this.props.updateSubLanguageLibrary({
          title: this.state.title,
          link: this.state.link,
          image: iURL,
          image_title: `${this.state.title}-${this.state.userId}`,
          libraryId: this.state.libraryId,
          userId: this.state.userId,
          id: this.props.subLanguage.id
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
    const editedLanguage = {
      title: this.state.title,
      link: this.state.link,
      image: this.state.image,
      image_title: this.state.image_title,
      libraryId: this.state.libraryId,
      userId: this.state.userId,
      id: this.props.subLanguage.id
    };
    this.props.updateSubLanguageLibrary(editedLanguage);
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
                  name="file code outline"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Sub-Language
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Sub-Language"
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
