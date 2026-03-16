import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { selectIsModalOpen } from "../../../redux/modal/selectors";
import ContactForm from "../../ContactForm/ContactForm";
import { useSelector } from "react-redux";

export const CreateContactModal = ({ onClose }) => {
  const isOpen = useSelector(selectIsModalOpen);

  return (
    <ModalWrapper
      modalIsOpen={isOpen}
      closeModal={onClose}
      buttonCloseModal={true}
      customStyles={{
        content: {
          padding: "0px",
        },
      }}
    >
      <ContactForm onClose={onClose} />
    </ModalWrapper>
  );
};
