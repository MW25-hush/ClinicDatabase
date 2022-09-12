import Link from "next/link";

function PatientInfo({patient,idx}) {
  return (
    <Link  href={`/patients/${patient.phone_number}`} passHref>
    <tr className="text-center hover:bg-mygreen transition cursor-pointer" >
       <td>{idx + 1}</td>
       <td>{patient.phone_number}</td>
       <td>{patient.name}</td>
       <td>{patient.last_name}</td>
       <td>{patient.payment_amount}</td>
   </tr>
   </Link>
  )
}

export default PatientInfo;