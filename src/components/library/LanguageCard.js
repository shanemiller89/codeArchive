import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid, Dropdown, Confirm } from "semantic-ui-react";
import LanguageEditForm from "./LanguageEditForm";

// TODO:
// 1.Get delete/Edit button menu to show on right side of title, not below
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
          <Card>
              <Image src={this.props.language.imageURL} wrapped ui={false} />
            <Card.Content>
            <Link className="nav-link" to={`/library/language/${this.props.language.id}`}>
              <Card.Header>{this.props.language.title}</Card.Header>
              </Link>
              <Dropdown icon="list" floated="right">
                <Dropdown.Menu position="right">
                  <LanguageEditForm
                    language={this.props.language}
                    updateLanguage={this.props.updateLanguage}
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
                      this.props.deleteLanguage(this.props.language.id)
                    }
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
