import { ErrorMessage, Field } from 'formik'
import React from 'react'

function FormMaker({name,label,type}) {
  return (
    <>
      <label htmlFor={name} className="text-white">{label}</label>
      <Field type={type} name={name} className="customizeForm"/>
      <ErrorMessage name={name} render={msg => <div className="text-red-500 font-medium capitalize">{msg}</div>}/>
    </>
  )
}

export default FormMaker