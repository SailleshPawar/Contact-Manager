import { userConstants } from '../_constants';


export function LogOutUser() {
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
