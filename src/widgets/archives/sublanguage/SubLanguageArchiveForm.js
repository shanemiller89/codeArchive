import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Label
} from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class SubLanguageArchiveForm extends Component {
  state = {
    title: "",
    link: "",
    libraryId: null,
    archiveId: null,
  };

  submit = () => {
    const archive = {
      title: this.state.title,
      link: this.state.link,
    };
    this.props.addArchive(archive)
    .then(newArchive => 
      this.props.addSubLanguageArchive({subLanguageLibraryId: this.props.subLanguageId, archiveId: newArchive.id})
      )
    

    // this.toggle();
    //--This toggle will close the Modal upon click --//
  };

  // TODO:
  // 1.Add toggle to close Modal

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button style={{ background: "#15CA00", color: "white" }} icon>
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Archive
              </Label>
            </Button>
          }
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="archive"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Archive
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Name of Archive"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Intial Documentation URL (optional)"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Button primary fluid size="large" onClick={this.submit}>
                        Submit
                      </Button>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
