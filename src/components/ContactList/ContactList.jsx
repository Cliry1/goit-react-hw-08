import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";

export default function ContactList() {
  const filter = useSelector(selectNameFilter);

  const visibleContacts = useSelector(selectFilteredContacts);

  return visibleContacts?.length > 0? (
    <ul className={css.ul}>
      {visibleContacts.map((contact) => (
        <li key={contact._id} className={css.li}>
          <Contact contact={contact}/>
        </li>
      ))}
    </ul>
  ) : filter === "" ? (
    <p className={css.emptyList}>There are no contacts yet.</p>
  ) : (
    <p className={css.emptyList}>No contacts match the filter. Try something else.</p>
  );
}
