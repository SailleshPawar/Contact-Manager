import { authenticationConstants} from '../_constants';

export  const authActions = {
    dispatchError,
    
};
export function dispatchError(errors){
    return (dispatch) => { //dispatch = store.dispatch
        dispatch({
            type: authenticationConstants.INVALIDFORM,
            errors: errors===null?{}:errors
        }); 
    }
}