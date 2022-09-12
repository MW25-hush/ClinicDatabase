import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { firestore } from "../../firebase/clientApp";
import { BsPerson } from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUserDelete,
  AiFillSave,
} from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdArrowForwardIos, MdCancel } from "react-icons/md";
import { ImPrinter } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import male from "../../public/man.png";
import female from "../../public/woman.png";
import ValueForm from "../../components/valueForm";
import Tooth from "../../components/tooth";
import Chart from "../../components/Chart";
import { toast, ToastContainer } from "react-toastify";

const Patient = () => {
  // console.log(Date().tolocaleString('us'));

  const router = useRouter();
  const [data, setData] = useState();
  const [editActive, setEditStatus] = useState(false);
  const [initialValues, setInitialValues] = useState({
    search: "",
    ops: [],
    chart: {},
    name: "",
    last_name: "",
    address: "",
    payment_amount: 0,
    currentPayment: 0,
  });

  useEffect(() => {
    // * GetDoc function for fetching the data from firestore
    if (router.query.id) {
      const docRef = doc(firestore, "user", router.query.id);
      // fetching data from the firestore for single document
      try {
        onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            // fetching data for the Main profile Data
            setData(snapshot.data());
            // Fetching the same data for the updateState to be modified
            setInitialValues({
              ...initialValues,
              ops: snapshot.data().ops,
              chart: snapshot.data().chart,
              name: snapshot.data().name,
              last_name: snapshot.data().last_name,
              address: snapshot.data().address,
              payment_amount: snapshot.data().payment_amount,
            });
          } else {
            // todo show the that the document is not defined
          }
        });
      } catch (e) {
        toast.error(e.message);
      }
    }
    //! not sure on error handling on this block
    // return () => {
    //   setData([])
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);


  // handleDelete Function
  const handleDelete = () => {
    //* deleteDoc function
    (async function () {
      await deleteDoc(doc(firestore, "user", router.query.id))
        .then(() => {
          toast.info("successfully deleted");
          setEditStatus(false);
          router.push("/patients");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    })();
  };

  //* handle svg function
  const handleClickSvg = (e) => {
    setInitialValues((comp) => ({
      ...comp,
      chart: {
        ...comp.chart,
        [e.target.id]: !comp.chart[e.target.id],
      },
    }));
  };

  //* handle update function
  const handleUpdate = (condition) => {
    if (condition === "status") setEditStatus(!editActive);
    if (condition === "update") {
      (async function () {
        await setDoc(doc(firestore, "user", router.query.id), {
          ...data,
          name: initialValues.name,
          last_name: initialValues.last_name,
          address: initialValues.address,
          ops: initialValues.ops,
          chart: initialValues.chart,
        })
          .then(() => setEditStatus(false))
          .catch((e) => {
            toast.error(e.message);
          });
      })();
    }
  };

  const handleChange = (e) => {
    if (initialValues.ops.includes(e.target.value)) {
      setInitialValues({
        ...initialValues,
        ops: initialValues.ops.filter((op) => op !== e.target.value),
      });
    } else {
      initialValues?.ops.push(e.target.value);
      setInitialValues({ ...initialValues, ops: initialValues.ops });
    }
  };

  // * handlePay Function
  const handlePay = () => {
    (async function () {
      await setDoc(doc(firestore, "user", router.query.id), {
        ...data,
        // todo to add history log here
        recieved_payment: data.recieved_payment
          ? parseInt(data?.recieved_payment + initialValues.currentPayment)
          : initialValues.currentPayment,
      })
        .then(() => {
          // react toastify in here
          toast.success("Successfully Payed");
          setInitialValues({ ...initialValues, currentPayment: 0 });
        })
        .catch((e) => {
          toast.error(e.message);
        });
    })();
  };

  if (data == undefined) return <h1>Loading</h1>;
  return (
    <div className="bg-black min-h-screen overflow-auto flex ">
      <ToastContainer />
      {/* navbar  */}

      <Navbar />

      {/* profile  */}
      <div className="pt-3 grow ">
        {/*//* the First header  */}
        <Formik initialValues={initialValues}>
          <Form>
            <div className="flex  text-white w-full justify-between px-10 ">
              {/* name and avatar */}
              <div className="flex items-center gap-4">
                <BsPerson size={35} className="text-slate-400" />
                <span className="text-lg ">
                  {data?.name}
                  &nbsp;
                  {data?.last_name}
                </span>
              </div>

              {/*  search  input and add button  */}
              <div className="flex gap-4 items-center relative">
                <AiOutlineSearch
                  size={20}
                  className="absolute bottom-2 left-4"
                />
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
                  {data?.name}
                  &nbsp;
                  {data?.last_name}
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
                  onClick={() => handleUpdate("status")}
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
                    onClick={() => handleUpdate("update")}
                    className="rounded flex bg-mygreen text-white items-center px-2 py-1 gap-1 hover:bg-green-700 hover:"
                  >
                    <AiFillSave />
                    <span>Save</span>
                  </button>

                  {/* cancel button  */}
                  <button
                    type="button"
                    onClick={() => handleUpdate("status")}
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
                    onClick={handleDelete}
                  >
                    <AiOutlineUserDelete />
                    <span>Delete Patient</span>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-4 border-slate-600 " />

            {/* patient profile */}
            <div className="2xl:max-w-7xl 2xl:mx-auto  ">
              {/* first row  */}
              {/* photo info and observation  */}
              <div className="flex md:flex-wrap lg:flex-nowrap ">
                {/* photo  */}
                <div className="bg-slate-700 md:grow lg:grow-0 rounded text-center p-10 ml-10 mr-2 md:order-1 lg:order-none  ">
                  <Image
                    src={data?.sex == "male" ? male : female}
                    alt={data?.name}
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
                    {data?.name}
                    &nbsp;
                    {data?.last_name}
                  </p>

                  <div
                    className={`${
                      editActive ? "flex" : "hidden"
                    } gap-3 justify-center flex-wr text-left mb-3`}
                  >
                    <ValueForm
                      name="name"
                      type="text"
                      data={editActive ? initialValues.name : data?.name}
                      label="Name"
                      disabled={!editActive}
                      nameValueChanger={setInitialValues}
                    />
                    <ValueForm
                      name="last_name"
                      type="text"
                      data={
                        editActive ? initialValues.last_name : data?.last_name
                      }
                      label="Last Name"
                      disabled={!editActive}
                      nameValueChanger={setInitialValues}
                    />
                  </div>
                  <p className="text-gray-500">No Specified email </p>
                </div>
                {/* info */}
                <div className="bg-slate-700 rounded md:order-3 md:my-5 lg:my-0 md:px-8 lg:px-0  md:mx-auto lg:mx-0 lg:order-none ">
                  {/* first row*/}
                  <div className="flex gap-7 px-10 pt-10 ">
                    <ValueForm
                      name="sex"
                      type="text"
                      data={data?.sex}
                      label="Gender"
                      disabled={true}
                    />
                    <ValueForm
                      name="marital"
                      type="text"
                      data={data?.marital}
                      label="Marital Status"
                      disabled={true}
                    />
                    <ValueForm
                      name="phone_number"
                      type="number"
                      data={data?.phone_number}
                      label="Phone"
                      disabled={true}
                    />
                  </div>

                  {/* second row  */}
                  <div className="flex gap-7 px-10 pt-5 ">
                    <ValueForm
                      name="address"
                      type="text"
                      data={data?.address}
                      label="Address"
                      disabled={!editActive}
                      nameValueChanger={setInitialValues}
                    />
                    <ValueForm
                      name="job"
                      type="text"
                      data={data?.job}
                      label="Job"
                      disabled={true}
                    />
                    {/* //todo make the fields not for edit a non field element */}
                    <ValueForm
                      name="createdAt"
                      type="text"
                      data={data?.registeredAt}
                      label="Registry Date"
                      disabled={true}
                    />
                  </div>

                  {/* third row  */}
                  <div className="flex gap-7 px-10 pt-5">
                    <ValueForm
                      name="hiv"
                      type="text"
                      data={data?.hiv}
                      label="HIV"
                      disabled={true}
                    />
                    <ValueForm
                      name="hbs"
                      type="text"
                      data={data?.hbs}
                      label="HBS"
                      disabled={true}
                    />
                    <ValueForm
                      name="hcv"
                      type="text"
                      data={data?.hcv}
                      label="HCV"
                      disabled={true}
                    />
                  </div>

                  {/* fourth row  */}
                  <div className="px-10 py-5 flex gap-7">
                    <ValueForm
                      name="pregnancy"
                      type="text"
                      data={data?.pregnancy}
                      label="Pregnancy"
                      disabled={true}
                    />
                    <ValueForm
                      name="diabetes"
                      type="text"
                      data={data?.diabetes}
                      label="Diabetes"
                      disabled={true}
                    />
                    <ValueForm
                      name="reflux"
                      type="text"
                      data={data?.reflux}
                      label="Reflux Esophagits"
                      disabled={true}
                    />
                  </div>
                </div>
                {/* observation  */}
                <div className="bg-slate-700 rounded ml-4 mr-8 md:order-2 lg:order-none lg:grow ">
                  {/* title */}
                  <p className="text-white pl-4 pt-4 pb-3">Notes</p>
                  {/* container of notes */}
                  <div className="bg-slate-400 capitalize h-3/5 px-6 mx-4 md:w-11/12 lg:w-10/12 xl:w-11/12 rounded">
                    <ul className="list-disc text-white p-4 ">
                      {/* //todo the observation needs a design to update the value */}
                      <li className="text-xs w-32">
                        {data?.observation == ""
                          ? "There is no description by the doctor"
                          : data?.observation}
                      </li>
                    </ul>
                  </div>
                  <div className="my-5 mx-4 flex lg:justify-between ">
                    {/* name of the doctor  */}
                    <div className="flex items-center gap-2">
                      <BsPerson size={20} className="text-slate-400" />
                      <p className="font-semibold text-white">
                        {" "}
                        Dr. Mobin Wahid
                      </p>
                    </div>

                    {/* date of entry  */}
                    <div className="hidden lg:block">
                      {/* //todo Date of registraion to be in here  */}
                      <p className="text-white">{data?.registeredAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* //*chart and files */}
              {/* second row */}
              <div className="flex md:flex-wrap lg:flex-nowrap mt-5 ml-10  mr-8">
                {/* operation  */}
                <div className="bg-slate-700 rounded flex grow md:mx-auto lg:mx-0 ">
                  {/* chart container */}
                  <Chart
                    chartStyle={{
                      body: "even:bg-black ",
                      head: "!border-2 !border-slate-90 !mx-2 !my-12 grow ",
                      table: "h-full  ",
                    }}
                    checked={editActive ? initialValues.ops : data?.ops}
                    disabled={!editActive}
                    props={{ onChange: handleChange }}
                  />
                  <div className="border-l m-2 border-gray-500 "></div>
                  {/* //? the width and pointer property for the styling of the tooth component accoding to the needs of the page */}
                  <Tooth
                    toothStyle={`!w-64 ${
                      editActive ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    handleClickSvg={handleClickSvg}
                    checked={editActive ? initialValues?.chart : data?.chart}
                  />
                </div>

                {/* Payment  */}
                <div
                  className={`${
                    editActive ? "opacity-60" : "opacity-100"
                  } bg-slate-700 ml-2 grow lg:grow-0 xl:gro rounded md:my-3 lg:my-0  md:mx-5 lg:mx-0 lg:ml-2 `}
                >
                  {/* log of the time of submit will be saved and a complete log of it will be saved  */}
                  {/* title and edit icon*/}
                  <div className="flex items-center justify-between px-5 py-2">
                    {/* title */}
                    <h1 className="text-white text-lg font-bold">
                      Payment Section
                    </h1>
                    <BiEdit
                      size={25}
                      className="text-white mr-5 hover:text-gray-400"
                    />
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
                          value={data?.payment_amount}
                        />
                        <p className="text-white text-lg font-bold">
                          &nbsp;{data?.payment_amount}{" "}
                          <span className="text-md font-semibold">Afs</span>
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-gray-400">
                          Recieved Amount:
                        </p>
                        {/* //todo this part needs data and calcuation from the total and payed amount */}
                        <p className="text-white font-semibold text-lg">
                          &nbsp;{data?.recieved_payment || 0} Afs
                        </p>
                      </div>

                      <div className="">
                        <p className="text-gray-400 font-bold text-lg">
                          Remaining Amount:
                        </p>
                        {/* //todo to be caculated from 2 endpoints  */}
                        <p className="text-white font-semibold">
                          &nbsp;
                          {data?.payment_amount - data?.recieved_payment ||
                            data?.payment_amount}{" "}
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
                        <label
                          htmlFor="currentPayment"
                          className="font-semibold block"
                        >
                          Paying Amount:
                        </label>
                        <input
                          className="bg-slate-400 w-full customValueForm focus:border-black focus:border-b-4"
                          type="number"
                          disabled={editActive}
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
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
                          onClick={handlePay}
                        >
                          Recieve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end of profile  */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Patient;
