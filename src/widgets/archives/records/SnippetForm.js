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

const options = [
  { key: "df", text: 'No Highlight', value: 'text'},
  { key: 'bash', text: 'Bash', value: 'bash' },
  { key: 'c#', text: 'C#', value: 'csharp' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'django', text: 'Django', value: 'django' },
  { key: 'elixir', text: 'Elixir', value: 'elixir' },
  { key: 'erlang', text: 'Erlang', value: 'erlang' },
  { key: 'html', text: 'HTML, XML', value: 'xml' },
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'jsx', text: 'JSX', value: 'jsx' },
  { key: 'json', text: 'JSON', value: 'json' },
  { key: 'md', text: 'MarkDown', value: 'markdown' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'sql', text: 'SQL', value: 'sql' },
  
]

export default class SnippetForm extends Component {
  state = {
    title: "",
    text: "",
    image: "",
    image_title: "",
    archive_id: parseInt(this.props.archiveId),
    record_type_id: 2,
    openForm: false,
    value: [],
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  // For some reason, I need this for select to work//
  handleChange = (e, { value }) => this.setState({ value })

  submit = () => {
    const snippet = {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
      image_title: this.state.image_title,
      language: this.state.value === [] ? null : this.state.value,
      order: this.props.arrayLength < 1 ? 1 : this.props.arrayLength + 1,
      archive_id: this.state.archive_id,
      record_type_id: this.state.record_type_id
    };
    this.props.addRecord(snippet);
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button
                style={{ background: "#15CA00", color: "white" }}
                icon
                onClick={this.toggle}
              >
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Archive Code Snippet
              </Label>
            </Button>
          }
          open={this.state.openForm}
          style={{ width: "45em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon name="code" size="large" style={{ color: "#15CA00" }} />
              </div>
              Add a new Archive Code Snippet
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Title of snippet (What is the snippet about?)"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Select
                        fluid
                        options={options}
                        placeholder="Language"
                        onChange={this.handleChange}
                        id="language"
                      />
                      <Form.TextArea
                        fluid
                        rows="10"
                        placeholder="Insert Code"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <Button
                          style={{
                            background: "red",
                            color: "white",
                            width: "15em"
                          }}
                          size="large"
                          onClick={this.toggle}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            background: "#15CA00",
                            color: "white",
                            width: "15em"
                          }}
                          size="large"
                          onClick={this.submit}
                        >
                          Submit
                        </Button>
                      </div>
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
