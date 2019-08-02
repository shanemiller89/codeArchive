import React, { Component } from "react";
import { Segment, Image, Header, Divider} from "semantic-ui-react";

export default class SubLanguageLibraryList extends Component {
  render() {
    return (
      <div>
        <Segment>
          <Image src={this.props.subLanguage.image} size="small" />
          <Header>{this.props.subLanguage.title}</Header>
          <Divider section />
        </Segment>
      </div>
    );
  }
}
