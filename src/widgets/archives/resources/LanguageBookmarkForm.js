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

export default class LanguageBookmarkForm extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    image: null,
    archiveId: this.props.archiveId,
    resourceTypeId: 1,

  };

  submit = () => {
    const bookmark = {
      title: this.state.title,
      link: this.state.link,
      description: this.state.description,
      image: this.state.image,
      archiveId: this.state.archiveId,
      resourceTypeId: this.state.resourceTypeId,

    };
    this.props.addLanguageBookmark(bookmark)

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
          <Button style={{ background: "#15CA00", color: "white", marginLeft: "30em", borderRadius: "100%" }} size="mini" icon>
            <Icon name="plus" />
            </Button>
          }
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
              Add A New Bookmark
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Name of Website or Article"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="URL of Resource"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                    <Form.Input
                        fluid
                        placeholder="Description (optional)"
                        onChange={e => this.setState({ description: e.target.value })}
                        id="description"
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