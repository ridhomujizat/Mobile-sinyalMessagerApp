
import React, { Component } from 'react';
import io from './helpers/socket';
import { connect } from 'react-redux';
import { chatRoom, chatList } from './redux/actions/chat';
import PushNotification from 'react-native-push-notification'

PushNotification.createChannel(
  {
    channelId: 'chat', // (required)
    channelName: 'New Chat', // (required)
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
)

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
      io.on(id, async (msg) => {
        await this.getListChat(token)
        PushNotification.localNotification({
          channelId: 'chat',
          title: 'New Message',
          message: msg
        })
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