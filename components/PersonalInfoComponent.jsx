import Image from "next/image";
import male from "../public/man.png";
import female from "../public/woman.png";
import { Field } from "formik";

const PatientsPersonalInfo = ({
  patientData,
  editActive,
  setAfterEditValues,
  afterEditValues,
}) => {
  const handleInfoUpdate = (e) => {
    setAfterEditValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-slate-700 md:grow lg:grow-0 rounded text-center p-10 ml-10 mr-2 md:order-1 lg:order-none  ">
      <Image
        src={patientData?.sex == "male" ? male : female}
        alt={patientData?.name}
        width={120}
        height={120}
        className="bg-white rounded-full"
        placeholder="blur"
      />
      <p
        className={` ${
          editActive ? "hidden" : "block"
        } text-lg font-semibold text-white`}
      >
        {patientData?.name}
        &nbsp;
        {patientData?.last_name}
      </p>

      <div
        className={`${
          editActive ? "flex" : "hidden"
        } gap-3 justify-center flex-wr text-left mb-3`}
      >
        <div>
          <label htmlFor="name" className="text-gray-400">
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="customValueForm"
            value={editActive ? afterEditValues?.name : patientData?.name}
            disabled={!editActive}
            onChange={handleInfoUpdate}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-gray-400">
            Last Name
          </label>
          <Field
            type="text"
            name="last_name"
            className="customValueForm"
            value={
              editActive ? afterEditValues?.last_name : patientData?.last_name
            }
            disabled={!editActive}
            onChange={handleInfoUpdate}
          />
        </div>
      </div>
      <p className="text-gray-500">No Specified email </p>
      {/* //todo to add memebership status  */}
    </div>
  );
};

export default PatientsPersonalInfo;
