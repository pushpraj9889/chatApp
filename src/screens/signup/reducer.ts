const intailState = {
  loginUserId: '',
};

const SignUpReducer = (state = intailState, action: any) => {
  const {type, payload} = action;
  console.log('payload', payload);

  switch (type) {
    case 'uid':
      return {...state, loginUserId: payload};
    default:
      return state;
  }
};
export default SignUpReducer;
