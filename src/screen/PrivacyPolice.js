import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import Vector from '../assets/images/policy.png'

class PrivacyPolice extends Component {
  render () {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.imageVector} source={Vector} />
            <Text style={styles.textTitle}>
              Take privacy with you.
          </Text>
            <Text style={styles.textTitle}>
              Be yourself in every
          </Text>
            <Text style={styles.textTitle}>
              message.
          </Text>
            <Text style={styles.textSmall}>
              Terms & Privacy Policy
            </Text>
            <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('InputEmail')}
              android_ripple={{ color: '#B65971', borderless: false }}>
              <Text style={styles.buttonText}>
                CONTINUE
            </Text>
            </Pressable>
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  imageVector: {
    height: 300,
    width: 300,
    resizeMode: 'cover'
  },
  textTitle: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 24,
    textAlign: 'center',
    color: '#484848'
  },
  textSmall: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: '#818181',
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    width: '90%',
    backgroundColor: '#FE9AB4',
    height: 42,
    borderRadius: 5,
    elevation: 2,
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
})
export default PrivacyPolice
