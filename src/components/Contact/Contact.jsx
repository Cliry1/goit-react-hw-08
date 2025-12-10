import css from "./Contact.module.css";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { openModal } from "../../redux/modal/slice";


export default function Contact({contact}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={css.containerBig}>
        <div className={css.containerSmall}>
          <FontAwesomeIcon icon={faUser} />
          <p className={css.p}>{contact.name}</p>
        </div>
        <div className={css.containerSmall}>
          <FontAwesomeIcon icon={faPhone} />
          <p className={css.p}>{contact.phoneNumber}</p>
        </div>

      </div>
      <button className={css.button} onClick={()=>dispatch(openModal({type:"CONFIRM_DELETE",  props: { id: contact._id }}))}>Delete</button>
    </>
  );
}
