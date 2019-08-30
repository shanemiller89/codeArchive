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
import * as firebase from "firebase/app";
import "firebase/storage";

import SubLanguageLibraryEditForm from "./SubLanguageLibraryEditForm"

const default_language_icon = "https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Flanguage_default.png?alt=media&token=ffe5f722-4e7a-4157-9ba8-145354cda54f"


export default class SubLanguageLibraryList extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  deleteImageSubLanguageLibrary = () => {
    const storageRef = firebase.storage().ref("sub_library_profiles");
    const imageRef = storageRef.child(
      `${this.props.subLanguage.image_title}`
    );
    imageRef.delete().then(function() {
      console.log("Image Deleted")
    })
    .then(() => this.props.deleteSubLanguageLibrary(this.props.subLanguage.id))
  };

  render() {
    return (
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
              <Image src={this.props.subLanguage.image === null ? default_language_icon : this.props.subLanguage.image} size="tiny" />
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
                    // onConfirm={() =>
                    //   this.props.deleteSubLanguageLibrary(this.props.subLanguage.id)
                    // }
                    onConfirm={
                      this.props.subLanguage.image === null 
                        ? () => this.props.deleteSubLanguageLibrary(this.props.subLanguage.id)
                        : () => this.deleteImageSubLanguageLibrary()
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
