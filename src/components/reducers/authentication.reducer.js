import { userConstants ,authenticationConstants} from '../_constants';
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user? 
                  { user:{ ...JSON.parse(localStorage.getItem('user'))[0] },loggedIn: true,IsValidCrendentials:true, username:'',password:'',ErrorMessage:'',errors:{} }:
                  { loggedIn: false,IsValidCrendentials:true, username:'',password:'',ErrorMessage:'',errors:{} };

export function authentication(state = initialState, action) {
  switch (action.type) { 

    case "ACCOUNTLOCKED":
    return{
      ...state,
      IsValidCrendentials:false,
      ErrorMessage:'Your Account has been locked!'
    }
    case "INVALIDCREDENTIAL":
    return{
      ...state,
      IsValidCrendentials:false,
      ErrorMessage:'Invalid UserName and Password!'
    }
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