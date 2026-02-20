import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import { deleteContacts } from "../../../redux/contacts/operations";
import toast from 'react-hot-toast';


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
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </ModalWrapper>
  )
}