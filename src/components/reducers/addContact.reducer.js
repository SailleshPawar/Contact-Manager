
import { contactConstants } from '../_constants';
import ContactReducer from '../models/contact'
import { ADD_CONTACT, CONTACTS_LOADED,REMOVE_CONTACT } from '../actions/contact.actions';


export function Contact(state = new ContactReducer('', '','','',[],0,[]), action) { 
  switch (action.type) {
      case contactConstants.REGISTER_REQUEST:
      return [
        ...state,
        action.task
      ];

      case REMOVE_CONTACT:
      const records=state.records.filter(m => m.id !== action.contact.id)
      return { ...state, ['records']: records };
     

      case ADD_CONTACT:
      state.name='';
      state.email='';
      state.image='';
      state.id='';
      state.phone='';
      return { ...state, ['records']: [...state.records, action.contact] };
      case CONTACTS_LOADED:
  
      return { ...state, ['records']: action.contacts };
     
      case contactConstants.REGISTER_SUCCESS:
      return [
        ...state,
        action.task
      ];
      case contactConstants.REGISTER_FAILURE:
      return [
        ...state,
        action.task
      ];
      case contactConstants.UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
      default:
        return state
    }
  }