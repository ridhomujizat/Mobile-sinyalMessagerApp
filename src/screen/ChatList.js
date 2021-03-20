import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, FlatList } from 'react-native'
import Search from '../assets/images/icon/search.png'
import dot from '../assets/images/icon/dot.png'
import Goback from '../assets/images/icon/goback.png'
import Pen from '../assets/images/icon/pen.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { chatList, selectChat } from '../redux/actions/chat'
import { parsingTime } from '../helpers/date'
import { hashCode } from '../helpers/color'
import { API_URL } from '@env'
import qs from 'querystring'

class ChatList extends Component {
  state = {
    search: false,
    searchText: '',
  }
  componentDidMount () {
    this.fetchData()
    this.willFocusSubscription = this.props.navigation.addListener('focus', () => {
      this.fetchData()
    });
  }
  componentWillUnmount () {
    this.willFocusSubscription = false
  }


  search = async (value) => {
    const { token } = this.props.auth
    await this.setState({ searchText: value })
    const cond = await qs.stringify({
      search: this.state.searchText
    })
    await this.props.chatList(token, cond)
  }

  async fetchData () {
    const { token } = this.props.auth
    await this.props.chatList(token)
    await this.setState({ chat: this.props.chat.chatList.results })
  }
  showSearch () {
    this.setState({ search: !this.state.search })
    this.fetchData()
  }
  render () {
    return (
      <>
        <View style={styles.header}>
          {this.state.search
            ? (<>
              <View style={styles.flexRow}>
                <Pressable onPress={() => this.showSearch()}>
                  <Image style={styles.iconBack} source={Goback} />
                </Pressable>
                <TextInput onChangeText={(value) => this.search(value)} placeholder='Search Chat' style={styles.input} />
              </View>
            </>)
            : (<>
              <View style={styles.flexRow}>
                <Pressable onPress={() => this.props.navigation.navigate('Setting')}>
                  {this.props.auth.picture
                    ? (<Image style={styles.profile} source={{ uri: `${API_URL}${this.props.auth.picture}` }} />)
                    : (<View style={[styles.profile, { backgroundColor: `${hashCode(this.props.auth.firstName)}` }]} >
                      <Text style={styles.nameProfile}>{this.props.auth.firstName.slice(0, 1)}</Text>
                    </View>)
                  }</Pressable>
                <Text style={styles.Signal}>Signal</Text>
              </View>
              <View style={styles.flexRow}>
                <Pressable onPress={() => this.showSearch()}>
                  <Image source={Search} style={styles.icon} />
                </Pressable>
                <Pressable style={styles.iconDot}>
                  <Image source={dot} style={styles.icon} />
                </Pressable>
              </View>
            </>)
          }
        </View>
        <View style={styles.container}>

          <View style={styles.absolutebotton}>
            <TouchableOpacity style={styles.ChatBotton} onPress={() => this.props.navigation.navigate('Contact')}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.chat.chatList.results}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('RoomChat', { data: item })
                  this.props.selectChat(item.id)
                }
                }>
                  <View style={styles.column}>
                    <View style={styles.flexRow} >
                      {item.picture
                        ? (<Image source={{ uri: `${API_URL}${item.picture}` }} style={styles.picture} />)
                        : (<View style={[styles.profileFriend, { backgroundColor: `${hashCode(item.firstName)}` }]}>
                          <Text style={styles.profileName}>{item.firstName.slice(0, 1)}</Text>
                        </View>)}
                      <View style={styles.rowChat}>
                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.chat}>{item.chat}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.time}>{parsingTime(item.createdAt)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      </>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    paddingBottom: 10,
    elevation: 2
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  nameProfile: {
    textAlign: 'center',
    color: '#fff'
  },
  Signal: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: '#484848'
  },
  icon: {
    height: 20,
    width: 20
  },
  iconBack: {
    height: 25,
    width: 25,
    marginRight: 20
  },
  iconDot: {
    marginLeft: 20
  },
  input: {
    borderBottomWidth: 1,
    width: '80%',
    paddingTop: 0
  },
  ChatBotton: {
    elevation: 4,
    height: 60,
    width: 60,
    borderRadius: 45,
    backgroundColor: '#FE9AB4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  absolutebotton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    zIndex: 1
  },
  column: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picture: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'cover',
    borderRadius: 60
  },
  profileFriend: {
    width: 60,
    height: 60,
    borderRadius: 60,
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
  name: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 14,
    maxWidth: 200,
    maxHeight: 30

  },
  chat: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    maxWidth: 200,
    maxHeight: 30,
    color: '#727272'
  },
  rowChat: {
    maxWidth: 200
  },
  time: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: '#c4c4c4'
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
})
const mapDispatchToProps = { chatList, selectChat }
export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
