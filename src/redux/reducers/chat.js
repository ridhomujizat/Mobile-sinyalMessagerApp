const initialState = {
  chatList: {
    results: null,
    pageInfo: null
  },
  chatRoom: {
    results: null,
    pageInfo: {
      nextLink: true
    }
  },
  contact: {
    results: null,
    pageInfo: null
  },
  idReceiver: null,
  message: null,
  errorMsg: null
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHAT': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'ADD_CHAT': {
      return {
        ...state,
        chatRoom: {
          results: [...state.chatRoom.results, ...action.payload.chatRoom.results],
          pageInfo: action.payload.chatRoom.pageInfo
        },
        message: action.payload.message
      }
    }
    case 'ERROR': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    case 'CLEAR_MSG': {
      return {
        ...state,
        message: null,
        errorMsg: null
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default chatReducer
