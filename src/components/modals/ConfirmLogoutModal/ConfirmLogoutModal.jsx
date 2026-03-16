import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { selectIsModalOpen } from "../../../redux/modal/selectors";
import { logout } from "../../../redux/auth/operations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import css from "./ConfirmLogoutModal.module.css";
import imgLogout from "../../../assets/logout.png";


export const ConfirmLogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Successful logout!");
        navigate("/login");
      })
      .catch((response) => {
        if (response?.message !== "Session not found")
          toast.error(response.errors || response.message);
      });
    onClose();
  };
  return (
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose} customStyles = {{content: {
      padding:"0",
    }}}>
      <div className={css.container}>
        <img
          className={css.img}
          src={imgLogout}
          alt="Logout icon"
        />
        <h1 className={css.title}>
          Are you sure <br /> you want to log out?
        </h1>
        <button className={`${css.button} ${css.logoutButton}`} onClick={handleLogout}>Yes</button>
        <button className={`${css.button} ${css.cancelButton}`} onClick={onClose}>No</button>
      </div>
    </ModalWrapper>
  );
};
