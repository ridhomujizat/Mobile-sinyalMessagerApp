import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { connect } from 'react-redux'
import { login } from '../redux/actions/auth'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required')
})
class InputEmail extends Component {
  state = {
    loading: false
  }
  async sendEmail (values) {
    this.setState({ loading: true })
    console.log(values.email)
    await this.props.login(values.email)
    await this.setState({ loading: false })
    this.props.navigation.navigate('ActivateEmail')
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Enter your email to get started</Text>
          <Text style={styles.textSmall}>
            You will receive a  verification code.
            Carrier rates may apply.
          </Text>
          <Formik
            validationSchema={validationSchema}
            onSubmit={values => this.sendEmail(values)}
            initialValues={{ email: '' }}
          >
            {(
              {
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched
              }) => (
              <>
                <TextInput
                  style={styles.inputEmail}
                  placeholder='Input Your Email'
                  value={values.email}
                  autoCompleteType='email'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email
                  ? <Text style={styles.textError}>{errors.email}</Text>
                  : null}
                {this.state.loading
                  ? <ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />
                  : (<Pressable style={styles.button}
                    onPress={handleSubmit}
                    android_ripple={{ color: '#B65971', borderless: false }}
                    disabled={!isValid}>
                    <Text style={styles.buttonText}>
                      NEXT
                    </Text>
                  </Pressable>)
                }
              </>
            )}
          </Formik>
        </View>
      </ScrollView>)
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
    color: '#484848'
  },
  textSmall: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: '#484848',
    marginTop: 30,
    textAlign: 'center',
    marginBottom: 50,
    width: 200
  },
  inputEmail: {
    borderRadius: 5,
    borderColor: '#484848',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: '90%',
    paddingLeft: 20
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
  textError: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: 'red'
  },
  loading: {
    marginTop: 20
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = { login }
export default connect(mapStateToProps, mapDispatchToProps)(InputEmail)
