import React, { Component } from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Goback from '../assets/images/icon/goback.png'
import Send from '../assets/images/icon/send.png'
import Chatbubble from '../components/Chatbubble'
import { API_URL } from '@env'
import { hashCode } from '../helpers/color'
import { connect } from 'react-redux'
import { chatRoom } from '../redux/actions/chat'

class RoomChat extends Component {
  state = {
    chat: []
  }
  componentDidMount () {
    this.fetchData()
  }

  async fetchData () {
    const { data } = this.props.route.params
    const { token } = this.props.auth
    console.log(data.id)
    await this.props.chatRoom(token, data.id)
    await console.log(this.props.chat.chatRoom)
    await this.setState({ chat: this.props.chat.chatRoom.results })
  }

  render () {
    const { data } = this.props.route.params
    return (
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Pressable onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={styles.iconBack} source={Goback} />
          </Pressable>
          {data.picture
            ? (<Image source={{ uri: `${API_URL}${data.picture}` }} style={styles.profile} />)
            : (<View style={[styles.profile, { backgroundColor: `${hashCode(data.firstName)}` }]}>
              <Text style={styles.profileName}>{data.firstName.slice(0, 1)}</Text>
            </View>)}
          <Text style={styles.Name}>{data.firstName} {data.lastName}</Text>
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.chat}
            keyExtractor={(item) => String(item.id)}
            inverted={true}
            renderItem={({ item }) => (
              <Chatbubble isMe={this.props.auth.id === item.idSender}>{item.chat}</Chatbubble>
            )}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <TextInput placeholder='Write message...' style={styles.inputText} />
            <Pressable style={styles.sendBotton} >
              <Image source={Send} style={styles.sendIcon} />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginRight: 20,
    marginLeft: 10,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center'
  },
  profileName: {
    textAlign: 'center',
    color: '#fff'
  },
  Name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#484848'
  },
  iconBack: {
    height: 25,
    width: 25
  },
  wrapper: {
    backgroundColor: '#fff',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20
  },
  inputWrapper: {
    marginHorizontal: 20,
    backgroundColor: '#cccc',
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sendBotton: {
    height: 35,
    width: 35,
    borderRadius: 60,
    backgroundColor: '#FE9AB4'
  },
  inputText: {
    width: '90%'
  },
  sendIcon: {
    width: 25,
    height: 25,
    marginLeft: 3.5,
    marginTop: 6.5
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
})
const mapDispatchToProps = { chatRoom }
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
