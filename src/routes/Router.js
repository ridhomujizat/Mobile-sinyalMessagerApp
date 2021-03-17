import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PrivacyPolice from '../screen/PrivacyPolice'
import InputEmail from '../screen/InputEmail'
import ActivateEmail from '../screen/ActivateEmail'
import Profile from '../screen/Profile'
import Home from '../screen/ChatList'
import RoomChat from '../screen/RoomChat'
import Contact from '../screen/Contact'

import { connect } from 'react-redux'

const Stack = createStackNavigator()

function Router (props) {
  const { token, afterLogin } = props.auth

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide()
  //   }, 2000)
  // }, [])
  return (
    <Stack.Navigator screenOptions={{ header: () => false }}>
      { token === null && (
        <>
          <Stack.Screen component={PrivacyPolice} name='PrivacyPolice' />
          <Stack.Screen component={InputEmail} name='InputEmail' />
          <Stack.Screen component={ActivateEmail} name='ActivateEmail' />
        </>
      )}
      {token && afterLogin && (
        <Stack.Screen component={Profile} name='Profile' />
      )}
      {token && (
        <>
          <Stack.Screen component={Home} name='Home' />
          <Stack.Screen component={RoomChat} name='RoomChat' />
          <Stack.Screen component={Contact} name='Contact' />
        </>
      )}
    </Stack.Navigator>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Router)
