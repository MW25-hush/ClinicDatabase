import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { firestore } from "../../firebase/clientApp";
import { BsPerson } from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { ImPrinter } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import male from "../../public/man.png";
import female from "../../public/woman.png";
import ValueForm from "../../components/valueform";
import Tooth from "../../components/tooth";
import Chart from "../../components/Chart";

const Patient = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetch() {
      if (router.query.id) {
        const docRef = doc(firestore, "user", router.query.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          //  console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          setData(undefined);
        }
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  return (
    <div className="bg-black h-screen flex overflow-auto relative">
      {/* navbar  */}
      <Navbar />
      {/* profile  */}
      <div className="w-full px pt-3">
        {/*//* the First header  */}
        <Formik initialValues={{ search: "" }} onSubmit>
          <Form>
            <div className="flex text-white w-full justify-between px-10">
              {/* name and avatar */}
              <div className="flex items-center gap-4">
                <BsPerson size={35} className="text-slate-400" />
                <span className="text-lg ">
                  {data?.name}
                  {data?.last_name}
                </span>
              </div>

              {/*  search  input and add button  */}
              <div className="flex gap-4 items-center relative p">
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
            <hr className="my-4 border-slate-600" />
            {/*  header patient link and update button //*second header  */}
            <div className="flex justify-between px-10">
              {/* patient list and name  */}
              <div className="mt-2 flex gap-3 items-center">
                <Link href={"/search"} passHref>
                  <span className="text-white cursor-pointer hover:text-gray-400">
                    Patient List
                  </span>
                </Link>
                <MdArrowForwardIos className="text-slate-600" size={25} />
                <span className="text-slate-400">
                  {data?.name}
                  {data?.last_name}
                </span>
              </div>

              {/* printer and update button  */}
              <div className="flex gap-4">
                <div className="bg-slate-400 p-1.5 hover:text-slate-300">
                  <ImPrinter size={25} className="text-whit" />
                </div>
                <div className="flex rounded border gap-2 items-center p-1 hover:bg-black">
                  <BiEdit size={20} className="text-white" />
                  <span className="text-white">Edit Patient</span>
                </div>
              </div>
            </div>
            <hr className="my-4 border-slate-600 " />

            {/* patient profile */}
            {/* first row  */}
            <div>
              {/* photo info and observation  */}
              <div className="flex">
                {/* photo  */}
                <div className="bg-slate-700 rounded text-center p-10 ml-10 mr-2   ">
                  <Image
                    src={data?.sex == "male" ? male : female}
                    alt={data?.name}
                    width={120}
                    height={120}
                    className="bg-white rounded-full"
                    placeholder="blur"
                  />
                  <p className="text-lg font-semibold text-white">
                    {data?.name}
                    {data?.last_name}
                  </p>
                  <p className="text-gray-500">No Specified email </p>
                </div>
                {/* info */}
                <div className="bg-slate-700 rounded">
                  {/* first row*/}
                  <div className="flex gap-7 px-10 pt-10 ">
                    <ValueForm
                      name="sex"
                      type="text"
                      data={data?.sex}
                      label="Gender"
                    />
                    <ValueForm
                      name="marital"
                      type="text"
                      data={data?.marital}
                      label="Marital Status"
                    />
                    <ValueForm
                      name="phone_number"
                      type="number"
                      data={data?.phone_number}
                      label="Phone"
                    />
                  </div>

                  {/* second row  */}
                  <div className="flex gap-7 px-10 pt-5 ">
                    <ValueForm
                      name="address"
                      type="text"
                      data={data?.address}
                      label="Address"
                    />
                    <ValueForm
                      name="job"
                      type="text"
                      data={data?.job}
                      label="Job"
                    />
                    {/* //todo to add the registration data and show it here  */}
                    <ValueForm
                      name="payment_amount"
                      type="number"
                      data={data?.payment_amount}
                      label="Payment Amount"
                    />
                  </div>

                  {/* third row  */}
                  <div className="flex gap-7 px-10 pt-5">
                    <ValueForm
                      name="hiv"
                      type="text"
                      data={data?.hiv}
                      label="HIV"
                    />
                    <ValueForm
                      name="hbs"
                      type="text"
                      data={data?.hbs}
                      label="HBS"
                    />
                    <ValueForm
                      name="hcv"
                      type="text"
                      data={data?.hcv}
                      label="HCV"
                    />
                  </div>

                  {/* fourth row  */}
                  <div className="px-10 py-5 flex gap-7">
                    <ValueForm
                      name="pregnancy"
                      type="text"
                      data={data?.pregnancy}
                      label="Pregnancy"
                    />
                    <ValueForm
                      name="diabetes"
                      type="text"
                      data={data?.diabetes}
                      label="Diabetes"
                    />
                    <ValueForm
                      name="reflux"
                      type="text"
                      data={data?.reflux}
                      label="Reflux Esophagits"
                    />
                  </div>
                </div>
                {/* observation  */}
                <div className="bg-slate-700 rounded ml-4 mr-8  ">
                  {/* title */}
                  <p className="text-white pl-4 pt-4 pb-3">Notes</p>
                  {/* container of notes */}
                  <div className="bg-slate-400 capitalize h-3/5 px-6 mx-4 w-11/12 rounded">
                    <ul className="list-disc text-white p-4 ">
                      <li>
                        {data?.observation == ""
                          ? "There is no description by the doctor"
                          : data?.observation}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-7 mx-4 flex justify-between">
                    {/* name of the doctor  */}
                    <div className="flex items-center gap-2">
                      <BsPerson size={20} className="text-slate-400" />
                      <p className="font-semibold text-white">
                        {" "}
                        Dr. Mobin Wahid
                      </p>
                    </div>

                    {/* date of entry  */}
                    <div>
                      {/* //todo Date of registraion to be in here  */}
                      <p className="text-white">Date of Entry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //*chart and files */}
            {/* second row */}
            <div className="flex mt-5 ml-10">
              {/* operation  */}
              <div className="bg-slate-700 rounded flex  ">
                {/* chart container */}
                <Chart
                  chartStyle={{
                    body: "even:bg-black",
                    head: " h-fi !w-96 !border-2 !border-slate-90 !mx-2 !my-12 ",
                    table: "h-full",
                  }}
                  checked={data?.ops.toString()}
                  disabled={true}
                />
                <div className="border-l m-2 border-gray-500 "></div>
                {/* //? the width and pointer property for the styling of the tooth component accoding to the needs of the page */}
                <Tooth
                  toothStyle={"!w-60 pointer-events-none  "}
                  checked={data?.chart}
                />
              </div>

              {/* Payment  */}
              <div className="bg-slate-700 ml-2 mr-8  rounded">
                {/* log of the time of submit will be saved and a complete log of it will be saved  */}
                {/* title */}
                <h1 className="text-white text-lg py-5 px-5 font-bold">
                  Payment Section
                </h1>
                {/* payment amount total */}
                <div className="mx-5 bg-slate-400 p-3 rounded  ">
                  <div>
                  <p className="font-semibold">Total:</p>
                  <p className="border-b-2 border-slate-700 text-slate-800 font-semibold text-lg">
                    &nbsp; {data?.payment_amount} Afs
                  </p>
                  </div>

                    <div>
                  <p className=" font-semibold">Recieved Amount:</p>
                  {/* //todo this part needs data and calcuation from the total and payed amount */}
                  <p className="border-b-2 border-slate-700 text-slate-800 font-semibold text-lg">
                    &nbsp; {data?.payment_amount} Afs
                  </p>
                    </div>
                  {/* paying amount */}
                  <div className="py-2">
                    <Formik>
                      <Form>
                        {/* <ValueForm name={'currentPayment'} type="number" label={'Paying Amount'} data="" styling={'!w-72'}/> */}
                        <label htmlFor="currentPayment" className="font-semibold">
                          Paying Amount:
                        </label>
                        <Field
                          className="border-b-2 bg-slate-400 border-0 border-slate-700 w-full p-0 focus:border-0 focus:ring-0 focus:border-b-4 focus:border-black placeholder:text-sm placeholder:italic"
                          type="number"
                          name="currentPayment"
                          placeholder="Type the amount of payment in here"
                        />
                        <div className="flex justify-between mt-4">
                          <button type="submit" className="bg-black rounded px-7 py-1 text-white hover:bg-mygreen">Save</button>
                          <button className="border px-2 border-slate-700 rounded hover:bg-slate-700 hover:text-white">Pay Log</button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
                {/* button and link to modal that shows complete log of payment history  */}
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Patient;
