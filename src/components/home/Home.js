import React, { Component } from "react";
import {
  Header,
  Image,
  Container,
  List,
  Segment,
  Grid,
  Divider,
  Icon
} from "semantic-ui-react";
import PieChart from "react-minimal-pie-chart";
import API from "../../modules/API";
import EditProfileImageForm from "./EditProfileImageForm";

export default class Home extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem("user")),
    userInfo: []
  };

  componentDidMount() {
    const newState = {};
    API.getAll("users", `id=${this.state.currentUser}`)
      .then(userInfo => (newState.userInfo = userInfo))
      .then(() => this.setState(newState));
  }

  updateProfile = editedData => {
    API.put("users", editedData)
      .then(() => API.getAll("users", `id=${this.state.currentUser}`))
      .then(userInfo =>
        this.setState({
          userInfo: userInfo
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            background: "#E8E8E8",
            height: "7.5em",
            color: "#15CA00",
            padding: "1em"
          }}
          fluid
        >
          <Header style={{ fontSize: "5em" }}>
            <Icon style={{ color: "#15CA00" }} name="address card" />
            User Profile
          </Header>
          <br />
        </Container>

        <Segment placeholder style={{ marginTop: "5em" }}>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>
              <Icon name="database" />
            </Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <div>
                  {this.state.userInfo.map(userInfo => (
                    <div key={userInfo.id}>
                      <Image
                        src={userInfo.profile}
                        size="medium"
                        circular
                        style={{ margin: "1em auto" }}
                      />
                      <EditProfileImageForm
                        userInfo={userInfo}
                        updateProfile={this.updateProfile}
                      />
                      <h2>
                        <span style={{ color: "#15CA00" }}>
                          {userInfo.username}{" "}
                        </span>{" "}
                      </h2>
                      <h3><Icon name="user" /> {userInfo.name} </h3>
                      <h3><Icon name="mail" />  {userInfo.email} </h3>
                    </div>
                  ))}
                </div>
              </Grid.Column>

              <Grid.Column>
                <Header style={{ fontSize: "3em" }}>
                  <Icon style={{ color: "#15CA00" }} size="tiny" name="chart pie" />
                  Stats
                </Header>
                {/* <List>
              <List.Icon name="chart pie" />
              <List.Content >
                <List.Header>Total Libraries:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Issue Logs:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Code Logs:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
              <List.Icon name="chart pie" />
              <List.Content>
                <List.Header>Total Archives:</List.Header>
                <List.Description>0</List.Description>
              </List.Content>
            </List> */}
                <PieChart
                  data={[
                    { title: "Total Libraries", value: 10, color: "#48D73D" },
                    { title: "Total Issue Logs", value: 15, color: "#12BB00" },
                    { title: "Total Code Logs", value: 20, color: "#318329" },
                    { title: "Total Archives", value: 20, color: "#1E4919" }
                  ]}
                  style={{ height: "26em" }}
                  lineWidth={25}
                  rounded
                  label
                  labelStyle={{
                    fontSize: '5px',
                    fontFamily: 'sans-serif'
                  }}
                  radius={42}
                  labelPosition={112}
                  animate
                />
                ;
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
