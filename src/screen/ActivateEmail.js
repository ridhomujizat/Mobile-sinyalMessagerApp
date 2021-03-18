import React, { Component } from 'react'
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect } from 'react-redux'
import { confirmLogin } from '../redux/actions/auth'

class ActivateEmail extends Component {
  state = {
    code: '',
    loading: false
  }
  async handleSubmit () {
    const { code } = this.state
    const { email } = this.props.auth

    this.setState({ loading: true })
    console.log(this.state.code)
    await this.props.confirmLogin(email, code)
    await this.setState({ loading: false })
    if (this.props.auth.erroMsg === null) {
      this.props.navigation.navigate('Profile')
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          We sending code to your email, check your email.
        </Text>
        <SmoothPinCodeInput
          value={this.state.code}
          onTextChange={code => this.setState({ code: code })}
        />
        {this.state.loading
          ? <ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />
          : (<Pressable style={styles.button} onPress={() => this.handleSubmit()}
            android_ripple={{ color: '#B65971', borderless: false }}
            disabled={this.state.code === ''}
          >
            <Text style={styles.buttonText}>
              NEXT
            </Text>
          </Pressable>)
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  textTitle: {
    marginTop: 40,
    fontFamily: 'Roboto-Reguler',
    fontSize: 24,
    textAlign: 'center',
    color: '#484848',
    marginBottom: 20
  },
  button: {
    marginVertical: 20,
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
  },
  loading: {
    marginTop: 20
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = { confirmLogin }
export default connect(mapStateToProps, mapDispatchToProps)(ActivateEmail)