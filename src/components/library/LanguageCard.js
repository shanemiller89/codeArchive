import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid, Dropdown, Confirm } from "semantic-ui-react";
import LanguageEditForm from "./LanguageEditForm";

// TODO:
// 2. Find better place for Link
export default class Languages extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <Grid.Column floated="left">
          <Card style={{ margin: "2.5em 4em" }}>
            <Image src={this.props.language.image} wrapped ui={false} />
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
                        onConfirm={() =>
                          this.props.deleteLanguageLibrary(
                            this.props.language.id
                          )
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
