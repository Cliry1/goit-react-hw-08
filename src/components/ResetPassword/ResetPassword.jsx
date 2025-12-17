import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';



const passwordRules = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const passwordSchema = Yup.object({
  password: Yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(
      passwordRules,
      'Password must contain at least one letter and one number'
    ),

  retryPassword: Yup
    .string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showButtonOne, setShowButtonOne] = useState(false);
  const [showButtonTwo, setShowButtonTwo] = useState(false);


  const handleSubmit = (values, action) => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      dispatch(resetPassword({ password: values.password, token }))
      .unwrap()
      .then(()=> toast.success("Your password has been reset"))
      .catch(() => toast.error("Bad request"));
      action.resetForm();
      navigate("/login");
  };


  return (
    <Formik
      initialValues={{ password: "", retryPassword: "" }}
      onSubmit={handleSubmit}
      validationSchema={passwordSchema}
    >
      <Form>
        <div>
          <label htmlFor="password">New Password</label>
          <Field  type={showButtonOne ? 'text' : 'password'} name="password" id="password" autoComplete="new-password"/>
          <button
            type="button"
            onClick={() => setShowButtonOne((prev) => !prev)}
          >
            {showButtonOne ? "🙈" : "👁️"}
          </button>
          <ErrorMessage name="password" component="span" />
        </div>
        <div>
          <label htmlFor="retryPassword">Retry Password</label>
          <Field  type={showButtonTwo ? 'text' : 'password'} name="retryPassword" id="retryPassword" autoComplete="new-password"/>
          <button
            type="button"
            onClick={() => setShowButtonTwo((prev) => !prev)}
          >
            {showButtonTwo ? "🙈" : "👁️"}
          </button>
          <ErrorMessage name="retryPassword" component="span" />
        </div>
        <button type="submit">Reset password</button>
      </Form>
    </Formik>
  );
};
