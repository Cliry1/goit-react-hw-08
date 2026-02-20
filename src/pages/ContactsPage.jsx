import { useDispatch } from 'react-redux';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import { fetchContacts } from '../redux/contacts/operations';
import { useEffect } from 'react';
import DocumentTitle from '../components/DocumentTitle';
import { openModal } from '../redux/modal/slice';
import toast from 'react-hot-toast';

export default function ContactsPage() {
 
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchContacts())
  .unwrap()
  .catch((response) => {
    if(response.status !== 401) {
      toast.error(response?.data?.message || response?.message)
    }
  });
}, [dispatch]);

  return (
    <div>   
        <DocumentTitle>Contacts</DocumentTitle>
        <button type='button' onClick={()=>dispatch(openModal({type:"CREATE_CONTACT"}))}>Create new contact</button>
        <SearchBox />
        <ContactList />

    </div>

  )
}