import React, { Component } from "react";
import {
  Segment,
  Header,
  Icon,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import EventEditForm from "./EventEditForm"

export default class ArticleSegment extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <Segment style={{ width: "83%", marginLeft: "5em" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Header as="h1">
              {this.props.event.title}
              <Header.Subheader>
                <strong>{this.props.event.date}</strong>
              </Header.Subheader>
              <Header.Subheader>
                {this.props.event.reference}
              </Header.Subheader>
            </Header>
            <div>
              <Dropdown icon="bars" style={{ fontSize: "1.5em" }}>
                <Dropdown.Menu>
                  <EventEditForm
                    eventId={this.props.event.id}
                    updateEvent={this.props.updateEvent}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Event"
                    content="Are you sure you want to delete this Event?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => this.props.deleteEvent(this.props.event.id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Segment.Inline>
            <div style={{ whiteSpace: "pre-wrap", fontSize: "1.25em" }}>
              <Icon
                style={{ color: "#15CA00", marginRight: ".25em" }}
                name="calendar alternate"
              />
              {this.props.event.description}
            </div>
            <br />
            <div style={{ fontSize: "1.25em" }}>
              <Icon
                style={{ color: "#15CA00", marginRight: ".25em" }}
                name="map"
              />
                {this.props.event.location}
            </div>
            <br />
            <div style={{ fontSize: "1.25em" }}>
              <Icon
                style={{ color: "#15CA00", marginRight: ".25em" }}
                name="linkify"
              />
                <a href={this.props.event.link}>Go to Event Page</a>
            </div>
          </Segment.Inline>
        </Segment>
      </React.Fragment>
    );
  }
}
