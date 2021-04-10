import React, { Component } from 'react'
import { StyleSheet, View, Pressable, Image, TextInput, Text, FlatList, ActivityIndicator } from 'react-native'
import Goback from '../assets/images/icon/goback.png'
import { API_URL } from '@env'
import { hashCode } from '../helpers/color'
import { connect } from 'react-redux'
import { contactList, scrollContactList } from '../redux/actions/chat'
import qs from 'querystring'
import ASC from '../assets/images/icon/sort.png'
import DESC from '../assets/images/icon/sort-desc.png'

class Contact extends Component {
  state = {
    search: '',
    sort: 'firstName',
    order: 'ASC',
    loading: true
  }
  componentDidMount () {
    this.fetchData()
  }

  search = async (value) => {
    const { token } = this.props.auth
    await this.setState({ search: value })
    await this.setState({ loading: true })
    const cond = await qs.stringify({ ...this.state })
    await this.props.contactList(token, cond)
    await this.setState({ loading: false })
  }

  sort = async (value) => {
    const { token } = this.props.auth
    const order = this.state.order === 'ASC' ? 'DESC' : 'ASC'
    await this.setState({ loading: true })
    await this.setState({ sort: value, order: order })
    const cond = await qs.stringify({ ...this.state })
    await this.props.contactList(token, cond)
    await this.setState({ loading: false })
  }
  async fetchData () {
    const { token } = this.props.auth
    await this.props.contactList(token)
    await this.setState({ loading: false })
  }
  async nextPage () {
    const { token } = this.props.auth
    const { nextLink } = this.props.chat.contact.pageInfo
    if (nextLink !== null) {
      await this.props.scrollContactList(token, nextLink.replace('&undefined=', ''))
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Pressable onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={styles.iconBack} source={Goback} />
            </Pressable>
            <TextInput placeholder='Search contact' style={styles.input} onChangeText={(value) => this.search(value)} />
            <Pressable onPress={() => this.sort('firstName')}>
              <Image style={styles.iconBack} source={this.state.order === 'ASC' ? ASC : DESC} />
            </Pressable>
          </View>
        </View>
        {this.state.loading
          ? (<ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />)
          : (<FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.chat.contact.results}
            keyExtractor={(item) => String(item.id)}
            onEndReached={() => this.nextPage()}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <>
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
              </>
            )}
          />)}
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
    width: '75%',
    paddingTop: 0,
    marginRight: 3
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
  loading: {
    marginTop: 40
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
})
const mapDispatchToProps = { contactList, scrollContactList }
export default connect(mapStateToProps, mapDispatchToProps)(Contact)
