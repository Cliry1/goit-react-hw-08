import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Formik, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useState } from "react";

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const RegSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(64, "Too Long!")
    .required("Required")
    .matches(
      passwordRules,
      "Password must contain at least one letter and one number",
    ),
});

export const RegistrationForm = () => {
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((response) => {
        toast.error(response.errors || response.message);
      });
    actions.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={RegSchema}
      >
        <Form className={`${css.form} animation`}>
          <div className={css.container}>
            <label htmlFor="name">Username</label>
            <Field placeholder="alex" type="text" name="name" id="name" />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <div className={css.container}>
            <label htmlFor="email">Email</label>
            <Field
              placeholder="alex_mig@ukr.net"
              type="email"
              name="email"
              id="email"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>
          <div className={css.container}>
            <label htmlFor="password">Password</label>
            <Field
              placeholder="your password"
              type={showButton ? 'text' : 'password'}
              name="password"
              id="password"
            />
            <button
              className={css.buttonHidden}
              type="button"
              onClick={() => setShowButton((prev) => !prev)}
            >
              {showButton ? "🙈" : "👁️"}
            </button>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>
          <button className={css.button} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </>
  );
};
