import React, { Component } from "react";
import { Card, Icon, Image, Grid } from "semantic-ui-react";

export default class Languages extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column floated="left">
        <Card>
          <Image src={this.props.language.imageURL} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.language.title}</Card.Header>
          </Card.Content>
        </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
