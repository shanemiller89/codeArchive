import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import EventSegment from "./EventSegment";
import EventForm from "./EventForm";
import EventSearchBar from "./EventSearchBar";

export default class EventsLog extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    events: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("events")
      .then(events => (newState.events = events))
      .then(() => this.setState(newState));
  }

  // CRUD //
  addEvent = data => {
    API.post("events", data)
    .then(() => API.getAll("events"))
    .then(events =>
      this.setState({
        events: events
      })
    );
};

  deleteEvent = id => {
    API.delete("events", id)
      .then(() => API.getAll("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );
  };

  updateEvent = editedData => {
    API.put("events", editedData)
    .then(() => API.getAll("events"))
    .then(events =>
      this.setState({
        events: events
      })
    );
};

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "18em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="calendar alternate"
            />
            Event Log
          </Header>
          <EventForm addEvent={this.addEvent} />
          <br />
          <br />
          <EventSearchBar events={this.state.events}/>
        </Container>
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="calendar alternate" style={{ color: "#15CA00" }} />
          <Header.Content>
            Event Archives
            <Header.Subheader>
              Logs of Events relating to Software Development or related
              content
            </Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.events.map(event => (
            <EventSegment
              key={event.id}
              event={event}
              deleteEvent={this.deleteEvent}
              updateEvent={this.updateEvent}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
