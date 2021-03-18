import http from '../../helpers/http'

export const chatList = (token, cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      const results = await http(token).get(`chat?${cond || ''}`)
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
      const results = await http(token).get(`contact?${cond || ''}`)
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

      const results = await http(token).get(`chat/${id}?${cond || ''}`)
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
export const scrollChatRoom = (token, id, cond) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })

      const results = await http(token).get(`chat/${id}?${cond || ''}`)
      dispatch({
        type: 'ADD_CHAT',
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
export const sendChat = (token, id, message) => {
  return async dispatch => {
    const params = new URLSearchParams()
    params.append('chat', message)
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      await http(token).post(`chat/${id}`, params)
    } catch (error) {
      const { message } = error.response.data
      dispatch({
        type: 'ERROR',
        payload: message
      })
    }
  }
}
export const selectChat = (id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'CLEAR_MSG'
      })
      dispatch({
        type: 'UPDATE_CHAT',
        payload: { idReceiver: id }
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
