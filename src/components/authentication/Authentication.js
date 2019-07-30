import React, { Component } from 'react'
import LoginNavBar from "./LoginNavBar"
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class Authentication extends Component {
    render() {
        return (
            <React.Fragment>
                <LoginNavBar />
            </React.Fragment>
        )
    }
}
