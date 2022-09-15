import { Field } from "formik";
import Link from "next/link";
import { AiFillSave, AiOutlinePlus, AiOutlineSearch, AiOutlineUserDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { ImPrinter } from "react-icons/im";
import { MdArrowForwardIos, MdCancel } from "react-icons/md";

const HeaderSection = ({patientData, editActive, deletePatient, submitUpdate}) => {
  return (
    <>
      <div className="flex  text-white w-full justify-between px-10 ">
        {/* name and avatar */}
        <div className="flex items-center gap-4">
          <BsPerson size={35} className="text-slate-400" />
          <span className="text-lg ">
            {patientData?.name}
            &nbsp;
            {patientData?.last_name}
          </span>
        </div>

        {/*  search  input and add button  */}
        <div className="flex gap-4 items-center relative">
          <AiOutlineSearch size={20} className="absolute bottom-2 left-4" />
          <Field
            type="number"
            className="customizeForm bg-slate-800 rounded-2xl pl-10 w-52"
            name="search"
            placeholder="Search"
          />
          <div className="border-2 border-mygreen rounded-full hover:bg-mygreen  p-1.5">
            <AiOutlinePlus size={25} />
          </div>
        </div>
      </div>
      <hr className="my-4 border-slate-600 w-full" />
      {/*  header patient link and update button //*second header  */}
      <div className="flex justify-between px-10">
        {/* patient list and name  */}
        <div className="mt-2 flex gap-3 items-center">
          <Link href={"/patients"} passHref>
            <span className="text-white cursor-pointer hover:text-gray-400">
              Patient List
            </span>
          </Link>
          <MdArrowForwardIos className="text-slate-600" size={25} />
          <span className="text-slate-400">
            {patientData?.name}
            &nbsp;
            {patientData?.last_name}
          </span>
        </div>

        {/* printer and update button  */}
        <div className="flex gap-4">
          <div
            className={`${
              editActive ? "hidden" : "flex"
            } bg-slate-400 p-1.5 hover:text-slate-300>`}
          >
            <ImPrinter size={25} />
          </div>
          {/* edit patient button  */}
          <button
            type="button"
            onClick={() => submitUpdate("status")}
            className={`${
              editActive ? "hidden" : "flex"
            } rounded border gap-2 items-center p-1 hover:scale-105 transition`}
          >
            <BiEdit size={20} className="text-white" />
            <span className="text-white">Edit Patient</span>
          </button>

          {/* delete,save,cancel div */}
          <div className={`${editActive ? "flex" : "hidden"} gap-2`}>
            {/* save */}
            <button
              type="button"
              onClick={() => submitUpdate("update")}
              className="rounded flex bg-mygreen text-white items-center px-2 py-1 gap-1 hover:bg-green-700 hover:"
            >
              <AiFillSave />
              <span>Save</span>
            </button>

            {/* cancel button  */}
            <button
              type="button"
              onClick={() => submitUpdate("status")}
              className="rounded flex border border-red-700 text-red-700 items-center px-2 py-1 gap-1 hover:text-white hover:bg-red-900 hover:border-0 transition "
            >
              <MdCancel />
              <span>Cancel</span>
            </button>

            {/* delete patient button */}
            {/* //todo bringing one modal  */}
            <button
              type="button"
              className="rounded flex bg-red-500 text-white items-center px-2 py-1 gap-1 hover:bg-red-900 "
              onClick={deletePatient}
            >
              <AiOutlineUserDelete />
              <span>Delete Patient</span>
            </button>
          </div>
        </div>
      </div>
      <hr className="my-4 border-slate-600 " />
    </>
  );
};

export default HeaderSection;
