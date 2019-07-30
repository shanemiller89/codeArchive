import React, { Component } from 'react'
import Authentication from './components/authentication/Authentication';
import {getUserFromLocalStorage, logout } from './components/authentication/userManager';


export default class CodeArchive extends Component {

    state = {
        user: getUserFromLocalStorage()
      }
    
      logUserOut = () => {
        this.setState({ user: null });
        logout();
      }

    render() {
        return (
            <div>
                <Authentication />
            </div>
        )
    }
}
