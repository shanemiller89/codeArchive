import React, { Component } from "react";
import { Card, Grid, Image } from "semantic-ui-react";

export default class LanguageVideoCard extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column floated="left">
          <Card style={{margin: "2.5em 4em", width: "32em"}}>
            <Card.Content>
              <Image src={this.props.video.image} floated="left" size="tiny" />
            <a href={this.props.video.link} style={{fontSize: "1em"}}>
              <Card.Header>{this.props.video.title}</Card.Header>
              </a>
              <Card.Meta>
                  {this.props.video.description}
              </Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
