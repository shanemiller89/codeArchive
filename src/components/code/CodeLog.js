import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import API from "../../modules/API";
import CodeList from "./CodeList";
import CodeForm from "./CodeForm";
import CodeSearchBar from "./CodeSearchBar";

export default class CodeLog extends Component {
  state = {
    logArchives: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("logs", `log_type_id=2`)
      .then(logArchives => (newState.logArchives = logArchives))
      .then(() => this.setState(newState));
  }

  // ADD CODE //
  addCode = data => {
    API.post("logs", data)
      .then(() =>
        API.getAll("logs", `log_type_id=2`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };
  // DELETE CODE //
  deleteCode = (id1, id2) => {
    API.delete("logs", id1).then(() => this.deleteArchive(id2));
  };
  deleteArchive = id => {
    API.delete("archives", id)
      .then(() =>
        API.getAll("logs", `log_type_id=2`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };

  // UPDATE CODE //
  updateCode = (editedData1, editedData2) => {
    API.put("logs", editedData1).then(() => this.updateArchive(editedData2));
  };
  updateArchive = editedData => {
    API.put("archives", editedData)
      .then(() =>
        API.getAll("logs", `log_type_id=2`)
      )
      .then(logArchives =>
        this.setState({
          logArchives: logArchives
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "20em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em", marginTop: ".1em" }}>
            <Icon
              style={{ color: "#15CA00", marginRight: ".25em" }}
              name="code"
            />
            Code Log
          </Header>
          {/* Add Code Form */}
          <CodeForm
            addCode={this.addCode}
            addArchive={this.addArchive}
            addCodeArchive={this.addCodeArchive}
          />
          <br />
          <br />
          <br />
          <CodeSearchBar codeLogs={this.state.logArchives} />
        </Container>
        <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
          <Icon name="code" style={{ color: "#15CA00" }} />
          <Header.Content>
            Code Archives
            <Header.Subheader>Logs of Code useful repeat use</Header.Subheader>
          </Header.Content>
        </Header>
        <div>
          {this.state.logArchives.map(codeArchive => (
            <CodeList
              key={codeArchive.archives.id}
              codeArchive={codeArchive}
              updateCode={this.updateCode}
              deleteCode={this.deleteCode}
            />
          ))}
        </div>
        <br />
      </React.Fragment>
    );
  }
}
