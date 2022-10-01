import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Navbar from "../components/navbar";
import * as Yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import FormMaker from "../components/registerFormMaker";
import ToothChart from "../components/tooth";
import OperationOptionsTable from "../components/Chart";
import json from "../DataObjects.json";
import { useSession } from "next-auth/react";
import Modal from "../components/ModalComponent";
import LoadingSpinner from "../components/loadingComponent";
import { toast, ToastContainer } from "react-toastify";
import  { useRouter } from "next/router";

const initialValues = {
  name: "",
  lastname: "",
  address: "",
  job: "",
  age: "",
  phonenumber: "",
  payment: "",
  sex: "",
  marital: "",
  HIV: false,
  HCV: false,
  HBS: false,
  pregnancy: false,
  diabetes: false,
  reflux: false,
  observation: "",
  ops: [],
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required("You need to fill this filed"),
  lastname: Yup.string().required("You need to fill this filed"),
  address: Yup.string().required("You need to fill this filed"),
  age: Yup.string().required("You need to fill this field"),
  phonenumber: Yup.string()
    .length(9, "please enter the 9 digits of your phone number")
    .required("You need to fill this field"),
  payment: Yup.string().required("You need to fill this field"),
  sex: Yup.string()
    .oneOf(["male", "female"])
    .required("You should select a gender"),
  marital: Yup.string()
    .oneOf(["married", "single"])
    .required("you should select one option"),
  ops: Yup.array()
    .min(1, "One Operation Must be Selected")
    .of(Yup.string().required())
    .required(),
});

function RegisterPatient() {
  const { status } = useSession();

  // the object of tooth graph from json
  const teethStateGraph = json.TeethStateGraph;
  //  the state of the teeth graph
  const [teethGraph, updateTeethGraph] = useState(teethStateGraph);
  // setting the date to Iranian Formart
  const date = new Date().toLocaleDateString("fa-IR-u-nu-latn");
  // router 
  const router = useRouter()

  // function for highlighting the teeth in the graph
  const selectTeeth = (teeth) => {
    // taking the id of the target tooth
    let toothState = teeth.target.id;
    // setting the state of the tooth to it's opposite
    updateTeethGraph({ ...teethGraph, [toothState]: !teethGraph[toothState] });
  };

  // function which on submit will add the data to the firebase
  const addPatient = (values, { resetForm }) => {
    //? Use ResetForm when the response is taken from the firestore
    setDoc(doc(firestore, "user", values.phonenumber.toString()), {
      name: values.name,
      last_name: values.lastname,
      address: values.address,
      age: values.age,
      phone_number: values.phonenumber,
      payment_amount: values.payment,
      job: values.job,
      sex: values.sex,
      marital: values.marital,
      hiv: values.HIV,
      hcv: values.HCV,
      hbs: values.HBS,
      pregnancy: values.pregnancy,
      diabetes: values.diabetes,
      reflux: values.reflux,
      observation: values.observation,
      ops: values.ops,
      teethGraph,
      registeredAt: date,
    })
      .then(() => {
        toast.success("Patient Added");
        // router.push('/patients')
        resetForm();
        updateTeethGraph(teethStateGraph);
      })
      .catch((e) => console.log(e));
      

    // todo to find the response property out of the firestore
  };

  // authenticating the page
  return status == "unauthenticated" ? (
    <div className="flex h-screen justify-center bg-black items-center grow">
      <ToastContainer />
      <Modal />
    </div>
  ) : (
    <div className="bg-black flex min-h-screen overflow-auto">
      {/* navbar */}
      <Navbar />
      <ToastContainer />
      {status == "loading" ? (
        <LoadingSpinner />
      ) : (
        <div className=" md:w-full 2xl:w-auto 2xl:m-auto ">
          {/* //* registration form  */}
          <h1 className="text-white md:text-2xl xl:text-3xl font-bold p-2 m-2">
            Registration Form
          </h1>

          <Formik
            initialValues={initialValues}
            onSubmit={addPatient}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="lg:flex">
                {/* //*  info section  */}
                <div className="m-8 lg:m-4">
                  <div className="flex flex-wrap gap-2 lg:max-w-4xl ">
                    {/* //? Name input  */}
                    <FormMaker
                      name={"name"}
                      type="text"
                      label={"Name"}
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                    {/* //? Last Name input  */}
                    <FormMaker
                      name="lastname"
                      label={"Last Name"}
                      type="text"
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                    {/* Address Input */}
                    <FormMaker
                      type={"text"}
                      name="address"
                      label="Address"
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                    {/* Job input */}
                    <FormMaker
                      type={"text"}
                      name="job"
                      label={"Job"}
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                    {/* Age Input  */}
                    <FormMaker
                      type={"number"}
                      name="age"
                      label={"Age"}
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                    {/* payment amount  */}
                    <FormMaker
                      type={"text"}
                      name="payment"
                      label={"Payment Amount"}
                      style={{ container: "grow", inputField: "customizeForm" }}
                    />
                  </div>

                  {/* phone number */}
                  <div className="md:w-1/2 lg:w-7/12 xl:max-w-sm text-white my-3">
                    <label>Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-0 bottom-0  px-2 border-r h-10 pt-1 pointer-events-none bg-mygreen rounded border-mygreen">
                        +93
                      </span>
                      <Field
                        type="number"
                        name="phonenumber"
                        className="customizeForm ml-10 pl-2"
                      />
                    </div>
                    <ErrorMessage
                      name="phonenumber"
                      render={(msg) => (
                        <span className="text-red-500 font-medium capitalize">
                          {msg}
                        </span>
                      )}
                    />
                  </div>

                  {/* column 2 and payment section   */}
                  <div className="mt-4 gap-4 md:flex lg:block ">
                    <div>
                      {/* sex input  */}
                      {/* //todo this whole div needs refactorization  */}
                      <div className="flex items-center w-full text-white gap-2 my-1 ">
                        <p className="font-semibold">{"Gender:"}</p>
                        <label>Male</label>
                        <Field
                          type="radio"
                          name="sex"
                          value="male"
                          className="check"
                        />
                        <label>Female</label>
                        <Field
                          type="radio"
                          name="sex"
                          value="female"
                          className="check"
                        />
                      </div>
                      <ErrorMessage
                        name="sex"
                        render={(msg) => (
                          <div className="text-red-500 font-medium capitalize">
                            {msg}
                          </div>
                        )}
                      />

                      {/* marital input  */}
                      <div
                        role={"group"}
                        className="flex items-center w-full text-white gap-2 my-2"
                      >
                        <p className=" font-semibold ">{"Marital Status:"}</p>
                        <label>Married</label>
                        <Field
                          type="radio"
                          name="marital"
                          value="married"
                          className="check"
                        />
                        <label>Single</label>
                        <Field
                          type="radio"
                          name="marital"
                          value="single"
                          className="check"
                        />
                      </div>
                      <ErrorMessage
                        name="marital"
                        render={(msg) => (
                          <div className="text-red-500 font-medium capitalize ">
                            {msg}
                          </div>
                        )}
                      />

                      {/* chekcboxes   */}
                      {/* HIV and family secion  */}
                      <h4 className="font-semibold text-white my-1">
                        Hypothesis:
                      </h4>
                      <div className="flex gap-5">
                        {/* "H" family  */}
                        <div className=" flex flex-col  text-white gap-1">
                          <FormMaker
                            type={"checkbox"}
                            name="HIV"
                            label={"HIV"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                          <FormMaker
                            type={"checkbox"}
                            name="HCV"
                            label={"HCV"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                          <FormMaker
                            type={"checkbox"}
                            name="HBS"
                            label={"HBS"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                        </div>

                        {/* diagnosis */}
                        <div className="w-full flex flex-col text-white gap-1">
                          <FormMaker
                            type={"checkbox"}
                            name="pregnancy"
                            label={"Pregnancy"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                          <FormMaker
                            type={"checkbox"}
                            name="diabetes"
                            label={"Diabetes"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                          <FormMaker
                            type={"checkbox"}
                            name="reflux"
                            label={"Reflux Esophagitis"}
                            style={{
                              container: "flex items-center gap-2",
                              inputField: "check rounded",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* text observation  */}
                    <div className="text-white grow  mx-5 lg:mx-0 lg:mt-3 lg:max-w-md ">
                      <label className="font-semibold italic">
                        Observation
                      </label>
                      <Field
                        as="textarea"
                        className="customizeForm h-32"
                        name="observation"
                        placeholder="The Notes by the Doctor..."
                      />
                    </div>
                  </div>
                </div>
                {/*//* Table of operation and Teeth  */}
                <div
                  className={`flex items-center bg-slate-800 md:max-w-2xl lg:max-w-none mx-auto lg:mt-8 lg:flex-wrap xl:grow xl:block lg:mx-2 lg:bg-black  lg:space-y-6`}
                >
                  {/* Operation Table  */}
                  <div className="grow xl:max-w-lg">
                    <OperationOptionsTable
                      chartStyle={{
                        head: "!mx-2 ",
                      }}
                      disabled={false}
                    />
                  </div>
                  <span className="border-r border-gray-400 h-64 lg:hidden" />
                  {/* Tooth chart SVG */}
                  <div className="lg:bg-slate-800 lg:rounded xl:max-w-sm ">
                    <h1 className="text-white p-2 font-semibold text-center capitalize">
                      Hightlight the Teeth needing treatment{" "}
                    </h1>
                    <ToothChart
                      teethStyle={"md:!w-56 lg:!w-64 "}
                      teethIsSelected={teethGraph}
                      selectTeethFunction={selectTeeth}
                    />
                  </div>
                </div>
              </div>
              {/*  button of submission */}
              <div className="flex justify-center lg:justify-start ml-10  h-9 mt-4 mb-8">
                <button
                  type="submit"
                  className="bg-mygreen text-white rounded lg:max-w-sm w-full hover:bg-green-800 hover:font-semibold"
                >
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default RegisterPatient;
