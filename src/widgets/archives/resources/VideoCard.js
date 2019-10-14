import React, { Component } from "react";
import { Card, Grid, Image, Dropdown, Confirm } from "semantic-ui-react";
import VideoEditForm from "./VideoEditForm";

export default class VideoCard extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <Grid.Column floated="left">
          <Card style={{ margin: "2.5em 4em", width: "45em" }}>
            <Card.Content>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Fvideo_image.png?alt=media&token=621cf16e-e317-4150-a672-6fdcbd2afc0e"
                floated="left"
                size="small"
              />
              <Card.Header>
                <a
                  href={this.props.video.link}
                  style={{ fontSize: "1em" }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {this.props.video.title}
                </a>
                <Dropdown
                  icon="bars"
                  style={{ fontSize: "1em", marginLeft: "1em" }}
                >
                  <Dropdown.Menu>
                    <VideoEditForm
                      video={this.props.video}
                      updateVideo={this.props.updateVideo}
                    />
                    <Dropdown.Item
                      icon="trash alternate"
                      description="Delete"
                      onClick={this.open}
                    />
                    <Confirm
                      size="mini"
                      header="Delete Video"
                      content="Are you sure you want to delete this video?"
                      confirmButton="Yes"
                      open={this.state.open}
                      onCancel={this.close}
                      onConfirm={() =>
                        this.props.deleteVideo(this.props.video.id)
                      }
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Meta>{this.props.video.description}</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
