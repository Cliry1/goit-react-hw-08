import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import { deleteContacts } from "../../../redux/contacts/operations";
import toast from 'react-hot-toast';
import css from "./ConfirmDeleteModal.module.css";
import imgDelete from "../../../assets/delete.png"


export const ConfirmDeleteModal = ({onClose, ...modalProps}) =>{
  const isOpen = useSelector(selectIsModalOpen)
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteContacts(modalProps.id))
    .unwrap()
    .then(()=>toast.success("Contact successfully deleted!"))
    .catch((response) => {
      if(response.status !== 401) {
        toast.error("Contact not found!")
      }
    });
    onClose()
  };
  
  return(
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose}>
            <div className={css.container}>
              <img
                className={css.img}
                src={imgDelete}
                alt="Delete icon"
              />
              <h1 className={css.title}>
                Are you sure you want <br /> to delete this contact?
              </h1>
              <button className={`${css.button} ${css.deleteButton}`} onClick={handleDelete}>Yes</button>
              <button className={`${css.button} ${css.cancelButton}`} onClick={onClose}>No</button>
            </div>
    </ModalWrapper>
  )
}