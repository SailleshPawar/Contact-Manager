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
    getUsers,
    signUp
    
};
// export const USER_LOADED = 'USER_LOADED'
export const USERS_LOADED = 'USERS_LOADED'
export const USER_UPDATED='USER_UPDATED'
export const INVALIDCREDENTIAL='INVALIDCREDENTIAL'
export const ACCOUNTLOCKED='ACCOUNTLOCKED'




export function getUsers() {
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

 
 
export function register(user){
 return (dispatch) => { //dispatch = store.dispatch
         axios.post("http://localhost:3000/users",{
            "username": user.username,
            "password": user.password,
            "IsDisable":user.IsDisable,
            "RoleId":user.RoleId
        })
         .then((response) => {
              dispatch({
                type: "USER_CREATED",
                user:response.data
            }); 
             const { from } =  { from: { pathname: "/login" } };   
            history.push(from);
            
          }
        ).catch((err) => {});
         
     }
}


export function login(username, password){
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
                   
                if(user.length>0 && user[0].RoleId===2 && !user[0].IsDisable){
                    const { from } =  { from: { pathname: "/" } };
                    debugger;
                    //as the backend api also sends password to the client removing password
                    //A real back end should never send any secrets to the client which has the risk    
                    delete user[0].password;
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push(from);
                   
                    }
                else if(user.length>0 && user[0].RoleId===1 && !user[0].IsDisable){
                    const { from } =  { from: { pathname: "/UserList" } };   
                    debugger;
                    delete user[0].password;
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



function logout() {
    return (dispatch) => { //dispatch = store.dispatch
        localStorage.removeItem('user');       
        dispatch({
                type: userConstants.LOGOUT
            }); 
    }}


function signUp(){
return (dispatch) => { //dispatch = store.dispatch
       const { from } =  { from: { pathname: "/SignUp" } };   
       history.push(from); 
        dispatch({
                type: "SIGNUP"
            }); 
    }}
    


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