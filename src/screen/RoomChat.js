import React, { Component } from 'react'
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Goback from '../assets/images/icon/goback.png'
import Send from '../assets/images/icon/send.png'
import Chatbubble from '../components/Chatbubble'
import { API_URL } from '@env'
import { hashCode } from '../helpers/color'
import { connect } from 'react-redux'
import { chatRoom, sendChat, scrollChatRoom } from '../redux/actions/chat'
import io from '../helpers/socket';

class RoomChat extends Component {
  state = {
    loading: true,
    update: false,
    message: null,
    pageInfo: {
      nextLink: null
    }
  }
  componentDidMount () {
    const { id } = this.props.auth
    const { token } = this.props.auth
    const { data } = this.props.route.params
    this.fetchData()
    io.onAny(() => {
      this.setState({ update: !this.state.update })
      if (this.state.update) {
        io.once(id, (msg) => {
          this.updateChat(token, data.id)
          this.setState({ update: !this.state.update })
        })
      }
    })
  }
  updateChat = async (token, sender) => {
    await this.props.chatRoom(token, sender);
  };
  async fetchData () {
    const { data } = this.props.route.params
    const { token } = this.props.auth
    console.log(data.id)
    await this.props.chatRoom(token, data.id)
    await this.setState({ loading: false })
  }

  async sendChat () {
    const { data } = this.props.route.params
    const { token } = this.props.auth
    await this.props.sendChat(token, data.id, this.state.message)
    await this.setState({ message: null })
    await this.fetchData()
  }

  async nextPage () {
    const { data } = this.props.route.params
    const { token } = this.props.auth
    const { nextLink } = this.props.chat.chatRoom.pageInfo
    if (nextLink !== null) {
      console.log(nextLink.replace('&undefined=', ''))
      await this.props.scrollChatRoom(token, data.id, nextLink.replace('&undefined=', ''))
      await this.setState({
        pageInfo: this.props.chat.chatRoom.pageInfo
      })
    }
    console.log(nextLink)
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
              <Text style={styles.profileNameSmall}>{data.firstName.slice(0, 1)}</Text>
            </View>)}
          <Text style={styles.Name}>{data.firstName} {data.lastName}</Text>
        </View>
        <View >
          {this.state.loading && (
            <View style={styles.chatWrapper}>
              <ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />
            </View>
          )}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.chat.chatRoom.results}
            keyExtractor={(item) => String(item.id)}
            inverted={true}
            onEndReached={() => this.nextPage()}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <Chatbubble isMe={this.props.auth.id === item.idSender}>{item.chat}</Chatbubble>
            )}
            ListHeaderComponent={() => (<View style={styles.footer}></View>)}
            ListFooterComponent={() => {
              const { nextLink } = this.props.chat.chatRoom.pageInfo
              if (nextLink !== null) {
                return (<View style={styles.chatWrapper}>
                  <ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />
                </View>)
              } else {
                return (<View style={styles.chatWrapper}>
                  {data.picture
                    ? (<Image source={{ uri: `${API_URL}${data.picture}` }} style={styles.profileFriend} />)
                    : (<View style={[styles.profileFriend, { backgroundColor: `${hashCode(data.firstName)}` }]}>
                      <Text style={styles.profileName}>{data.firstName.slice(0, 1)}</Text>
                    </View>)}
                  <Text style={styles.nameContact}>{data.firstName} {data.lastName}</Text>
                  <Text>{data.email}</Text>
                </View>)
              }
            }}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Write message...' style={styles.inputText}
              value={this.state.message}
              onChangeText={(value) => this.setState({ message: value })} />
            <View style={styles.bottonWrapper}>
              <Pressable
                android_ripple={{ color: '#B65971', borderless: false }}
                style={styles.sendBotton}
                disabled={this.state.message === null}
                onPress={() => this.sendChat()}
              >
                <Image source={Send} style={styles.sendIcon} />
              </Pressable>
            </View>
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
  bottonWrapper: {
    borderRadius: 35,
    overflow: 'hidden'
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
  },
  chatWrapper: {
    paddingVertical: 50,
    alignItems: 'center'
  },
  footer: {
    paddingBottom: 120,
  },
  profileFriend: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#FE9AB4',
    marginRight: 10,
    justifyContent: 'center'
  },
  profileName: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  profileNameSmall: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  nameContact: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginVertical: 10
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
})
const mapDispatchToProps = { chatRoom, sendChat, scrollChatRoom }
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
