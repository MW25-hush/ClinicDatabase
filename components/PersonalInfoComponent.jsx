import Image from 'next/image'
import ValueForm from './valueForm'
import male from "../public/man.png";
import female from "../public/woman.png";

const PatientsPersonalInfo = ({patientData,editActive,setAfterEditValues,afterEditValues}) => (
  <div className="bg-slate-700 md:grow lg:grow-0 rounded text-center p-10 ml-10 mr-2 md:order-1 lg:order-none  ">
    <Image
      src={patientData?.sex == "male" ? male : female}
      alt={patientData?.name}
      width={120}
      height={120}
      className="bg-white rounded-full"
      placeholder="blur" />
    <p
      className={` ${editActive ? "hidden" : "block"} text-lg font-semibold text-white`}
    >
      {patientData?.name}
      &nbsp;
      {patientData?.last_name}
    </p>

    <div
      className={`${editActive ? "flex" : "hidden"} gap-3 justify-center flex-wr text-left mb-3`}
    >
      <ValueForm
        name="name"
        type="text"
        data={editActive ? afterEditValues.name : patientData?.name}
        label="Name"
        disabled={!editActive}
        nameValueChanger={setAfterEditValues} />
      <ValueForm
        name="last_name"
        type="text"
        data={editActive
          ? afterEditValues.last_name
          : patientData?.last_name}
        label="Last Name"
        disabled={!editActive}
        nameValueChanger={setAfterEditValues} />
    </div>
    <p className="text-gray-500">No Specified email </p>
  {/* //todo to add memebership status  */}
  </div>

)

export default PatientsPersonalInfo