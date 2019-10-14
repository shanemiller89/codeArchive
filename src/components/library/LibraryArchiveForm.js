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
import API from "../../modules/API";
import { API_KEY } from "../../modules/API_Key";

export default class LibraryArchiveForm extends Component {
  state = {
    title: "",
    link: "",
    library_id: null,
    openForm: false,
    disabled: true,
    checked: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  checkedToggle = () => {
    this.setState({
      checked: !this.state.checked,
      disabled: !this.state.disabled
    });
  };

  googleSubmit = () => {
    const archive = {
      title: this.state.title,
      link: this.state.link,
      library_id: this.props.libraryId
    };
    API.post("archives", archive).then(newArchive => {
      console.log("NewArchive", newArchive)
      const id = newArchive.archive_id
      const searchTerm = `${this.props.libraryTitle} ${this.state.title}`;
      API.getGoogle(searchTerm, API_KEY).then(searchData => {
        searchData.items.map(item => {
          const bookmark = {
            title: item.title,
            link: item.link,
            description: item.snippet,
            archive_id: id,
            resource_type_id: 1
          };
          console.log("Bookmarks",bookmark)
          this.props.addGoogleBookmark(bookmark);
        });
      });
    });
    this.toggle();
  };

  submit = () => {
    const archive = {
      title: this.state.title,
      link: this.state.link,
      library_id: this.props.libraryId
    };
    this.props.addArchive(archive);
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button
                style={{ background: "#15CA00", color: "white" }}
                icon
                onClick={this.toggle}
              >
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Archive
              </Label>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="archive"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Archive
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Name of Archive"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL (optional)"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Checkbox
                        fluid
                        width={14}
                        label="Create initial bookmarks for this archive?"
                        checked={this.state.checked}
                        onChange={this.checkedToggle}
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
                              : this.googleSubmit
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
