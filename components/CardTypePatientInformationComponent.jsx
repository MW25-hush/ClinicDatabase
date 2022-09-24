import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";

const CardTypePatientInfo = ({
  patientName,
  patientLastName,
  patientNumber,
}) => {
  return (
    <Link  href={`/patients/${patientNumber}`} passHref>
    <div className="bg-slate-700 p-5 rounded cursor-pointer">
      <div className="flex justify-center">
        <BsPersonCircle size={40} />
      </div>
      <p className="uppercase text-center ">
        {patientName}
        &nbsp;
        {patientLastName}
      </p>
      <p>Phone Number: {patientNumber}</p>
    </div>
    </Link>
  );
};

export default CardTypePatientInfo;
