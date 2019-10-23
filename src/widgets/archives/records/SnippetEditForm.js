import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Dropdown
} from "semantic-ui-react";
import API from "../../../modules/API"

const options = [
  { key: "df", text: 'No Highlight', value: 'text'},
  { key: 'bash', text: 'Bash', value: 'bash' },
  { key: 'c#', text: 'C#', value: 'csharp' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'django', text: 'Django', value: 'django' },
  { key: 'html', text: 'HTML, XML', value: 'xml' },
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'jsx', text: 'JSX', value: 'jsx' },
  { key: 'json', text: 'JSON', value: 'json' },
  { key: 'md', text: 'MarkDown', value: 'markdown' },
  { key: 'python', text: 'Python', value: 'python' },
  
]

export default class SnippetEditForm extends Component {
  state = {
    title: "",
    text: "",
    image: "",
    image_title: "",
    order: null,
    openForm: false,
    value: [],
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

    // For some reason, I need this for select to work//
    handleChange = (e, { value }) => this.setState({ value })

  componentDidMount() {
    API.get("records", this.props.snippetId)
    .then(snippet => {
      this.setState({
        title: snippet.title,
        text: snippet.text,
        image: snippet.image,
        image_title: snippet.image,
        value: snippet.language,
        order: snippet.order,
      });
    });
  }

  submit = () => {
    const editedSnippet = {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
        image_title: this.state.image_title,
        language: this.state.value,
        order: this.state.order,
        id: this.props.snippetId

    };
    this.props.updateRecord(editedSnippet)
    this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Dropdown.Item
            icon="pencil"
            description="Edit"
            onClick={this.toggle}
          />
          }
          open={this.state.openForm}
          style={{ width: "45em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="code"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit an Existing Archive Code Snippet
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
                        value={this.state.title}
                      />                      <Form.Select
                      fluid
                      options={options}
                      value={this.state.value}
                      onChange={this.handleChange}
                      id="language"
                    />

                      <Form.TextArea
                        fluid
                        rows="10"
                        placeholder="Insert Code"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
                        value={this.state.text}
                      />
                      <div style={{display: "flex", justifyContent: "space-evenly"}}>
                      <Button style={{ background: "red", color: "white", width: "15em" }}size="large" onClick={this.toggle}>
                        Cancel
                      </Button>
                      <Button style={{ background: "#15CA00", color: "white", width: "15em" }} size="large" onClick={this.submit}>
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
