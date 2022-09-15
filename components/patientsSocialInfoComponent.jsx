import React from 'react'

const PatientSocialInfo = ({label,value}) => {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="customValueForm">{value}</p>
    </div>
  )
}

export default PatientSocialInfo