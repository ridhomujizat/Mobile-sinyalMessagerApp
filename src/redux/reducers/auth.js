const initialState = {
  id: null,
  token: null,
  firstName: 'S',
  lastName: null,
  email: null,
  picture: null,
  message: null,
  errorMsg: null,
  afterLogin: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'LOGOUT': {
      return {
        token: null,
        firstName: null,
        lastName: null,
        message: null,
        errorMsg: null
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

export default authReducer
