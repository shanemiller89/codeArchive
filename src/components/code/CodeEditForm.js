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

export default class CodeEditForm extends Component {
  state = {
    title: "",
    reference: "",
    logTypeId: "",
    userId: "",
    codeId: "",
    archiveId: ""
  };

  componentDidMount() {
    API.get("logs", this.props.codeId)
    .then(code => {
      this.setState({
        title: code.title,
        reference: code.reference,
        logTypeId: code.logTypeId,
        userId: code.userId
      });
    });
  }


// Update Existing Log //
  submit = () => {
    const editedCode = {
      title: this.state.title,
      reference: this.state.reference,
      logTypeId: this.state.logTypeId,
      userId: this.state.userId,
      id: this.props.codeId
    }
    const editedArchive = {
      title: this.state.title,
      link: "",
      id: this.props.archiveId
    };
    this.props.updateCode(editedCode, editedArchive)
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
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="dont"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Existing Code Archive
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                        value={this.state.title}
                      />
                      <Form.Input
                        fluid
                        onChange={e => this.setState({ reference: e.target.value })}
                        id="reference"
                        value={this.state.reference}
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
