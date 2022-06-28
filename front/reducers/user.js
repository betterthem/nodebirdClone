export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
}

//action
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

// 이전 상태와, 액션을 통해서 다음 상태를 만들어내는 함수
// (이전상태, 액션) => 다음상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      }
    default:
      return state;
  }
}

export default reducer;