
import React, { Component } from 'react';
import io from './helpers/socket';
import { connect } from 'react-redux';
import { chatRoom, chatList } from './redux/actions/chat';

class Root extends Component {
  state = {
    idReceiver: null
  }
  getListChat = async (token) => {
    await this.props.chatList(token);
  }
  getRoomChat = async (token, idReceiver) => {
    await this.props.chatRoom(token, idReceiver);
  }
  componentDidMount () {
    const { id } = this.props.auth
    const { token } = this.props.auth
    const { idReceiver } = this.props.chat
    if (token) {
      io.on(id, (msg) => {
        this.getListChat(token)
      })
    }
    if (idReceiver) {
      io.on(id, async (msg) => {
        await this.getRoomChat(token, idReceiver)
      })
    }
  }
  render () {
    return <>{this.props.children}</>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

const mapDispatchToProps = { chatRoom, chatList };

export default connect(mapStateToProps, mapDispatchToProps)(Root);