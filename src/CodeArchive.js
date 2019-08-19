import React, { Component } from 'react'
import Authentication from './components/authentication/Authentication';
import {getUserFromLocalStorage, logout } from './components/authentication/userManager';
// import ApplicationViews from './ApplicationViews'
import NavBar from './components/ui/NavBar'


export default class CodeArchive extends Component {

    state = {
        user: getUserFromLocalStorage(),
        authenticated: localStorage.getItem("user")
      }

      setAuthState = () => {
        if( localStorage.getItem("user")) {
          this.setState({authenticated: true})
        } else {
          this.setState({authenticated: false})
        }
      }


    render() {
        if(this.state.authenticated) {
            return(
            <React.Fragment>
              <NavBar />
            </React.Fragment>
            )
          } else {
          return (
            <React.Fragment>
            <Authentication setAuthState={this.setAuthState} />
            </React.Fragment>
          
          );
          }
    }
}
