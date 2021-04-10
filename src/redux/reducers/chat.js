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
    case 'ADD_CHATLIST': {
      return {
        ...state,
        chatList: {
          results: [...state.chatList.results, ...action.payload.chatList.results],
          pageInfo: action.payload.chatList.pageInfo
        },
        message: action.payload.message
      }
    }
    case 'ADD_CONTACTLIST': {
      return {
        ...state,
        contact: {
          results: [...state.contact.results, ...action.payload.contact.results],
          pageInfo: action.payload.contact.pageInfo
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
