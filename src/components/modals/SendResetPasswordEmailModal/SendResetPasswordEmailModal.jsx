import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { selectIsModalOpen } from "../../../redux/modal/selectors";
import { useState } from "react";
import {
  sendResetPasswordEmail,
  sendSetPasswordEmail,
} from "../../../redux/auth/operations";
import toast from "react-hot-toast";
import * as yup from "yup";

const schemaEmail = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const SendResetPasswordEmailModal = ({
  onClose,
  setPasswordReason = false,
}) => {
  const isOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schemaEmail.validate({ email }, { abortEarly: false });
      if (setPasswordReason) {
        dispatch(sendSetPasswordEmail(email))
          .unwrap()
          .then((response) => {
            toast.success(response.message);
          })
          .catch(() => {});
      } else {
        dispatch(sendResetPasswordEmail(email))
          .unwrap()
          .then((response) => {
            toast.success(response.message);
          })
          .catch(() => {});
      }

      onClose();
    } catch (err) {
      setError(err.errors[0]);
    }
  };

  return (
    <ModalWrapper modalIsOpen={isOpen} closeModal={onClose}>
      <form onSubmit={handleSubmit}>
        {setPasswordReason ? (
          <p>
            You are logged in via Google or GitHub.
            <br />
            To be able to log in the standard way, you need to add a password.
          </p>
        ) : (
          <p>Enter your password.</p>
        )}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {error && <p>{error}</p>}
        <button type="submit">
          {setPasswordReason ? "Start set" : "Start reset"}
        </button>
      </form>
    </ModalWrapper>
  );
};
