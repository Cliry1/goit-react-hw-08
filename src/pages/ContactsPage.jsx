import { useDispatch, useSelector } from 'react-redux';

import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import { selectError, selectIsLoading } from '../redux/contacts/selectors';
import { fetchContacts } from '../redux/contacts/operations';
import { useEffect } from 'react';
import DocumentTitle from '../components/DocumentTitle';
import { openModal } from '../redux/modal/slice';


export default function ContactsPage() {
 
const dispatch = useDispatch();
const isLoading = useSelector(selectIsLoading);
const error = useSelector(selectError);
useEffect(() => {
  dispatch(fetchContacts());
}, [dispatch]);

  return (
    <div>   
        <DocumentTitle>Contacts</DocumentTitle>
        <h1>Phonebook</h1>
        <button type='button' onClick={()=>dispatch(openModal({type:"CREATE_CONTACT"}))}>Create new contact</button>

        {isLoading && !error && <b>Request in progress...</b>}
        <SearchBox />
        <ContactList />

    </div>

  )
}