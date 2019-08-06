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

export default class LanguageNoteForm extends Component {
  state = {
    title: "",
    text: "",
    image: null,
    archiveId: parseInt(this.props.archiveId),
    recordTypeId: 1,
    disabled: true,
    checked: false
  };

  checkedToggle = () => {
    this.setState({ checked: !this.state.checked, disabled: !this.state.disabled });
  }

  storageRef = firebase.storage().ref("archive_images");

  submitWithImage = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(`${this.state.title}-${this.state.archiveId}`);

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(imageURL => {
        return this.props.addLanguageNote({
          title: this.state.title,
          text: this.state.text,
          image: imageURL,
          archiveId:this.state.archiveId,
          recordTypeId: this.state.recordTypeId,
        });
      });
    // .then(() => this.props.history.push('/'));
  };

  submit = () => {
    const note = {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
        archiveId:this.state.archiveId,
        recordTypeId: this.state.recordTypeId,

    };
    this.props.addLanguageNote(note)

    // this.toggle();
    //--This toggle will close the Modal upon click --//
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
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Archive Note
              </Label>
            </Button>
          }
          style={{ width: "45em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="sticky note"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add a new Archive Note
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Title of note (What is the note about?)"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.TextArea
                        fluid
                        rows="10"
                        placeholder="Insert Text for Note"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
                      />
                      <Form.Checkbox
                      fluid
                      width={8}
                      label="Do you want to include an Image?"
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
                      <Button primary fluid size="large" onClick={this.state.disabled ? this.submit : this.submitWithImage}>
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
