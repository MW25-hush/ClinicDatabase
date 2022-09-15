import React from 'react'
import PatientSocialInfo from './patientsSocialInfoComponent'
import ValueForm from './valueForm'

const PatientSocial = ({patientData}) => {
  return (
    <div className='bg-slate-700 rounded md:order-3 md:my-5 lg:my-0 md:px-8 lg:px-0  md:mx-auto lg:mx-0 lg:order-none'>
        {/* first row*/}
        <div className="flex gap-7 px-10 pt-10 ">
        {/* Gender */}
        <PatientSocialInfo label="Gender" value={patientData?.sex} />
        {/* Marital Stauts */}
        <PatientSocialInfo label="Marital Status" value={patientData?.marital} />
        {/* phone  */}
        <PatientSocialInfo label="Phone" value={patientData?.phone_number} />
      </div>

      {/* second row  */}
      <div className="flex gap-7 px-10 pt-5 ">
        {/* Address */}
        <PatientSocialInfo label="Address" value={patientData?.address} />
        {/* Job */}
        <PatientSocialInfo label="Job" value={patientData?.job} />
        {/* Registry Date */}
        <PatientSocialInfo label="Registry Date" value={patientData?.registeredAt} />
      </div>
      {/* third row  */}
      <div className="flex gap-7 px-10 pt-5">
      {/* HIV */}
      <PatientSocialInfo label="HIV" value={patientData?.hiv ? 'True' : "False"} />
       {/* HBS */}
       <PatientSocialInfo label="HBS" value={patientData?.hbs ? 'True' : "False"} />
        {/* HCV */}
        <PatientSocialInfo label="HCV" value={patientData?.hcv ? 'True' : "False"} />
      </div>

      {/* fourth row  */}
      <div className="px-10 py-5 flex gap-7">
        {/* pregnancy */}
        <ValueForm
          name="pregnancy"
          type="text"
          data={patientData?.pregnancy}
          label="Pregnancy"
          disabled={true}
        />
          {/* diabetes */}
        <ValueForm
          name="diabetes"
          type="text"
          data={patientData?.diabetes}
          label="Diabetes"
          disabled={true}
        />
        {/* reflux */}
        <ValueForm
          name="reflux"
          type="text"
          data={patientData?.reflux}
          label="Reflux Esophagits"
          disabled={true}
        />
      </div>
      </div>
  )
}

export default PatientSocial