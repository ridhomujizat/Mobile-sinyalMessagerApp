import http from '../../helpers/http'

export const updateProfile = (token, data) => {
  return async dispatch => {
    const form = new FormData()
    Object.keys(data).forEach(key => {
      form.append(key, data[key])
    })
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http(token).patch('user', form)
      dispatch({
        type: 'LOGIN',
        payload: {
          ...results.data.results,
          message: results.data.message
        }
      })
    } catch (error) {
      const { message } = error.response.data
      dispatch({
        type: 'ERROR',
        payload: message
      })
    }
  }
}

export const notAfterLogin = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      payload: {
        afterLogin: false
      }
    })
  }
}
