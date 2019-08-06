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

export default class SnippetEditForm extends Component {
  state = {
    title: "",
    text: "",
    image: null,
    archiveId: "",
    recordTypeId: 2,
  };

  componentDidMount() {
    API.get("records", this.props.snippetId)
    .then(snippet => {
      this.setState({
        title: snippet.title,
        text: snippet.text,
        image: snippet.image,
        archiveId: snippet.archiveId,
        recordTypeId: snippet.recordTypeId,
      });
    });
  }

  submit = () => {
    const editedSnippet = {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
        archiveId:this.state.archiveId,
        recordTypeId: this.state.recordTypeId,
        id: this.props.snippetId

    };
    this.props.updateLanguageSnippet(editedSnippet)

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
            <Dropdown.Item
            icon="pencil"
            description="Edit"
          />
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
              Edit an Existing Archive Code Snippet
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
                        value={this.state.title}
                      />
                      <Form.TextArea
                        fluid
                        rows="10"
                        placeholder="Insert Code"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
                        value={this.state.text}
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
