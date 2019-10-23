import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid, Dropdown, Confirm } from "semantic-ui-react";
import LanguageEditForm from "./LanguageEditForm";
import * as firebase from "firebase/app";
import "firebase/storage";

const default_language_icon = "https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Flanguage_default.png?alt=media&token=ffe5f722-4e7a-4157-9ba8-145354cda54f"

// TODO:
// 2. Find better place for Link
export default class Languages extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  deleteImageLanguageLibrary = () => {
    const storageRef = firebase.storage().ref("library_profiles");
    const imageRef = storageRef.child(
      `${this.props.language.image_title}`
    );
    imageRef.delete().then(function() {
      console.log("Image Deleted")
    })
    .then(() => this.props.deleteLanguageLibrary(this.props.language.id))
  };


  render() {
    return (
      <React.Fragment>
        <Grid.Column floated="left">
          <Card style={{ margin: "2.5em 4em" }}>
            <Image src={this.props.language.image === "" ? default_language_icon : this.props.language.image} wrapped ui={false} />
            <Card.Content>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div>
                  <Link
                    to={`/library/language/${this.props.language.id}`}
                    style={{ fontSize: "1.5em" }}
                  >
                    <Card.Header>{this.props.language.title}</Card.Header>
                  </Link>
                </div>
                <div>
                  <Dropdown icon="bars" floated="right">
                    <Dropdown.Menu position="right">
                      <LanguageEditForm
                        language={this.props.language}
                        updateLanguageLibrary={this.props.updateLanguageLibrary}
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
                        onConfirm={
                          this.props.language.image === ""
                            ? () => this.props.deleteLanguageLibrary(this.props.language.id)
                            : () => this.deleteImageLanguageLibrary()
                        }
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
