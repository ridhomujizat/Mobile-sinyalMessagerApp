
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
  };

  componentDidMount () {
    const { id } = this.props.auth
    const { token } = this.props.auth
    io.onAny(() => {
      if (id) {
        io.once(id, (msg) => {
          this.getListChat(token)
        })
      }
    })

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