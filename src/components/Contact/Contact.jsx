import css from "./Contact.module.css";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { deleteContacts } from "../../redux/contacts/operations";


export default function Contact({contact}) {
  const dispatch = useDispatch();

  const handleDelete = () => {dispatch(deleteContacts(contact.id));
  };
  return (
    <>
      <div className={css.containerBig}>
        <div className={css.containerSmall}>
          <FontAwesomeIcon icon={faUser} />
          <p className={css.p}>{contact.name}</p>
        </div>
        <div className={css.containerSmall}>
          <FontAwesomeIcon icon={faPhone} />
          <p className={css.p}>{contact.number}</p>
        </div>

      </div>
      <button className={css.button} onClick={handleDelete}>Delete</button>
    </>
  );
}
