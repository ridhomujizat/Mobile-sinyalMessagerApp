import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PrivacyPolice from '../screen/PrivacyPolice'
import InputEmail from '../screen/InputEmail'
import ActivateEmail from '../screen/ActivateEmail'
import Profile from '../screen/Profile'
import Home from '../screen/ChatList'
import RoomChat from '../screen/RoomChat'
import Contact from '../screen/Contact'
import Setting from '../screen/Setting'
import ProfileUpdate from '../screen/ProfileUpdate'
import { connect } from 'react-redux'

const Stack = createStackNavigator()

function Router (props) {
  const { token, afterLogin } = props.auth

  useEffect(() => {
    console.log(afterLogin, token)
    // setTimeout(() => {
    //   SplashScreen.hide()
    // }, 2000)
  }, [])
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
          <Stack.Screen component={Setting} name='Setting' />
          <Stack.Screen component={ProfileUpdate} name='ProfileUpdate' />
        </>
      )}
    </Stack.Navigator>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Router)
