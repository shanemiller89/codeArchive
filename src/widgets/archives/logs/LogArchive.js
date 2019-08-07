// import React, { Component } from "react";
// import { Container, Header, Icon, List, Card, Grid } from "semantic-ui-react";
// import API from "../../../modules/API"

// export default class LogArchive extends Component {
//     state = {
//         logArchive: [],
//         logNotes: [],
//         logSnippets: [],
//         logBookmarks: [],
//         logVideos: []
//       };
    
//       archiveId = this.props.match.params.issueArchiveId

//       componentDidMount() {
//         const newState = {};
//         API.get("archives", `${this.props.match.params.logArchiveId}`)
//           .then(logArchive => (newState.logArchive = logArchive))
//           .then(() => this.setState(newState))
//               // Get ALl Notes //
//     API.getAll(
//       "records",
//       `archiveId=${this.props.match.params.logArchiveId}&recordTypeId=1`
//     )
//       .then(logNotes => (newState.logNotes = logNotes))
//       .then(() => this.setState(newState));
//     // Get All Snippets //
//     API.getAll(
//       "records",
//       `archiveId=${this.props.match.params.logArchiveId}&recordTypeId=2`
//     )
//       .then(logSnippets => (newState.logSnippets = logSnippets))
//       .then(() => this.setState(newState));
//     // Get All bookmarks //
//     API.getAll(
//       "resources",
//       `archiveId=${this.props.match.params.logArchiveId}&resourceTypeId=1`
//     )
//       .then(
//         logBookmarks => (newState.logBookmarks = logBookmarks)
//       )
//       .then(() => this.setState(newState));
//     // Get All videos //
//     API.getAll(
//       "resources",
//       `archiveId=${this.props.match.params.logArchiveId}&resourceTypeId=2`
//     )
//       .then(logVideos => (newState.logVideos = logVideos))
//       .then(() => this.setState(newState));
//   }

//     // FOR CRUD OF NOTE //
//     addLogNote = data => {
//       API.post("records", data)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=1`
//           )
//         )
//         .then(logNotes =>
//           this.setState({
//             logNotes: logNotes
//           })
//         );
//     };
//     deleteLogNote = id => {
//       API.delete("records", id)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=1`
//           )
//         )
//         .then(logNotes =>
//           this.setState({
//             logNotes: logNotes
//           })
//         );
//     };
//     updateLogNote = editedData => {
//       API.put("records", editedData)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=1`
//           )
//         )
//         .then(logNotes =>
//           this.setState({
//             logNotes: logNotes
//           })
//         );
//     };
//     // FOR CRUD SNIPPETS //
//     addLogSnippet = data => {
//       API.post("records", data)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=2`
//           )
//         )
//         .then(logSnippets =>
//           this.setState({
//             logSnippets: logSnippets
//           })
//         );
//     };
//     deleteLogSnippet = id => {
//       API.delete("records", id)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=2`
//           )
//         )
//         .then(logSnippets =>
//           this.setState({
//             logSnippets: logSnippets
//           })
//         );
//     };
//     updateLogSnippet = editedData => {
//       API.put("records", editedData)
//         .then(() =>
//           API.getAll(
//             "records",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&recordTypeId=2`
//           )
//         )
//         .then(logSnippets =>
//           this.setState({
//             logSnippets: logSnippets
//           })
//         );
//     };
  
//     // FOR CRUD OF BOOKMARK //
//     addLogBookmark = data => {
//       API.post("resources", data)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=1`
//           )
//         )
//         .then(logBookmarks =>
//           this.setState({
//             logBookmarks: logBookmarks
//           })
//         );
//     };
//     deleteLogBookmark = id => {
//       API.delete("resources", id)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=1`
//           )
//         )
//         .then(logBookmarks =>
//           this.setState({
//             logBookmarks: logBookmarks
//           })
//         );
//     };
//     updateLogBookmark = editedData => {
//       API.put("resources", editedData)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=1`
//           )
//         )
//         .then(logBookmarks =>
//           this.setState({
//             logBookmarks: logBookmarks
//           })
//         );
//     };
//     // CRUD FOR VIDEOS
//     addLogVideo = data => {
//       API.post("resources", data)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=2`
//           )
//         )
//         .then(logVideos =>
//           this.setState({
//             logVideos: logVideos
//           })
//         );
//     };
//     deleteLogVideo = id => {
//       API.delete("resources", id)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=2`
//           )
//         )
//         .then(logVideos =>
//           this.setState({
//             logVideos: logVideos
//           })
//         );
//     };
//     updateLogVideo = editedData => {
//       API.put("resources", editedData)
//         .then(() =>
//           API.getAll(
//             "resources",
//             `archiveId=${
//               this.props.match.params.logArchiveId
//             }&resourceTypeId=2`
//           )
//         )
//         .then(logVideos =>
//           this.setState({
//             logVideos: logVideos
//           })
//         );
//     };

//   render() {
//     return (
//       <React.Fragment>
//         <Container
//           style={{
//             background: "#E8E8E8",
//             height: "25em",
//             color: "#15CA00",
//             padding: "1em"
//           }}
//           fluid
//         >
//           <Header style={{ fontSize: "5em", color: "#15CA00" }}>
//             {this.state.logArchive.title}
//           </Header>
//           <br />
//           {/* Add Note Form */}
//           {/* <NoteForm
//             archiveId={this.archiveId}
//             addLogNote={this.addLogNote}
//           /> */}
//           <br />
//           <br />
//           {/* Add Code Snippet Form */}
//           {/* <SnippetForm
//             archiveId={this.archiveId}
//             addLanguageSnippet={this.addLanguageSnippet}
//           /> */}
//         </Container>
//         <br />
//                 {/* Notes and Snippets */}
//         {/* <Grid columns> */}
//         {this.state.languageNotes.map(note => (
//           <NoteSegment
//             key={note.id}
//             note={note}
//             deleteLanguageNote={this.deleteLanguageNote}
//             updateLanguageNote={this.updateLanguageNote}
//           />
//         ))}
//         {this.state.languageSnippets.map(snippet => (
//           <SnippetSegment
//             key={snippet.id}
//             snippet={snippet}
//             deleteLanguageSnippet={this.deleteLanguageSnippet}
//             updateLanguageSnippet={this.updateLanguageSnippet}
//           />
//         ))}
//         {/* </Grid> */}
//         <br />
//         {/* Bookmarks */}
//         <div>
//           <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
//             <Icon name="bookmark" style={{ color: "#15CA00" }} />
//             <Header.Content>
//               Bookmarks
//               <BookmarkForm
//                 archiveId={this.archiveId}
//                 addLanguageBookmark={this.addLanguageBookmark}
//               />
//               <Header.Subheader>
//                 All websites, articles, or documentation relating to this
//                 Archive
//               </Header.Subheader>
//             </Header.Content>
//           </Header>
//           <List>
//             {this.state.languageBookmarks.map(bookmark => (
//               <BookmarksList
//                 key={bookmark.id}
//                 bookmark={bookmark}
//                 deleteLanguageBookmark={this.deleteLanguageBookmark}
//                 updateLanguageBookmark={this.updateLanguageBookmark}
//               />
//             ))}
//           </List>
//         </div>
//         {/* Videos */}
//         <div>
//           <Header as="h1" style={{ marginLeft: 20, marginTop: 20 }}>
//             <Icon name="video" style={{ color: "#15CA00" }} />
//             <Header.Content>
//               Videos
//               <VideoForm
//                 archiveId={this.archiveId}
//                 addLanguageVideo={this.addLanguageVideo}
//               />
//               <Header.Subheader>
//                 All videos relating to this Archive
//               </Header.Subheader>
//             </Header.Content>
//           </Header>
//           <Card.Group itemsPerRow={2}>
//             {this.state.languageVideos.map(video => (
//               <VideoCard
//                 key={video.id}
//                 video={video}
//                 deleteLanguageVideo={this.deleteLanguageVideo}
//                 updateLanguageVideo={this.updateLanguageVideo}
//               />
//             ))}
//           </Card.Group>
//         </div>
//         <br />
//         <br />
//       </React.Fragment>
//     );
//   }
// }
