// import React, { Component } from "react";
// import {
//   Modal,
//   Button,
//   Header,
//   Icon,
//   Form,
//   Segment,
//   Grid,
//   Dropdown
// } from "semantic-ui-react";
// // import * as firebase from "firebase/app";
// // import "firebase/storage";
// import API from '../../modules/API'

// // TODO:
// // 1.Handle image editing
// // 2.Write close Modal function

// export default class LanguageEditForm extends Component {
//   state = {
//     title: "",
//     link: "",
//     imageURL: null,
//     userId: this.props.currentUser
//   };

//   componentDidMount() {
//     API.get("languages", this.props.language.id)
//     .then(language => {
//       this.setState({
//         title: language.title,
//         link: language.link,
//         imageURL: language.imageURL,
//         userId: this.props.currentUser
//       });
//     });
//   }
// //   storageRef = firebase.storage().ref("library_profiles");

// //   submit = () => {
// //     //will determine name of storage reference
// //     const ref = this.storageRef.child(this.state.title);

// //     return ref
// //       .put(this.state.imageURL)
// //       .then(data => data.ref.getDownloadURL())
// //       .then(iURL => {
// //         return this.props.addLanguage({
// //           title: this.state.title,
// //           link: this.state.link,
// //           imageURL: iURL,
// //           userId: this.props.currentUser
// //         });
// //       });
// //   };

// handleFieldChange = evt => {
//     const stateToChange = {};
//     stateToChange[evt.target.id] = evt.target.value;
//     this.setState(stateToChange);
//   };

//   updateExistingEvent = evt => {
//     evt.preventDefault();
//     const editedLanguage = {
//       title: this.state.title,
//       link: this.state.link,
//       imageURL: this.state.imageURL,
//       userId: this.props.currentUser,
//       id: this.props.language.id
//     };
//     this.props.updateLanguage(editedLanguage);
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Modal
//           trigger={
//             <Dropdown.Item
//             icon="pencil"
//             description="Edit"
//           />
//           }
//           style={{ width: "30em" }}
//         >
//           <Modal.Content>
//             <Header size="huge" textAlign="center">
//               <div>
//                 <Icon
//                   name="file code outline"
//                   size="large"
//                   style={{ color: "#15CA00" }}
//                 />
//               </div>
//               Edit Language
//             </Header>

//             <Modal.Description>
//               <Grid textAlign="center" verticalAlign="middle">
//                 <Grid.Column>
//                   <Form size="large">
//                     <Segment>
//                       <Form.Input
//                         fluid
//                         placeholder="Language"
//                         onChange={this.handleFieldChange}
//                         id="title"
//                         value={this.state.title}
//                       />
//                       <Form.Input
//                         fluid
//                         placeholder="Documentation URL"
//                         onChange={this.handleFieldChange}
//                         id="link"
//                         value={this.state.link}
//                       />
//                       {/* <Form.Input
//                         fluid
//                         placeholder="Image"
//                         onChange={e =>
//                           this.setState({ imageURL: e.target.files[0] })
//                         }
//                         type="file"
//                         id="imageURL"
//                         value={this.state.imageURL}
//                       /> */}
//                       <Button primary fluid size="large" onClick={this.updateExistingEvent}>
//                         Submit
//                       </Button>
//                     </Segment>
//                   </Form>
//                 </Grid.Column>
//               </Grid>
//             </Modal.Description>
//           </Modal.Content>
//         </Modal>
//       </React.Fragment>
//     );
//   }
// }
