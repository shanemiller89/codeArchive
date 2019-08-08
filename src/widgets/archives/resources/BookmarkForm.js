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

export default class BookmarkForm extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    image: null,
    archiveId: parseInt(this.props.archiveId),
    resourceTypeId: 1,
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
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
    this.props.addBookmark(bookmark)
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
          <Button style={{ background: "#15CA00", color: "white", marginLeft: "30em", borderRadius: "100%" }} size="mini" icon onClick={this.toggle}>
            <Icon name="plus" />
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="bookmark"
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
                    <Form.TextArea
                        fluid
                        placeholder="Description (optional)"
                        onChange={e => this.setState({ description: e.target.value })}
                        id="description"
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