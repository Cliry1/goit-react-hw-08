import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/auth/operations"
import { Field, Formik,Form } from "formik"
import toast, { Toaster } from 'react-hot-toast';
import {OAuthButton} from '../OAuthButton/OAuthButton'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
export const LoginForm = ()=>{
  const dispatch = useDispatch();
  const handleSubmit = (values,action)=>{
    dispatch(
      login(values)
    )
    .unwrap()
    .catch(() => toast.error('Bad request'));
    action.resetForm();
  }
  return (
    <>
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor="email">Email</label>
          <Field  type="email" name="email" id="email"/>
        </div>
        <div className={css.container}>
          <label htmlFor="password">Password</label>
          <Field  type="password" name="password" id="password"/>
        </div>
        <button className={css.button} type="submit">Log In</button>

        <hr className={css.line}/>
        <OAuthButton type={"google"} svg={FcGoogle}>Login with Google</OAuthButton>
        <OAuthButton type={"facebook"} svg={FaFacebookF}>Login with Facebook</OAuthButton>
      </Form>
    </Formik>
    <Toaster />
    </>
  );
}