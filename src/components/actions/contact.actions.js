import axios from 'axios';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const CONTACTS_LOADED = 'CONTACTS_LOADED';
const apiUrl = 'http://localhost:3000/contacts';


export function getContact(userId) {
    return (dispatch) => { //dispatch = store.dispatch
        axios.get(`${apiUrl}?userid=${userId}`)
        .then((result) => {
            dispatch({
                type: "CONTACTS_LOADED",
                contacts: result.data
            }); 
        })
        .catch((err) => {});
    }
}


export function dispatchError(errors){
    return (dispatch) => { //dispatch = store.dispatch
        dispatch({
            type: "CONTACT_VALIDATION",
            errors: errors===null?{}:errors
        }); 
    }
}

export function deleteContact(contact ){
    return (dispatch) => { //dispatch = store.dispatch
        axios.delete(`${apiUrl}/${contact.id}`)
        .then((result) => {
            dispatch({
                type: REMOVE_CONTACT,
                contact: contact
            }); 
        })
        .catch((err) => {});
    }
}

export function addContact(name,phone,email,image,userid) {
    return (dispatch) => {
        const data = {
        name: name,
        phone: phone,
        email:email,
        image:image,
        userid:userid
        }

        axios.post(apiUrl, data)
            .then(result => {
                dispatch({
                    type: ADD_CONTACT,
                    contact: result.data
                });
            });
    }
}