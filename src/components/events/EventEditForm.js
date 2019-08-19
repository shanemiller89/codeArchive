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
import API from "../../modules/API"

export default class EventEditForm extends Component {
  state = {
    title: "",
    date: "",
    location: "",
    description: "",
    link: "",
    reference: "",
    userId: "",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("events", this.props.eventId)
    .then(event => {
      this.setState({
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description,
        link: event.link,
        reference: event.reference,
        userId: event.userId
    });
});
}

  submit = () => {
    const event = {
      title: this.state.title,
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      link: this.state.link,
      reference: this.state.reference,
      userId: this.state.userId,
      id: this.props.eventId
    };
    this.props.updateEvent(event);
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
                  name="calendar alternate"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Event Archive
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        type="date"
                        value={this.state.date}
                        onChange={e => this.setState({ date: e.target.value })}
                        id="date"
                      />
                      <Form.Input
                        fluid
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        value={this.state.location}
                        onChange={e => this.setState({ location: e.target.value })}
                        id="location"
                      />
                      <Form.TextArea
                        fluid
                        value={this.state.description}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                        id="description"
                      />
                      <Form.Input
                        fluid
                        value={this.state.link}
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Input
                        fluid
                        value={this.state.reference}
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
