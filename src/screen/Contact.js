import React, { Component } from 'react'
import { StyleSheet, View, Pressable, Image, TextInput, Text, FlatList } from 'react-native'
import Goback from '../assets/images/icon/goback.png'
import { API_URL } from '@env'
import { hashCode } from '../helpers/color'
import { connect } from 'react-redux'
import { contactList } from '../redux/actions/chat'

class Contact extends Component {
  state = {
    contact: []
  }
  componentDidMount () {
    this.fetchData()
  }

  async fetchData () {
    const { token } = this.props.auth
    await this.props.contactList(token)
    await this.setState({ contact: this.props.chat.contact.results })
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Pressable onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={styles.iconBack} source={Goback} />
            </Pressable>
            <TextInput placeholder='Search contact' style={styles.input} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.contact}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable onPress={() => this.props.navigation.navigate('RoomChat', { data: item })}>
              <View style={styles.column}>
                {item.picture
                  ? (<Image source={{ uri: `${API_URL}${item.picture}` }} style={styles.picture} />)
                  : (<View style={[styles.profileFriend, { backgroundColor: `${hashCode(item.firstName)}` }]}>
                    <Text style={styles.profileName}>{item.firstName.slice(0, 1)}</Text>
                  </View>)}
                <View>
                  <Text>{item.firstName} {item.lastName}</Text>
                  <Text>{item.email}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
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
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    width: '80%',
    paddingTop: 0
  },
  iconBack: {
    height: 25,
    width: 25,
    marginRight: 20
  },
  column: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileFriend: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FE9AB4',
    justifyContent: 'center',
    marginRight: 10
  },
  profileName: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  picture: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'cover',
    borderRadius: 60
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
})
const mapDispatchToProps = { contactList }
export default connect(mapStateToProps, mapDispatchToProps)(Contact)
