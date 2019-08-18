import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Image,
  Header,
  Divider,
  Grid,
  GridRow,
  Dropdown,
  Confirm

} from "semantic-ui-react";
import SubLanguageLibraryEditForm from "./SubLanguageLibraryEditForm"

export default class SubLanguageLibraryList extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
              <Image src={this.props.subLanguage.image} size="tiny" />
              </Grid.Column>
              <Grid.Column width={13} verticalAlign="middle">
                {/* LINK */}
              <Link to={`/library/language/sublanguage/${this.props.subLanguage.id}`}>
              <Header as="h2" style={{marginLeft: "1.5em"}}>{this.props.subLanguage.title}</Header>
              </Link>
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
              <Dropdown icon="bars" floated="right" style={{fontSize: "1.75em"}}>
                <Dropdown.Menu direction="left">
                  <SubLanguageLibraryEditForm
                    subLanguage={this.props.subLanguage}
                    updateSubLanguageLibrary={this.props.updateSubLanguageLibrary}
                  />
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Library"
                    content="Are you sure you want to delete this library?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() =>
                      this.props.deleteSubLanguageLibrary(this.props.subLanguage.id)
                    }
                  />
                </Dropdown.Menu>
              </Dropdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
