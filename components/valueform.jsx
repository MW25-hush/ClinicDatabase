import { Field } from 'formik'
import React from 'react'

const ValueForm = ({label, name, type, data}) => {
  return (
    <div>
    <label htmlFor={name} className="text-gray-400">{label}</label>
    <Field type={type} className="customValueForm" value={data} name={name} disabled={true}/>
   </div>
  )
}

export default ValueForm