import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Image,
  Header,
  Grid,
  Dropdown,
  Confirm

} from "semantic-ui-react";

export default class LibraryArchivesList extends Component {
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
              <Image src="https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Ffolder_image.png?alt=media&token=f9970c44-7131-4cf9-a8da-081c07aa7848" size="tiny" />
              </Grid.Column>
              <Grid.Column width={13} verticalAlign="middle">
                {/* LINK */}
              {/* <Link to={`/library/language/sublanguage/${this.props.subLanguage.id}`}> */}
              <Header as="h2" style={{marginLeft: "1.5em"}}>{this.props.archive.archive.title}</Header>
              {/* </Link> */}
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
              <Dropdown icon="list" floated="right" style={{fontSize: "1.75em"}}>
                <Dropdown.Menu direction="left">
                  {/* <SubLanguageLibraryEditForm
                    subLanguage={this.props.subLanguage}
                    updateSubLanguageLibrary={this.props.updateSubLanguageLibrary}
                  /> */}
                  <Dropdown.Item
                    icon="trash alternate"
                    description="Delete"
                    onClick={this.open}
                  />
                  <Confirm
                    size="mini"
                    header="Delete Archive"
                    content="Are you sure you want to delete this archive?"
                    confirmButton="Yes"
                    open={this.state.open}
                    onCancel={this.close}
                    // onConfirm={() =>
                    //   this.props.deleteSubLanguageLibrary(this.props.subLanguage.id)
                    // }
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
