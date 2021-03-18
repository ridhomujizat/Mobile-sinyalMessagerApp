import React, { Component } from 'react'
import { StyleSheet, View, Pressable, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import Goback from '../assets/images/icon/goback.png'
import Logout from '../assets/images/icon/logout.png'
import { API_URL } from '@env'
import { hashCode } from '../helpers/color'

class Setting extends Component {
  render () {
    const { auth } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Pressable onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={styles.iconBack} source={Goback} />
            </Pressable>
            <Text style={styles.Signal}>Setting</Text>
          </View>
        </View>
        <Pressable
          onPress={() => this.props.navigation.navigate('ProfileUpdate')}
          style={styles.press}
          android_ripple={{ color: '#FE9AB4', borderless: false }}>
          <View style={styles.flexRow}>
            {auth.picture
              ? (<Image style={styles.picture} source={{ uri: `${API_URL}${auth.picture}` }} />)
              : (<View style={[styles.picture, { backgroundColor: `${hashCode(this.props.auth.firstName)}` }]}>
                <Text style={styles.profileName}>{this.props.auth.firstName.slice(0, 1)}</Text>
              </View>)
            }
            <View>
              <Text style={styles.name}>{auth.firstName} {auth.lastName}</Text>
              <Text style={styles.text}>{auth.email}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => this.props.dispatch({ type: 'LOGOUT' })}
          style={styles.press}
          android_ripple={{ color: '#FE9AB4', borderless: false }}>
          <View style={styles.flexRow}>
            <Image style={styles.icon} source={Logout} />
            <View>
              <Text style={styles.title}>Logout</Text>
              <Text style={styles.text}>Change Account</Text>
            </View>
          </View>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBack: {
    height: 25,
    width: 25,
    marginRight: 20
  },
  Signal: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#484848'
  },
  picture: {
    width: 65,
    height: 65,
    borderRadius: 60,
    marginVertical: 10,
    marginRight: 30,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  },
  press: {
    paddingHorizontal: 20
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginBottom: 5
  },
  title: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 18
  },
  text: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 14,
    color: '#787878'
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
    marginVertical: 30
  },
  profileName: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Setting)
