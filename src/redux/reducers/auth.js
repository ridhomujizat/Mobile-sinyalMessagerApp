const initialState = {
  afterLogin: true,
  id: null,
  token: null,
  firstName: 'S',
  lastName: '',
  email: null,
  picture: null,
  message: null,
  errorMsg: null
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
        firstName: 'signal',
        lastName: null,
        message: null,
        errorMsg: null,
        id: null,
        afterLogin: true
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
