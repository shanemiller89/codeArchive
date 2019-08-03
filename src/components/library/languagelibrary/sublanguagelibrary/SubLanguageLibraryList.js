import React, { Component } from "react";
import {
  Segment,
  Image,
  Header,
  Divider,
  Grid,
  GridRow
} from "semantic-ui-react";

export default class SubLanguageLibraryList extends Component {
  render() {
    return (
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Image src={this.props.subLanguage.image} size="tiny" />
              <Header as="h2" style={{marginLeft: "1.5em"}}>{this.props.subLanguage.title}</Header>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
