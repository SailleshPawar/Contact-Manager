import { userConstants } from '../_constants';


export function LogOutUser() {
    debugger;
    localStorage.removeItem('user');
    return (dispatch) => { //dispatch = store.dispatch
            dispatch({
                type: userConstants.LOGOUT
            }); 
            dispatch({
                type: userConstants.LOGOUT
            }); 
       
    }
}
