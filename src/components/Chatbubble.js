import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

class ChatBubble extends Component {
  render () {
    return (
      <View style={[this.props.isMe ? styles.wrapperIsMe : styles.wrapperPeople]}>
        <View style={[styles.chatBubble, this.props.isMe ? styles.isMeColor : styles.peopleColor]}>
          <Text style={styles.textChat}>
            {this.props.children}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapperPeople: {
    alignItems: 'flex-start',
    marginBottom: 15
  },
  wrapperIsMe: {
    alignItems: 'flex-end',
    marginBottom: 15
  },
  chatBubble: {
    padding: 12,
    borderRadius: 15,
    maxWidth: '75%'
  },
  peopleColor: {
    backgroundColor: '#FE9AB4'
  },
  isMeColor: {
    backgroundColor: '#c4c4c4'
  },
  textChat: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12
  }
})

export default ChatBubble
