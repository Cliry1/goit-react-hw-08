import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import { selectError, selectIsLoading } from '../redux/contacts/selectors';
import { fetchContacts } from '../redux/contacts/operations';
import { useEffect } from 'react';
import DocumentTitle from '../components/DocumentTitle';


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
        <ContactForm />
        {isLoading && !error && <b>Request in progress...</b>}
        <SearchBox />
        <ContactList />

    </div>

  )
}