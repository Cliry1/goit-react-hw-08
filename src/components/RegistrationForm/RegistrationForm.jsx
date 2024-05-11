import css from "./RegistrationForm.module.css"
import { useDispatch } from "react-redux"
import { register } from "../../redux/auth/operations"
import { Field, Formik, Form, ErrorMessage } from "formik"
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';

const RegSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Too Long!').required('Required'),
  email: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

export const RegistrationForm = ()=>{
  const dispatch = useDispatch();
  const handleSubmit = (values,actions)=>{
    dispatch(
      register(values)
    )
    .unwrap()
    .catch(() => toast.error('This email is already taken'));
    actions.resetForm();
  }
  return (
    <>
    <Formik initialValues={{ name: "", email: "", password: "" }} onSubmit={handleSubmit} validationSchema={RegSchema} >
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor="name">Username</label>
          <Field placeholder="alex" type="text" name="name" id="name"/>
          <ErrorMessage name="name" component="span" className={css.error}/>
        </div>
        <div className={css.container}>
          <label htmlFor="email">Email</label>
          <Field placeholder="alex_mig@ukr.net" type="email" name="email" id="email"/>
          <ErrorMessage name="email" component="span" className={css.error}/>
        </div>
        <div className={css.container}>
          <label htmlFor="password">Password</label>
          <Field placeholder="your password" type="password" name="password" id="password"/>
          <ErrorMessage name="password" component="span" className={css.error}/>
        </div>
        <button  className={css.button} type="submit">Register</button>
      </Form>
    </Formik>
    <Toaster />
    </>
  );
}