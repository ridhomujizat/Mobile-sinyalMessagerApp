const initialState = {
  chatList: {
    results: null,
    pageInfo: null
  },
  chatRoom: {
    results: null,
    pageInfo: null
  },
  contact: {
    results: null,
    pageInfo: null
  },
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
