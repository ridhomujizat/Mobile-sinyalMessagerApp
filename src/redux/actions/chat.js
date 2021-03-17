import http from '../../helpers/http'

export const chatList = (token, cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http(token).get('chat')
      dispatch({
        type: 'UPDATE_CHAT',
        payload: {
          chatList: {
            results: results.data.results,
            pageInfo: results.data.pageInfo
          },
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

export const contactList = (token, cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http(token).get('contact')
      dispatch({
        type: 'UPDATE_CHAT',
        payload: {
          contact: {
            results: results.data.results,
            pageInfo: results.data.pageInfo
          },
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

export const chatRoom = (token, id, cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http(token).get(`chat/${id}`)
      dispatch({
        type: 'UPDATE_CHAT',
        payload: {
          chatRoom: {
            results: results.data.results,
            pageInfo: results.data.pageInfo
          },
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
