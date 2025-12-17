import css from "./ContactForm.module.css"
import {useId} from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

export default function ContactForm({onClose}) {
  const idName = useId();
  const idNumber = useId();

  const ValidSchema = Yup.object().shape({
    name:Yup.string().min(3,"Too Short!").max(50,"Too Long!").required("Required"),
    phoneNumber:Yup.number().typeError("Only numbers!").min(1000,"Too Short!").max(999999999999,"Too Long!").integer("Only integer!").positive("Number can`t be negative or 0!").required("Required")
  })

  const dispatch = useDispatch();
  const handleSubmit = (values, actions)=>{
    dispatch(addContact({name : values.name, phoneNumber : values.phoneNumber}))
    actions.resetForm();
    onClose()
  } 
  return (
    <Formik initialValues={{name: "", phoneNumber: ""}} onSubmit={handleSubmit} validationSchema={ValidSchema}>
			<Form className={css.form}>
        <div className={css.formContainer}>
          <label htmlFor={idName}>Name</label>
          <Field className={css.input} type="text" name="name" id={idName} />
          <ErrorMessage name="name" component="span" className={css.error}/>
        </div>
        <div className={css.formContainer}>
          <label htmlFor={idNumber}>Number</label>
          <Field className={css.input} type="number" name="phoneNumber" id={idNumber}/>
          <ErrorMessage name="phoneNumber" component="span" className={css.error}/>
        </div>
				<button type="submit">Add contact</button>
			</Form>
    </Formik>
  )
}

