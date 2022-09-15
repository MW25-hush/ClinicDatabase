import { Field } from "formik";
import { BiEdit } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";

const PatientsPayment = ({ editActive,patientData,setAfterEditValues, paymentFunction, afterEditValues }) => {
  return (
    <div
      className={`${
        editActive ? "opacity-60" : "opacity-100"
      } bg-slate-700 ml-2 grow lg:grow-0 xl:gro rounded md:my-3 lg:my-0  md:mx-5 lg:mx-0 lg:ml-2 `}
    >
      {/* log of the time of submit will be saved and a complete log of it will be saved  */}
      {/* title and edit icon*/}
      <div className="flex items-center justify-between px-5 py-2">
        {/* title */}
        <h1 className="text-white text-lg font-bold">Payment Section</h1>
        <BiEdit size={25} className="text-white mr-5 hover:text-gray-400" />
      </div>
      {/* payment amount total */}
      <div
        id="billingContainer"
        className="mx-3 flex items-center lg:h-5/6 rounded md:p-5 lg:p-0"
      >
        {/* billing intel section */}
        <div className=" space-y-2">
          <div>
            <label className="text-gray-400 font-bold block">
              Total Amount:
            </label>
            <Field
              type="number"
              name="payment_amount"
              className={`${
                editActive ? "inline-block" : "hidden"
              } border-0 bg-inherit text-white font-semibold text-lg`}
              value={patientData?.payment_amount}
            />
            <p className="text-white text-lg font-bold">
              &nbsp;{patientData?.payment_amount}{" "}
              <span className="text-md font-semibold">Afs</span>
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-400">Recieved Amount:</p>
            {/* //todo this part needs data and calcuation from the total and payed amount */}
            <p className="text-white font-semibold text-lg">
              &nbsp;{patientData?.recieved_payment || 0} Afs
            </p>
          </div>

          <div className="">
            <p className="text-gray-400 font-bold text-lg">Remaining Amount:</p>
            {/* //todo to be caculated from 2 endpoints  */}
            <p className="text-white font-semibold">
              &nbsp;
              {patientData?.payment_amount - patientData?.recieved_payment ||
                patientData?.payment_amount}{" "}
              <span className="text-md font-semibold">Afs</span>
            </p>
          </div>
        </div>
        {/* paying amount */}
        <div className="py-2 bg-slate-400 rounded grow md:mx-10">
          {/* billing tilte  and history log */}
          <div className=" flex items-center justify-between mx-5 ">
            <h1 className="font-bold text-lg ">Billing Section</h1>
            {/* button and link to modal that shows complete log of payment history  */}
            <FaHistory />
          </div>

          <div className="mx-5 mt-2 mb-4">
            <label htmlFor="currentPayment" className="font-semibold block">
              Paying Amount:
            </label>
            <input
              className="bg-slate-400 w-full customValueForm focus:border-black focus:border-b-4"
              type="number"
              disabled={editActive}
              onChange={(e) =>
                setAfterEditValues({
                  ...afterEditValues,
                  currentPayment: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className="mx-5">
            <button
              type="button"
              className="bg-black rounded px-7 py-1 w-full font-bold  text-white hover:bg-gray-600 "
              disabled={editActive}
              onClick={paymentFunction}
            >
              Recieve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPayment;
