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

export default class EventForm extends Component {
  state = {
    title: "",
    date: "",
    location: "",
    description: "",
    link: "",
    reference: "",
    userId: JSON.parse(localStorage.getItem("user")),
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  submit = () => {
    const event = {
      title: this.state.title,
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      link: this.state.link,
      reference: this.state.reference,
      userId: this.state.userId
    };
    this.props.addEvent(event);
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
                Event Log
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
                  name="calendar alternate"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Event
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        type="date"
                        placeholder="Date of Event"
                        onChange={e => this.setState({ date: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Title of Event"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Location of Event"
                        onChange={e => this.setState({ location: e.target.value })}
                        id="link"
                      />
                      <Form.TextArea
                        fluid
                        placeholder="Description of Event"
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                        id="synopsis"
                      />
                      <Form.Input
                        fluid
                        placeholder="URL of Event Page"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Input
                        fluid
                        placeholder="Keywords associated with this event"
                        onChange={e =>
                          this.setState({ reference: e.target.value })
                        }
                        id="reference"
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
                          onClick={this.submit}
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
