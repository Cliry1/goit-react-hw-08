import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/auth/operations"
import { Field, Formik,Form, ErrorMessage } from "formik"
import toast from 'react-hot-toast';
import {OAuthButton} from '../OAuthButton/OAuthButton'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { openModal } from "../../redux/modal/slice";
import * as Yup from 'yup';

const LogSchema = Yup.object().shape({
  email: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});
export const LoginForm = ()=>{
  const dispatch = useDispatch();
  const handleSubmit = (values,action)=>{
    dispatch(
      login(values)
    )
    .unwrap()
    .then((response)=>{
        toast.success(response.message)
      })
    .catch((response)=>{
        toast.error(response.errors || response.message)
      });
    action.resetForm();
  }
  return (
    <>
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit} validationSchema={LogSchema}>
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor="email">Email</label>
          <Field  type="email" name="email" id="email"/>
          <ErrorMessage name="email" component="span" className={css.error}/>
        </div>
        <div className={css.container}>
          <label htmlFor="password">Password</label>
          <Field  type="password" name="password" id="password"/>
          <ErrorMessage name="password" component="span" className={css.error}/>
        </div>
        <button className={css.button} type="submit">Log In</button>
        <button className={css.forgotPasswordButton} type="button" onClick={()=> dispatch(openModal({type:"SEND_EMAIL_RESET_PASSWORD"}))}>Forgot password</button>

        <hr className={css.line}/>
        <OAuthButton type={"google"} svg={FcGoogle}>Login with Google</OAuthButton>
        <OAuthButton type={"github"} svg={FaGithub}>Login with Github</OAuthButton>
      </Form>
    </Formik>
    </>
  );
}