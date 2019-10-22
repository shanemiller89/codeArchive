import React, { useState, useEffect } from "react";
import {
  Header,
  Image,
  Container,
  Segment,
  Grid,
  Divider,
  Icon,
  Message,
  Dimmer,
  Loader
} from "semantic-ui-react";
import PieChart from "react-minimal-pie-chart";
import API from "../../modules/API";
import EditProfileImageForm from "./EditProfileImageForm";

const Home = () => {
  const [coder, setCoder] = useState({ user: {} });
  const [libraryTotal, setLibraries] = useState("");
  const [issueLogTotal, setIssueLogs] = useState("");
  const [codeLogTotal, setCodeLogs] = useState("");
  const [articlesTotal, setArticles] = useState("");
  const [isLoading, setLoading] = useState(true);

  const getCoder = () => {
    return API.getAll("coders/profile").then(data => {
      setCoder(data);
    });
  };

  const getLibraries = () => {
    return API.getAll("libraries").then(data => {
      setLibraries(data.length);
    });
  };

  const getIssueLogs = () => {
    return API.getAll("logs", `log_type_id=1`).then(data => {
      setIssueLogs(data.length);
    });
  };

  const getCodeLogs = () => {
    return API.getAll("logs", `log_type_id=2`).then(data => {
      setCodeLogs(data.length);
    });
  };

  const getArticles = () => {
    return API.getAll("articles").then(data => {
      setArticles(data.length);
    });
  };

  const updateProfileImage = editedData => {
    API.put("coders", editedData).then(() => {
      getCoder();
    });
  };

  useEffect(() => {
    getCoder().then(() => {
      getLibraries().then(() => {
        getIssueLogs().then(() => {
          getCodeLogs().then(() => {
            getArticles().then(() => {
              setLoading(false);
            });
          });
        });
      });
    });
  }, []);

  if (isLoading) {
    return (
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    );
  } else {
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
                <Message negative>
                  <Message.Header>
                    THIS APP IS CURRENTLY IN TESTING STAGES
                  </Message.Header>
                  <p>
                    This app is only in testing phase. Please know your archives
                    will be lost upon alpha deployment. Report bugs{" "}
                    <a href="https://github.com/shanemiller89/codeArchive/issues">
                      here.
                    </a>
                  </p>
                </Message>
                <div>
                  <div key={coder.id}>
                    {coder.profile_image === "" ? (
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/codearchive-app.appspot.com/o/app_resources%2Fprofile_placeholder.png?alt=media&token=a47e94d2-94b5-419c-8da3-9ccb382d5f70"
                        size="medium"
                        circular
                        style={{ margin: "1em auto" }}
                      />
                    ) : (
                      <Image
                        src={coder.profile_image}
                        size="medium"
                        circular
                        style={{ margin: "1em auto" }}
                      />
                    )}
                    <EditProfileImageForm
                      coder={coder}
                      updateProfileImage={updateProfileImage}
                    />
                    <h2>
                      <span style={{ color: "#15CA00" }}>
                        {coder.user.username}
                      </span>
                    </h2>
                    <h3>
                      <Icon name="user" /> {coder.user.first_name}{" "}
                      {coder.user.last_name}
                    </h3>
                    <h3>
                      <Icon name="mail" /> {coder.user.email}
                    </h3>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <Header style={{ fontSize: "3em" }}>
                  <Icon
                    style={{ color: "#15CA00" }}
                    size="tiny"
                    name="chart pie"
                  />
                  Stats
                </Header>
                {(libraryTotal === 0) &
                (issueLogTotal === 0) &
                (codeLogTotal === 0) &
                (articlesTotal === 0) ? (
                  <h2>No Data to Display</h2>
                ) : (
                  <PieChart
                    data={[
                      {
                        title: "Total Libraries",
                        value: libraryTotal,
                        color: "#48D73D"
                      },
                      {
                        title: "Total Issue Logs",
                        value: issueLogTotal,
                        color: "#12BB00"
                      },
                      {
                        title: "Total Code Logs",
                        value: codeLogTotal,
                        color: "#318329"
                      },
                      {
                        title: "Total Articles",
                        value: articlesTotal,
                        color: "#1E4919"
                      }
                    ]}
                    style={{ height: "26em" }}
                    lineWidth={25}
                    rounded
                    label
                    labelStyle={{
                      fontSize: "5px",
                      fontFamily: "sans-serif"
                    }}
                    radius={42}
                    labelPosition={112}
                    animate
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
};

export default Home;
