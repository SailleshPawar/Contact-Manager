import { userConstants } from '../_constants';
import { userService } from '../service';
// import { alertActions } from './';
import { history } from '../_helpers';
import axios from 'axios';
const userApiUrl="http://localhost:3000/users";
export  const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    getUsers
    
};
// export const USER_LOADED = 'USER_LOADED'
export const USERS_LOADED = 'USERS_LOADED'
export const USER_UPDATED='USER_UPDATED'
export const INVALIDCREDENTIAL='INVALIDCREDENTIAL'
export const ACCOUNTLOCKED='ACCOUNTLOCKED'




export function getUsers() {
    debugger;
     return (dispatch) => { //dispatch = store.dispatch
         axios.get(userApiUrl)
         .then((result) => {
             dispatch({
                 type: "USERS_LOADED",
                 users: result.data
             }); 
         })
         .catch((err) => {});
     }
 }
 
 export function toggleActiveUser(user) {
     debugger;
     return (dispatch) => { //dispatch = store.dispatch
         axios.put(`${userApiUrl}/${user.id}`,{
            "username":user.username,
            "password": user.password,
            "RoleId":user.RoleId,
            "IsDisable":!user.IsDisable
        })
         .then((result) => {
             dispatch({
                 type: "USER_UPDATED",
                 user: result.data
             }); 
         })
         .catch((err) => {});
     }
 }

 
 




export function login(username, password){
    debugger;
    let user=[];
    return (dispatch) => { //dispatch = store.dispatch
        axios.get(userApiUrl)
        .then((result) => {              
            user =result.data.filter(item=>item.username===username && 
                item.password===password);     
                
                if((user.length>0 && user[0].RoleId===1 && !user[0].IsDisable)||(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable) ){
                    dispatch({
                        type: userConstants.LOGIN_REQUEST ,
                        user:user[0]
                    }); 
                   
            }
            else{

            if(user.length>0){
            dispatch({
                type: ACCOUNTLOCKED ,
                users:user
            }); 
        }
        else{
            dispatch({
                type: INVALIDCREDENTIAL ,
                users:user
            }); 
        }
            }
                   
                debugger;
                if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
                    const { from } =  { from: { pathname: "/" } };   
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push(from);
                   
                    }
                else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
                    const { from } =  { from: { pathname: "/UserList" } };   
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push(from);
                   
                }else
                {

                 //do nothing

                }


        })
        .catch((err) => {});
    }
}



// export function login(username, password){
//    let user=[];
//    debugger
//      return (dispatch) => { //dispatch = store.dispatch
//         axios.get(userApiUrl)
//         .then((result) => {
//         debugger;

       

//        user =result.data.filter(item=>item.username===username && 
//         item.password===password);     
        
        
//         dispatch({
//             type: USER_LOADED,
//             users:result.data
//         }); 
           
//         debugger;
//         if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
//             const { from } =  { from: { pathname: "/" } };   
            
//             history.push(from);
//             //this.props.history.push(from);
//            this.setState({authenticated: true})
//             }
//         else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
//             const { from } =  { from: { pathname: "/UserList" } };   
           
//             history.push(from);
//             // this.props.history.push(from);
//         }
            
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }

//         //     console.log(response);
//         //     user = response.data.filter(item=>item.username===this.state.data.username && 
//         //         item.password===this.state.data.password);         
//         // if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
//         //     const { from } =  { from: { pathname: "/" } };   
//         //     localStorage.setItem('user', JSON.stringify(user));
//         //     window.location=from.pathname;
//         //     //this.props.history.push(from);
//         //    this.setState({authenticated: true})
//         //     }
//         // else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
//         //     const { from } =  { from: { pathname: "/UserList" } };   
//         //     localStorage.setItem('user', JSON.stringify(user));
//         //     window.location=from.pathname;
//         //     // this.props.history.push(from);
//         //    this.setState({authenticated: true})
        
      
// }
 
// function login(username, password) {
//     return dispatch => {
//         dispatch(request({ username }));

//         userService.login(username, password)
//             .then(
//                 user => { 
//                     dispatch(success(user));
//                     history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     //dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }

function logout() {
    return (dispatch) => { //dispatch = store.dispatch
        localStorage.removeItem('user');       
        dispatch({
                type: userConstants.LOGOUT
            }); 
    }}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                   // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                  //  dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}