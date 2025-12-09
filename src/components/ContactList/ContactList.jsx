import css from "./ContactList.module.css"
import Contact from "../Contact/Contact"
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux"
export default function ContactList() {




const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.ul}>
      {
        visibleContacts.map((contact)=>(
          <li key={contact._id} className={css.li}>
              <Contact contact={contact}/>
          </li>
          
        ))
      }
    </ul>
  )
}

