import http from '../../helpers/http'

export const login = (email) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http().post('user', params)
      dispatch({
        type: 'LOGIN',
        payload: {
          email: results.data.results.email,
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

export const confirmLogin = (email, pin) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('email', email)
    params.append('pin', pin)
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http().post('user/login', params)
      dispatch({
        type: 'LOGIN',
        payload: {
          ...results.data.results,
          firstName: results.data.results.firstName === null
            ? ''
            : results.data.results.firstName,
          lastName: results.data.results.lastName === null
            ? ''
            : results.data.results.lastName,
          afterLogin: true,
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
