import { combineReducers } from 'redux';
 import { user} from './loginReducers';
import {Contact} from './addContact.reducer';
import { authentication } from './authentication.reducer';
import { UsersList } from './userList.reducer';
export default combineReducers({
     user,
    authentication,
    Contact,
    UsersList


    

});