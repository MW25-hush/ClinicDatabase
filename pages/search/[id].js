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
    <div className="bg-black h-screen flex">
      {/* navbar  */}
      <Navbar />
      {/* profile  */}
      <div className="w-full px pt-3">
        {/*//* the First header  */}
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
            <Formik initialValues={{ search: "" }} onSubmit>
              <form>
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
              </form>
            </Formik>
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
              <p className="text-lg font-semibold text-white">{data?.name}{data?.last_name}</p>
              <p className="text-gray-500">No Specified email </p>
            </div>
            {/* info */}
            <div className="bg-slate-700 rounded">
                
                  <Formik>
                    <Form  >
                      {/* first row*/}
                      <div className="flex gap-7 px-10 pt-10 ">
                       <ValueForm name="sex" type="text" data={data?.sex} label="Gender"/>
                       <ValueForm name="marital" type="text" data={data?.marital} label="Marital Status"/>
                       <ValueForm name="phone_number" type="number" data={data?.phone_number} label="Phone"/>
                      </div>

                      {/* second row  */}
                      <div className="flex gap-7 px-10 pt-5 ">
                       <ValueForm name="address" type="text" data={data?.address} label="Address"/>
                        <ValueForm name="job" type="text" data={data?.job} label="Job"/>
                        {/* //todo to add the registration data and show it here  */}
                       <ValueForm name="payment_amount" type="number" data={data?.payment_amount} label="Payment Amount"/>
                      </div>

                      {/* third row  */}
                      <div className="flex gap-7 px-10 pt-5">
                        <ValueForm name="hiv" type="text" data={data?.hiv} label="HIV"/>
                         <ValueForm name="hbs" type="text" data={data?.hbs} label="HBS"/>
                         <ValueForm name="hcv" type="text" data={data?.hcv} label="HCV"/>
                      </div>

                      {/* fourth row  */}
                      <div className="px-10 py-5 flex gap-7">
                       <ValueForm name="pregnancy" type="text" data={data?.pregnancy} label="Pregnancy"/>
                       <ValueForm name="diabetes" type="text" data={data?.diabetes} label="Diabetes"/>
                       <ValueForm name="reflux" type="text" data={data?.reflux} label="Reflux Esophagits"/>
                    </div>
                    </Form>
                  </Formik>
             
            </div>
            {/* observation  */}
            <div className="bg-slate-700 rounded ml-4 mr-8 ">
              {/* title */}
                <p className="text-white pl-4 pt-4 pb-3">Notes</p>
                {/* container of notes */}
                <div className="bg-slate-400 capitalize h-3/5 px-6 mx-4 w-11/12 rounded">
                  <ul className="list-disc text-white p-4 ">
                        <li>
                           {data?.observation == '' ? 'There is no description by the doctor' : data?.observation}
                        </li>
                  </ul>
                </div>
                <div className="mt-7 mx-4 flex justify-between">
                  
                  {/* name of the doctor  */}
                  <div className="flex items-center gap-2">
                   <BsPerson size={20} className="text-slate-400"/>
                      <p className="font-semibold text-white"> Dr. Mobin Wahid</p>
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
        {/* chart and files */}
        {/* second row */}
        <div>
            {/* chart and operation  */}
            
        </div>

      </div>
    </div>
  );
};

export default Patient;
