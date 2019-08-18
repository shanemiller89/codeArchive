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
import API from "../../modules/API"

export default class ArticleForm extends Component {
  state = {
    title: "",
    synopsis: "",
    link: "",
    reference: "",
    userId:"",
    openForm: false
  };

  toggle = () => {
    this.setState({ openForm: !this.state.openForm });
  };

  componentDidMount() {
    API.get("articles", this.props.articleId)
    .then(article => {
      this.setState({
        title: article.title,
        synopsis: article.synopsis,
        link: article.link,
        reference: article.reference,
        userId: article.userId,

    });
});
}


  submit = () => {
    const editedArticle = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      link: this.state.link,
      reference: this.state.reference,
      userId: this.state.userId,
      id: this.props.articleId
    };
    this.props.updateArticle(editedArticle);
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
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="newspaper"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Add A New Article
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.TextArea
                        fluid
                        value={this.state.synopsis}
                        onChange={e =>
                          this.setState({ synopsis: e.target.value })
                        }
                        id="synopsis"
                      />
                      <Form.Input
                        fluid
                        value={this.state.link}
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Input
                        fluid
                        value={this.state.reference}
                        onChange={e =>
                          this.setState({ reference: e.target.value })
                        }
                        id="reference"
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
                            width: "10em"
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
                            width: "10em"
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
