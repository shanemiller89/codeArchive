import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import ApplicationViews from '../../ApplicationViews';

const height = {
  marginTop: "45px",
  height: "100vh"
}
export default class SideBar extends Component {
  state = { visible: false }


  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable style={height} as={Segment}>
          <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible="true"
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='book' />
              Library
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='dont' />
              Issues
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='code' />
              Code
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <ApplicationViews />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}