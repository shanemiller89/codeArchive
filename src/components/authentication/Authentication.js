import React, { Component } from 'react'
import LoginNavBar from "./LoginNavBar"
import Login from './Login';
export default class Authentication extends Component {
    render() {
        return (
            <React.Fragment>
                <LoginNavBar />
            </React.Fragment>
        )
    }
}
