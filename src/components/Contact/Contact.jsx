import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import { openModal } from "../../redux/modal/slice";
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaTwitter} from "react-icons/fa";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={css.mainInfo}>
        <div className={css.containerBig}>
          <div className={css.containerSmall}>
            <FontAwesomeIcon className={css.icon} icon={faUser} />
            <p className={css.p}>{contact.name}</p>
          </div>
          <div className={css.containerSmall}>
            <FontAwesomeIcon className={css.icon} icon={faPhone} />
            <p className={css.p}>{contact.phoneNumber}</p>
          </div>
        </div>
        <div className={css.containerButtons}>
          <button
            className={css.button}
            onClick={() =>
              dispatch(
                openModal({ type: "CONTACT_DETAILS", props: { contact } })
              )
            }
          >
            Details
          </button>
          <button
            className={css.button}
            onClick={() =>
              dispatch(
                openModal({
                  type: "CONFIRM_DELETE",
                  props: { id: contact._id },
                })
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
      {(contact.instagram || contact.facebook || contact.telegram || contact.twitter) && (
      <div className={css.socialMediaContainer}>
        {contact.instagram && <a className={css.linkSocialMedia} href={`https://instagram.com/${contact.instagram}`} rel="noreferrer" target="_blank"><FaInstagram/></a>}
        {contact.facebook && <a className={css.linkSocialMedia} href={contact.facebook} rel="noreferrer" target="_blank"><FaFacebookF/></a>}
        {contact.telegram && <a className={css.linkSocialMedia} href={`https://t.me/${contact.telegram}`} rel="noreferrer" target="_blank"><FaTelegramPlane/></a>}
        {contact.twitter && <a className={css.linkSocialMedia} href={`https://x.com/${contact.twitter}`} rel="noreferrer" target="_blank"><FaTwitter/></a>}
      </div>
      )}
    </>
  );
}
