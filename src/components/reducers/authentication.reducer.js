import { userConstants ,authenticationConstants} from '../_constants';
debugger;
const initialState =  { loggedIn: false,IsValidCrendentials:true, username:'',password:'',ErrorMessage:'',errors:{} };

export function authentication(state = initialState, action) {
  switch (action.type) { 
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
    return {
      ...state,
      loggedIn: false,
      IsValidCrendentials:true,
       username:'',
       password:'',
       ErrorMessage:'',
       errors:{}
    };
    case authenticationConstants.INVALIDFORM:

    return {
      ...state,
      'errors':action.errors
    }

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };

    case authenticationConstants.UPDATE_FIELD_EDITOR:
    return { ...state,  [action.key]: action.value,'errors':{}};
    
    default:
      return state
  }
}