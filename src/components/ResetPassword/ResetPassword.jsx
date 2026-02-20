import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword, setPassword } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export const ResetPassword = ({setPasswordReason=false}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [showButtonOne, setShowButtonOne] = useState(false);
  const [showButtonTwo, setShowButtonTwo] = useState(false);


  const handleSubmit = async (values, action) => {

      const token = new URLSearchParams(search).get("token");
      try {
          if (setPasswordReason) {
            const response = await dispatch(setPassword({ password: values.password, token })).unwrap();
            toast.success(response.message);
          } else {
            const response = await dispatch(resetPassword({ password: values.password, token })).unwrap();
            toast.success(response.message);
          }

          action.resetForm();
          navigate("/login");
        } catch (error) {
          toast.error(error.errors || error.message);
        }
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
        <button type="submit">{setPasswordReason ? "Set password" : "Reset password"}</button>
      </Form>
    </Formik>
  );
};
