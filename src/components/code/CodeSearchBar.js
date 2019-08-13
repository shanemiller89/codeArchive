import React, { Component } from 'react'
import { Search } from 'semantic-ui-react';
import "./CodeSearchBar.css";

export default class IssuesSearchBar extends Component {
    render() {
        return (
            <div>
                <Search className/>
            </div>
        )
    }
}
