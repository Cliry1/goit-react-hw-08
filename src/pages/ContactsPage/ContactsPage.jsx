import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import { openModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";
import css from "./ContactsPage.module.css";
import { selectStatusFetch } from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const status = useSelector(selectStatusFetch);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(status==="idle"){
      dispatch(fetchContacts())
      .unwrap()
      .catch((response) => {
        if (response.status !== 401) {
          toast.error(response?.data?.message || response?.message);
        }
      });

    }
  }, [dispatch, status]);

  return (
    <div className={`${css.container} animation`}>
      <DocumentTitle>Contacts</DocumentTitle>
      <div className={css.topBar}>
        <SearchBox />
        <button
          className={css.button}
          type="button"
          onClick={() => dispatch(openModal({ type: "CREATE_CONTACT" }))}
        >
          Create new contact
        </button>
      </div>
      <ContactList />
    </div>
  );
}
