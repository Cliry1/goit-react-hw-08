import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { selectIsModalOpen } from '../../../redux/modal/selectors';
import ContactForm from '../../ContactForm/ContactForm';
import { useSelector } from 'react-redux';
export const CreateContactModal = ({onClose}) =>{
  
  const isOpen = useSelector(selectIsModalOpen)
  const styles = {
    content: {
      padding:"50px 40px",

    }
  }

  return(
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose} customStyles={styles} buttonCloseModal={true}>
        <ContactForm onClose={onClose}/>
    </ModalWrapper>
  )
}