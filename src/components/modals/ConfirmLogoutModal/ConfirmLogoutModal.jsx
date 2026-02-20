import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import { logout } from "../../../redux/auth/operations";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const ConfirmLogoutModal = ({onClose}) =>{
  const navigate = useNavigate()
  const isOpen = useSelector(selectIsModalOpen)
  const dispatch = useDispatch()

    const handleLogout = () => {dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success('Successful logout!');
        navigate("/")
      })
      .catch((response)=>{
        if(response?.message !== "Session not found")
          toast.error(response.errors || response.message)
      });
     onClose()
  };
  return(
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose}>
      <button onClick={handleLogout}>Yes</button>
      <button onClick={onClose}>No</button>
    </ModalWrapper>
  )
}