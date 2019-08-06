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

export default class LanguageSnippetForm extends Component {
  state = {
    title: "",
    text: "",
    image: null,
    archiveId: parseInt(this.props.archiveId),
    recordTypeId: 2,
  };

  submit = () => {
    const snippet = {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
        archiveId:this.state.archiveId,
        recordTypeId: this.state.recordTypeId,

    };
    this.props.addLanguageSnippet(snippet)

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
                Archive Code Snippet
              </Label>
            </Button>
          }
          style={{ width: "45em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="code"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add a new Archive Code Snippet
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Title of snippet (What is the snippet about?)"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.TextArea
                        fluid
                        rows="10"
                        placeholder="Insert Code"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
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
