/* eslint-disable no-duplicate-case */
import User from '../models/user'
export function UsersList(state =  [new User('','','','','')], action) { 
  switch (action.type) {
    

    case "USER_UPDATED":
    var foundIndex = state[0].findIndex(x => x.id === action.user.id);
    state[0][foundIndex] = action.user;

    return {

    ...state,
    }

      case "USERS_LOADED":
          return    [action.users]  
    case "CONTACTS_LOADED":
      return   action.contacts;
      
      case "USER_UPDATED":
      // eslint-disable-next-line no-redeclare
      var foundIndex = state[0].findIndex(x => x.id === action.user.id);
      state[0][foundIndex] = action.user;
      return [...state];
      
      default:
        return state
    }
  }