import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/auth/operations"
import { Field, Formik,Form } from "formik"
import toast, { Toaster } from 'react-hot-toast';

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
      </Form>
    </Formik>
    <Toaster />
    </>
  );
}