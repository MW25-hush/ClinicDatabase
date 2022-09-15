import { BsPerson } from "react-icons/bs";

const PatientsObservation = ({patientData}) => {
  return (
    <div className="bg-slate-700 rounded ml-4 mr-8 md:order-2 lg:order-none lg:grow ">
      {/* title */}
      <p className="text-white pl-4 pt-4 pb-3">Notes</p>
      {/* container of notes */}
      <div className="bg-slate-400 capitalize h-3/5 px-6 mx-4 md:w-11/12 lg:w-10/12 xl:w-11/12 rounded">
        <ul className="list-disc text-white p-4 ">
          {/* //todo the observation needs a design to update the value */}
          <li className="text-xs w-32">
            {patientData?.observation == ""
              ? "There is no description by the doctor"
              : patientData?.observation}
          </li>
        </ul>
      </div>
      <div className="my-5 mx-4 flex lg:justify-between ">
        {/* name of the doctor  */}
        <div className="flex items-center gap-2">
          <BsPerson size={20} className="text-slate-400" />
          <p className="font-semibold text-white"> Dr. Mobin Wahid</p>
        </div>

        {/* date of entry  */}
        <div className="hidden lg:block">
          <p className="text-white">{patientData?.registeredAt}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientsObservation;
