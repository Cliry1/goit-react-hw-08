import Modal from "react-modal";
import css from "./ModalWrapper.module.css";
import clsx from "clsx";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

Modal.setAppElement(document.getElementById("root"));

const ModalWrapper = ({
  modalIsOpen,
  closeModal,
  customStyles = {    
    content: {
      padding:"50px 40px",
    }},
  buttonCloseModal = false,
  children,
}) => {
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add(css["no-scroll"]);
      document.documentElement.classList.add("no-scroll");
    } else {
      document.body.classList.remove(css["no-scroll"]);
      document.documentElement.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove(css["no-scroll"]);
      document.documentElement.classList.remove("no-scroll");
    };
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={customStyles}
      className={`${css.modal} animation`}
      overlayClassName={css.backdrop}
    >
      {children}
      <button
        className={clsx(
          css["no-close-button"],
          buttonCloseModal && css["close-button"]
        )}
        onClick={closeModal}
      >
        <FiX className={css.closeIcon}/>
      </button>
    </Modal>
  );
};

export default ModalWrapper;