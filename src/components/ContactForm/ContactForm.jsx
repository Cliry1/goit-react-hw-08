import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { useState, useEffect } from "react";
import defaultPhoto from "../../assets/Profile_avatar_placeholder_large.png";
import toast from "react-hot-toast";

const PhotoInput = ({ initialPhoto, setFieldValue }) => {
  const [preview, setPreview] = useState(initialPhoto);

  useEffect(() => {
    setPreview(initialPhoto);
  }, [initialPhoto]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setFieldValue("photo", file);
  };

  return (
    <label
      className={css.photo}
      style={{
        backgroundImage: preview ? `url(${preview})` : "none",
      }}
    >
      <div className={css.photoOverlay}>Upload photo</div>
      <input type="file" accept="image/*" onChange={handleChange} hidden />
    </label>
  );
};

export default function ContactForm({ onClose }) {
  const idName = useId();
  const idNumber = useId();
  const idSecondPhoneNumber = useId();
  const idInstagram = useId();
  const idTelegram = useId();
  const idFacebook = useId();

  const usernameRules = /^[A-Za-z0-9_]+$/;
  const linkRules = /^[A-Za-z0-9-._~:/?=&#+]+$/;

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
      .matches(usernameRules, "Latin letters and numbers only"),
    telegram: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(usernameRules, "Latin letters and numbers only"),
    facebook: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .matches(linkRules, "Not a valid link"),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phoneNumber", values.phoneNumber);
    if (values.photo) {
      formData.append("photo", values.photo);
    }
    if (values.instagram) {
      formData.append("instagram", values.instagram);
    }
    if (values.telegram) {
      formData.append("telegram", values.telegram);
    }
    if (values.facebook) {
      formData.append("facebook", values.facebook);
    }
    if (values.secondPhoneNumber) {
      formData.append("secondPhoneNumber", values.secondPhoneNumber);
    }
    dispatch(addContact(formData))
      .unwrap()
      .then(() => toast.success("Contact successfully created!"))
      .catch((response) => {
        if (response.status !== 401) {
          toast.error("Contact not found!");
        }
      });
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phoneNumber: "",
        photo: null,
        secondPhoneNumber: "",
        instagram: "",
        telegram: "",
        facebook: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={ValidSchema}
    >
      {({ isValid, setFieldValue, dirty }) => {
        return (
          <Form className={css.form}>
              <PhotoInput
                initialPhoto={defaultPhoto}
                setFieldValue={setFieldValue}
              />

            <div className={css.requiredTextContainer}>
              <div className={css.formContainer}>
                <label className={css.label} htmlFor={idName}>
                  Name <span className={css.requiredText}>*</span>
                </label>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={idName}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.formContainer}>
                <label className={css.label} htmlFor={idNumber}>
                  Number <span className={css.requiredText}>*</span>
                </label>
                <Field
                  className={css.input}
                  type="text"
                  name="phoneNumber"
                  id={idNumber}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>
            <div className={css.formContainer}>
              <label className={css.label} htmlFor={idSecondPhoneNumber}>
                Second Number
              </label>
              <Field
                className={css.input}
                type="text"
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
              <label className={css.label} htmlFor={idInstagram}>
                Instagram username
              </label>
              <Field
                className={css.input}
                type="text"
                name="instagram"
                id={idInstagram}
                placeholder="e.g. alexcloath"
              />
              <ErrorMessage
                name="instagram"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.formContainer}>
              <label className={css.label} htmlFor={idFacebook}>
                Facebook link
              </label>
              <Field
                className={css.input}
                type="text"
                name="facebook"
                id={idFacebook}
                placeholder="e.g. https://www.facebook.com/alexcloath"
              />
              <ErrorMessage
                name="facebook"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.formContainer}>
              <label className={css.label} htmlFor={idTelegram}>
                Telegram username
              </label>
              <Field
                className={css.input}
                type="text"
                name="telegram"
                id={idTelegram}
                placeholder="e.g. alexcloath"
              />
              <ErrorMessage
                name="telegram"
                component="span"
                className={css.error}
              />
            </div>
            <button
              className={css.button}
              type="submit"
              disabled={!isValid || !dirty}
            >
              Add contact
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
