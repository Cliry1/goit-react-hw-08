import { selectIsModalOpen } from "../../../redux/modal/selectors";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactDetailsModal.module.css";
import { useState, useEffect, useId } from "react";
import toast from 'react-hot-toast';
import clsx from "clsx";
import { changeContact } from "../../../redux/contacts/operations";
import defaultAvatar from "../../../assets/Profile_avatar_placeholder_large.png";
import * as Yup from "yup";


const PhotoInput = ({ initialPhoto, setFile, disabled }) => {
  const [preview, setPreview] = useState(defaultAvatar);

  useEffect(() => {
    if (!initialPhoto) return;

    const img = new Image();
    img.src = initialPhoto;
    img.onload = () => {
      setPreview(initialPhoto);
    };
    img.onerror = () => {
      setPreview(defaultAvatar);
    };
  }, [initialPhoto]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

  return (
    <label
      className={clsx(
        css.photo,
        disabled ? css.photoUnactive : css.photoActive,
      )}
      style={{
        backgroundImage: `url(${preview || defaultAvatar})`,
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
        disabled={disabled}
      />
    </label>
  );
};

export const ContactDetailsModal = ({ onClose, contact }) => {
  const idName = useId();
  const idNumber = useId();
  const idSecondPhoneNumber = useId();
  const idInstagram = useId();
  const idTelegram = useId();
  const idFacebook = useId();
  const idTwitter = useId();

  const isOpen = useSelector(selectIsModalOpen);
  const [isEditable, setIsEditable] = useState(true);
  const [localContact, setLocalContact] = useState(contact);
  const dispatch = useDispatch();

  const ValidSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(40, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Only digits allowed")
      .min(5, "Too short")
      .max(12, "Too long")
      .required("Required"),
    secondPhoneNumber: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(/^\d+$/, "Only digits allowed")
      .min(5, "Too short")
      .max(12, "Too long"),
    instagram: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(/^[^@]*$/, "Символ @ заборонений"),
    telegram: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(/^[^@]*$/, "Символ @ заборонений"),
    twitter: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(/^[^@]*$/, "Символ @ заборонений"),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phoneNumber", values.phoneNumber);
    if (values.photo) {
      formData.append("photo", values.photo);
    }
    if (values.instagram !== undefined) {
      formData.append("instagram", values.instagram ?? "");
    }
    if (values.telegram !== undefined) {
      formData.append("telegram", values.telegram ?? "");
    }
    if (values.facebook !== undefined) {
      formData.append("facebook", values.facebook ?? "");
    }
    if (values.twitter !== undefined) {
      formData.append("twitter", values.twitter ?? "");
    }
    if (values.secondPhoneNumber !== undefined) {
      formData.append("secondPhoneNumber", values.secondPhoneNumber ?? "");
    }
    dispatch(changeContact({ id: contact._id, formData }))
    .unwrap()
    .then(()=>toast.success("Contact successfully changed!"))
    .catch((response) => {
      if(response.status !== 401) {
        toast.error("Contact not found!")
      }
    });
    setLocalContact({ ...localContact, ...values });
    setIsEditable(true);
  };

  return (
    <ModalWrapper
      modalIsOpen={isOpen}
      closeModal={onClose}
      buttonCloseModal={true}
    >
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            photo: null,
            name: localContact.name,
            phoneNumber: localContact.phoneNumber,
            secondPhoneNumber: localContact.secondPhoneNumber,
            twitter: localContact.twitter,
            facebook: localContact.facebook,
            instagram: localContact.instagram,
            telegram: localContact.telegram,
          }}
          onSubmit={handleSubmit}
          validationSchema={ValidSchema}
        >
          {({ setFieldValue, values, resetForm, isValid }) => {
            const isEqual =
              values.name === localContact.name &&
              values.phoneNumber === localContact.phoneNumber &&
              !values.photo &&
              values.secondPhoneNumber === localContact.secondPhoneNumber &&
              values.facebook === localContact.facebook &&
              values.twitter === localContact.twitter &&
              values.instagram === localContact.instagram &&
              values.telegram === localContact.telegram;

            return (
              <Form className={css.form}>
                <PhotoInput
                  initialPhoto={contact.photo}
                  setFile={(file) => setFieldValue("photo", file)}
                  disabled={isEditable}
                />
                <div className={css.requiredTextContainer}>
                  <div className={css.formContainer}>
                    <label htmlFor={idName}>Name:</label>
                    <Field
                      name="name"
                      disabled={isEditable}
                      autoComplete="off"
                      className={
                        isEditable ? css.inputUnactive : css.inputActive
                      }
                      id={idName}
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className={css.error}
                    />
                  </div>

                  <div className={css.formContainer}>
                    <label htmlFor={idNumber}>Number:</label>
                    <Field
                      name="phoneNumber"
                      disabled={isEditable}
                      autoComplete="off"
                      className={
                        isEditable ? css.inputUnactive : css.inputActive
                      }
                      id={idNumber}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="span"
                      className={css.error}
                    />
                  </div>
                </div>
                <div className={css.formContainer}>
                  <label htmlFor={idSecondPhoneNumber}>Second Number:</label>
                  <Field
                    className={isEditable ? css.inputUnactive : css.inputActive}
                    type="text"
                    disabled={isEditable}
                    name="secondPhoneNumber"
                    id={idSecondPhoneNumber}
                  />
                  <ErrorMessage
                    name="secondPhoneNumber"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.formContainer}>
                  <label htmlFor={idInstagram}>Instagram username:</label>
                  <Field
                    className={isEditable ? css.inputUnactive : css.inputActive}
                    type="text"
                    disabled={isEditable}
                    name="instagram"
                    id={idInstagram}
                  />
                  <ErrorMessage
                    name="instagram"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.formContainer}>
                  <label htmlFor={idFacebook}>Facebook link:</label>
                  <Field
                    className={isEditable ? css.inputUnactive : css.inputActive}
                    type="text"
                    disabled={isEditable}
                    name="facebook"
                    id={idFacebook}
                  />
                  <ErrorMessage
                    name="facebook"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.formContainer}>
                  <label htmlFor={idTelegram}>Telegram username:</label>
                  <Field
                    className={isEditable ? css.inputUnactive : css.inputActive}
                    type="text"
                    disabled={isEditable}
                    name="telegram"
                    id={idTelegram}
                  />
                  <ErrorMessage
                    name="telegram"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.formContainer}>
                  <label htmlFor={idTwitter}>Twitter username:</label>
                  <Field
                    className={isEditable ? css.inputUnactive : css.inputActive}
                    type="text"
                    disabled={isEditable}
                    name="twitter"
                    id={idTwitter}
                  />
                  <ErrorMessage
                    name="twitter"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.buttonsContainer}>
                  <button
                    type="button"
                    className={clsx(
                      isEditable ? css.buttonActive : css.buttonUnactive,
                    )}
                    onClick={() => setIsEditable(false)}
                  >
                    Change information
                  </button>

                  <button
                    type="submit"
                    disabled={isEqual || isEditable || !isValid}
                    className={clsx(
                      isEditable ? css.buttonUnactive : css.buttonActive,
                    )}
                  >
                    Save change
                  </button>

                  <button
                    type="button"
                    className={clsx(
                      isEditable ? css.buttonUnactive : css.buttonActive,
                    )}
                    onClick={() => {
                      setIsEditable(true);
                      resetForm();
                    }}
                  >
                    Cancel change
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalWrapper>
  );
};
