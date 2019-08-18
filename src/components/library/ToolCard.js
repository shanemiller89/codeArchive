import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Grid, Dropdown, Confirm } from "semantic-ui-react";
import ToolEditForm from "./ToolEditForm";

// TODO:
// 2. Find better place for Link
export default class Tools extends Component {
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
            <Image src={this.props.tool.image} wrapped ui={false} />
            <Card.Content>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div>
                  <Link
                    to={`/library/tool/${this.props.tool.id}`}
                    style={{ fontSize: "1.5em" }}
                  >
                    <Card.Header>{this.props.tool.title}</Card.Header>
                  </Link>
                </div>
                <div>
                  <Dropdown icon="bars" floated="right">
                    <Dropdown.Menu position="right">
                      <ToolEditForm
                        tool={this.props.tool}
                        updateToolLibrary={this.props.updateToolLibrary}
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
                          this.props.deleteToolLibrary(
                            this.props.tool.id
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