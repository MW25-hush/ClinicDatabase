import { Field } from 'formik'

const ValueForm = ({label, name, type, data, styling ,disabled, nameValueChanger}) => {
  const handleChange = e => {
          nameValueChanger(prev => ({
            ...prev,
            [name] : e.target.value
          }))    
    }
  return (
    <div>
    <label htmlFor={name} className="text-gray-400 ">{label}</label>
    <Field type={type} className={`customValueForm  ${styling}`} value={data ?? ''} name={name} disabled={disabled} onChange={handleChange}/>
   </div>
  )
}

export default ValueForm