
import { userConstants } from '../_constants';
import User from  '../models/user'
export function user(state = new User('','','',2,false,undefined,{}), action) {
    switch (action.type) {

      case "ROLE_CHANGED":
      return{
        ...state,
        RoleId:action.RoleId===2?1:2
      }

      case "SIGNUP_VALIDATIONSTATE":

      return{...state,
         RoleId:action.RoleId
        }
      case "USER_CREATED":
      return {...state,
      username:'',
      password:'',
      confirmPassword:'',
      errors:{}
      };   
      case "SIGNUP_VALIDATIONSTATE":
       return { ...state,'errors':action.errors===null?{}:action.errors};

      case "SIGNUP_UPDATE_FIELD_EDITOR":
      return { ...state,  [action.key]: action.value,'errors':{}};
      case userConstants.GETALL_SUCCESS:
        return {
          items: action.users
        };
      case userConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };
      case userConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map(user =>
            user.id === action.id
              ? { ...user, deleting: true }
              : user
          )
        };
      case userConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter(user => user.id !== action.id)
        };
      case userConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map(user => {
            if (user.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...userCopy } = user;
              // return copy of user with 'deleteError:[error]' property
              return { ...userCopy, deleteError: action.error };
            }
  
            return user;
          })
        };
      default:
        return state
    }
  }