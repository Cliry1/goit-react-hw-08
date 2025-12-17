import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import { logout } from "../../../redux/auth/operations";
export const ConfirmLogoutModal = ({onClose}) =>{
  const isOpen = useSelector(selectIsModalOpen)
  const dispatch = useDispatch()

    const handleLogout = () => {dispatch(logout());
     onClose()
  };
  return(
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose}>
      <button onClick={handleLogout}>Yes</button>
      <button onClick={()=>dispatch(onClose)}>No</button>
    </ModalWrapper>
  )
}