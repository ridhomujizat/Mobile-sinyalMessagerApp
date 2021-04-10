import React, { Component } from 'react'
import { StyleSheet, View, TextInput, ActivityIndicator, Text, Pressable, Modal, Image } from 'react-native'
import Camera from '../assets/images/icon/camera.png'
import Galery from '../assets/images/icon/galery.png'
import { Formik } from 'formik'
import { hashCode } from '../helpers/color'
import { API_URL } from '@env'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { updateProfile, notAfterLogin } from '../redux/actions/profile'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, '*First Names must have at least 2 characters')
    .max(50, '*First name must be less than 50 characters')
    .required('*First name is required'),
  lastName: Yup.string()
    .min(2, '*First Names must have at least 2 characters')
    .max(50, '*First name must be less than 50 characters')
    .optional()
})
class Profile extends Component {
  state = {
    modal: false,
    loading: false,
    message: null,
  }

  async updateProfile (values) {
    const { token } = this.props.auth
    await this.props.updateProfile(token, values)
    await this.props.notAfterLogin()
    await this.props.navigation.navigate('Home')
  }
  launchCamera = () => {
    const { token } = this.props.auth
    let options = {
      quality: 0.3,
    }
    launchCamera(options, async (response) => {
      if (response.errorMessage) {
        this.showModal()
        this.showingMessage('Unable To Lauch Gallery', `${response.errorCode} ${response.errorMessage}`)
      } else if (response.didCancel) {
        console.log('cancel')
      } else if (response.fileSize >= 500 * 1024) {
        this.showModal()
        this.showingMessage('Image To large', 'Please pick another image')
      } else {
        this.showModal()
        await this.setState({ loading: true })
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }
        try {
          await this.props.updateProfile(token, { picture: image })
          await this.setState({ loading: false })
        } catch (err) {
          await this.setState({ loading: false })
          this.showingMessage(`Picture failed to update`, this.props.auth.errorMsg)
        }
      }
    })
  }
  launchGalery = () => {
    const { token } = this.props.auth
    let options = {
      saveToPhotos: true,
      mediaType: 'photo'
    }
    launchImageLibrary(options, async (response) => {
      if (response.errorMessage) {
        this.showModal()
        this.showingMessage('Unable To Lauch Gallery', `${response.errorCode} ${response.errorMessage}`)
      } else if (response.didCancel) {
        console.log('cancel')
      } else if (response.fileSize >= 500 * 1024) {
        this.showModal()
        this.showingMessage('Image To large', 'Please choose another image')
      } else {
        this.showModal()
        await this.setState({ isLoading: true })
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }
        try {
          await this.props.updateProfile(token, { picture: image })
          await this.setState({ isLoading: false })
        } catch (err) {
          await this.setState({ isLoading: false })
          this.showingMessage(`Picture failed to update`, this.props.auth.errorMsg)
        }
      }
    })
  }
  showModal () {
    this.setState({ modal: !this.state.modal })
  }
  async showingMessage (title, message) {
    await this.setState({ message: `${title}, ${message}` })
    await setTimeout(() => {
      this.setState({ message: null })
    }, 2000);
  }
  render () {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            this.showModal()
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.confirmationWrapper}>
              <View style={styles.padding}>
                <Pressable onPress={() => this.launchCamera()}
                  style={styles.flexwarp}
                >
                  <Image source={Camera} style={styles.iconImage} />
                  <Text>Camera</Text>
                </Pressable>
                <View >
                  <Pressable onPress={() => this.launchGalery()}
                    style={styles.flexwarp}>
                    <Image source={Galery} style={styles.iconImage} />
                    <Text>Galery</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Formik
            validationSchema={validationSchema}
            onSubmit={values => this.updateProfile(values)}
            // initialValues={{ firstName: null, lastName: null }}
            initialValues={{ firstName: this.props.auth.firstName, lastName: this.props.auth.lastName }}
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
                <View style={styles.editProfile}>
                  <Text style={styles.title}>Set up your profile</Text>
                  <Pressable onPress={() => this.showModal()}>
                    {this.props.auth.picture
                      ? (<Image style={styles.picture} source={{ uri: `${API_URL}${this.props.auth.picture}` }} />)
                      : (<View style={[styles.picture, { backgroundColor: `${hashCode(this.props.auth.firstName)}` }]}>
                        <Text style={styles.profileName}>{values.firstName.slice(0, 1)}</Text>
                      </View>)}
                    <View style={styles.iconSmallWrapper}>
                      <Image style={styles.iconSmall} source={Camera} />
                    </View>
                  </Pressable>
                  <Text>{`${values.firstName} ${values.lastName}`}</Text>
                  {this.state.message && (
                    <Text style={styles.textErrorPicture}>*{this.state.message}</Text>
                  )}
                  <TextInput
                    placeholder='Your Frist Name'
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  {errors.firstName && touched.firstName
                    ? <Text style={styles.textError}>{errors.firstName}</Text>
                    : null}
                  <TextInput
                    placeholder='Last Name (Optional)'
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  {errors.lastName && touched.lastName
                    ? <Text style={styles.textError}>{errors.lastName}</Text>
                    : null}

                  <Text style={styles.textInfo}>Your profile is end-to-end encrypted. Your profile and change to
                  it will be visible to your contacts, when you initiate or accept new conversations, and when
                  your join new groups
          </Text>
                </View>
                {this.state.loading
                  ? <ActivityIndicator size='large' color="#FE9AB4" style={styles.loading} />
                  : (<Pressable style={[styles.button, !isValid || values.firstName === '' ? { backgroundColor: '#FFD4E0', elevation: 0 } : null]}
                    onPress={handleSubmit}
                    android_ripple={{ color: '#B65971', borderless: false }} disabled={!isValid || values.firstName === ''}>
                    <Text style={styles.buttonText}>
                      CONTINUE
            </Text>
                  </Pressable>)}
              </>
            )}
          </Formik>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editProfile: {
    alignItems: 'center',
    width: '90%'
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  picture: {
    height: 90,
    width: 90,
    borderRadius: 50,
    backgroundColor: '#C4c4c4',
    justifyContent: 'center'
  },
  profileName: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 40,
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 20,
    paddingBottom: 0
  },
  textInfo: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 13,
    color: '#c4c4c4',
    marginTop: 20
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
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmationWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  padding: {
    padding: 30
  },
  iconImage: {
    width: 30,
    height: 30,
    marginRight: 20
  },
  flexwarp: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  textError: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: 'red'
  },
  textErrorPicture: {
    fontFamily: 'Roboto-Reguler',
    fontSize: 12,
    color: 'red',
    maxWidth: 150
  },
  loading: {
    marginTop: 20
  },
  iconSmallWrapper: {
    elevation: 4,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 0
  },
  iconSmall: {
    width: 20,
    height: 20
  }

})

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = { updateProfile, notAfterLogin }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
