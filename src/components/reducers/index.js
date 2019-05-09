import { combineReducers } from 'redux';
// import { users } from './loginReducers';
import {Contact} from './addContact.reducer';
import { authentication } from './authentication.reducer';
import { UsersList } from './userList.reducer';
export default combineReducers({
    // users,
    authentication,
    Contact,
    UsersList


    

});