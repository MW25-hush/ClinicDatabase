import { ErrorMessage, Field } from 'formik'

function FormMaker({name,label,type,style}) {
  return (
    <div className={style.container}>
      <label htmlFor={name} className="text-white">{label}</label>
      <Field type={type} name={name} className={style.inputField} />
      <ErrorMessage name={name} render={msg => <div className="text-red-500 font-medium capitalize">{msg}</div>}/>
    </div>
  )
}

export default FormMaker