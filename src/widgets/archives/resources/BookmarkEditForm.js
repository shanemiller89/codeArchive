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

export default class BookmarkEditForm extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    image: "",
    archiveId: "",
    resourceTypeId: "",
  };

  componentDidMount() {
    API.get("resources", this.props.bookmark.id)
    .then(bookmark => {
      this.setState({
        title: bookmark.title,
        link: bookmark.link,
        description: bookmark.description,
        image: bookmark.image,
        archiveId: bookmark.archiveId,
        resourceTypeId: bookmark.resourceTypeId,
      });
    });
  }

  submit = () => {
    const editedBookmark = {
      title: this.state.title,
      link: this.state.link,
      description: this.state.description,
      image: this.state.image,
      archiveId: this.state.archiveId,
      resourceTypeId: this.state.resourceTypeId,
      id: this.props.bookmark.id
    };
    this.props.updateBookmark(editedBookmark)

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
                  name="bookmark"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit A Existing Bookmark
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
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                        value={this.state.link}
                      />
                    <Form.Input
                        fluid
                        placeholder="Description (optional)"
                        onChange={e => this.setState({ description: e.target.value })}
                        id="description"
                        value={this.state.description}
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