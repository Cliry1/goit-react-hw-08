import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import { selectError, selectIsLoading } from '../redux/contactsSlice';
import { fetchContacts } from '../redux/contactsOps';
import { useEffect } from 'react';

export default function App() {
 
const dispatch = useDispatch();
const isLoading = useSelector(selectIsLoading);
const error = useSelector(selectError);

useEffect(() => {
  dispatch(fetchContacts());
}, [dispatch]);
  return (
    <>    
        <h1>Phonebook</h1>
        <ContactForm />
        {isLoading && !error && <b>Request in progress...</b>}
        <SearchBox />
        <ContactList />

    </>

  )
}