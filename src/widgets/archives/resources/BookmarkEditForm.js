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
import API from "../../../modules/API"

export default class BookmarkEditForm extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("resources", this.props.bookmark.id)
    .then(bookmark => {
      this.setState({
        title: bookmark.title,
        link: bookmark.link,
        description: bookmark.description,
      });
    })
  }

  submit = () => {
    const editedBookmark = {
      title: this.state.title,
      link: this.state.link,
      description: this.state.description,
      id: this.props.bookmark.id
    };
    this.props.updateBookmark(editedBookmark)
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
                    <Form.TextArea
                        fluid
                        placeholder="Description (optional)"
                        onChange={e => this.setState({ description: e.target.value })}
                        id="description"
                        value={this.state.description}
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