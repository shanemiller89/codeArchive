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
import CodeEditForm from "./CodeEditForm";

export default class CodeList extends Component {
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
              <Grid.Column verticalAlign="middle">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Ffolder_image.png?alt=media&token=f9970c44-7131-4cf9-a8da-081c07aa7848"
                  size="mini"
                />
              </Grid.Column>
              <Grid.Column width={7} verticalAlign="middle">
                {/* LINK */}
                <Link
                  to={`/code-log-archive/${this.props.codeArchive.archives[0].id}`}
                >
                  <Header as="h2">
                    {this.props.codeArchive.title}
                    <Header.Subheader>
                      {this.props.codeArchive.reference}
                    </Header.Subheader>
                  </Header>
                </Link>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" width={6} />
              <Grid.Column verticalAlign="middle">
                <Dropdown icon="bars" style={{ fontSize: "1.75em" }}>
                  <Dropdown.Menu direction="left">
                    <CodeEditForm
                      codeId={this.props.codeArchive.id}
                      archiveId={this.props.codeArchive.archives[0].id}
                      updateCode={this.props.updateCode}
                    />
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
                      onConfirm={() =>
                        this.props
                          .deleteCode(this.props.codeArchive.id, this.props.codeArchive.archives[0].id)
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
