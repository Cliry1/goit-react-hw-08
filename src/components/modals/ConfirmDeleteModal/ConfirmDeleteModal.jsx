import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import { deleteContacts } from "../../../redux/contacts/operations";
export const ConfirmDeleteModal = ({onClose, ...modalProps}) =>{
  const isOpen = useSelector(selectIsModalOpen)
  const dispatch = useDispatch()

    const handleDelete = () => {dispatch(deleteContacts(modalProps.id));
     onClose()
  };
  return(
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose}>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={()=>dispatch(onClose)}>No</button>
    </ModalWrapper>
  )
}