import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Navbar from "../components/navbar";
import Tooth from "../components/tooth";
import { IoChevronBackOutline } from "react-icons/io5";
import * as Yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import Chart from "../components/Chart";
import FormMaker from "../components/registerFormValue";

// ! This whole page needs refactorization

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

function Register() {
  // the state for the two links in the page 1 info 2 chart
  const [active, setActive] = useState({
    infoActive: true,
    chartActive: false,
  });
  //  the state of the teeth
  const [checked, setChecked] = useState({
    OneTr: false,
    TwoTr: false,
    ThreeTr: false,
    FourTr: false,
    FiveTr: false,
    SixTr: false,
    SevenTr: false,
    EightTr: false,
    OneTl: false,
    TwoTl: false,
    ThreeTl: false,
    FourTl: false,
    FiveTl: false,
    SixTl: false,
    SevenTl: false,
    EigthTl: false,
    OneBr: false,
    TwoBr: false,
    ThreeBr: false,
    FourBr: false,
    FiveBr: false,
    SixBr: false,
    SevenBr: false,
    EightBr: false,
    OneBl: false,
    TwoBl: false,
    ThreeBl: false,
    FourBl: false,
    FiveBl: false,
    SixBl: false,
    SevenBl: false,
    EightBl: false,
  });

  const handleClickSvg = (data) => {
    let temp = data.target.id;
    setChecked({ ...checked, [temp]: !checked[temp] });
  };

  const handleSubmit = (values, { resetForm }) => {
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
      chart: checked,
    })
      // todo to find the response property out of the firestore
      .then((res) => console.log(res));
  };

  return (
    <div className="bg-black flex min-h-screen overflow-auto">
      {/* navbar */}
      <Navbar />

      {/* //* registration form  */}
      <div className=" md:w-full 2xl:w-auto 2xl:m-auto ">
        <h1 className="text-white md:text-2xl xl:text-3xl font-bold p-2 m-2">
          Registration Form
        </h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form >
            <div className="lg:flex">
            {/* //*  info section  */}
            <div className={`m-8 lg:m-4`}>
              <div className="flex flex-wrap gap-2 lg:max-w-4xl ">
                {/* //? Name input  */}
                <div className="grow">
                  <FormMaker name={"name"} type="text" label={"Name"} />
                </div>

                {/* //? Last Name input  */}
                <div className="grow">
                  <FormMaker name="lastname" label={"Last Name"} type="text" />
                </div>
                {/* Address Input */}
                <div className="grow">
                  <FormMaker type={"text"} name="address" label="Address" />
                </div>

                {/* Job input */}
                <div className="grow">
                  <FormMaker type={"text"} name="job" label={"Job"} />
                </div>

                {/* Age Input  */}
                <div className="grow">
                  <FormMaker type={"number"} name="age" label={"Age"} />
                </div>

                {/* payment amount  */}
                <div className="grow">
                  <FormMaker
                    type={"text"}
                    name="payment"
                    label={"Payment Amount"}
                  />
                </div>
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
                  <h4 className="font-semibold text-white my-1">Hypothesis:</h4>
                  <div className="flex gap-5">
                    {/* "H" family  */}
                    <div className=" flex flex-col  text-white gap-1">
                      <div className="flex items-center gap-2 ">
                        <label>HIV</label>
                        <Field
                          type="checkbox"
                          name="HIV"
                          className="rounded check"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>HCV</label>
                        <Field
                          type="checkbox"
                          name="HCV"
                          className="rounded check "
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label>HBS</label>
                        <Field
                          type="checkbox"
                          name="HBS"
                          className="check rounded"
                        />
                      </div>
                    </div>

                    {/* diagnosis */}
                    <div className="w-full flex flex-col text-white gap-1">
                      <div className="flex items-center gap-2">
                        <label>Pregnancy</label>
                        <Field
                          type="checkbox"
                          name="pregnancy"
                          className="rounded check"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label>Diabetes</label>
                        <Field
                          type="checkbox"
                          name="diabetes"
                          className="rounded check"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label>Reflux Esophagitis</label>
                        <Field
                          type="checkbox"
                          name="reflux"
                          className="rounded check"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* text observation  */}
                <div className="text-white grow  mx-5 lg:mx-0 lg:mt-3 lg:max-w-md ">
                  <label className="font-semibold italic">Observation</label>
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
              className={`flex items-center  bg-slate-800 md:max-w-2xl lg:max-w-none mx-auto lg:mt-8 lg:flex-wrap xl:grow xl:block lg:mx-2 lg:bg-black  lg:space-y-6`}
            >
              {/* table  */}
              <div className="grow xl:max-w-lg ">
                <Chart
                  chartStyle={{
                    body: "",
                    head: "!mx-2",
                    table: "",
                  }}
                  disabled={false}
                />
              </div>
              <span className="border-r border-gray-400 h-64 lg:hidden"></span>
              {/* Tooth chart SVG */}
              <div className="lg:bg-slate-800 lg:rounded xl:max-w-sm ">
                <h1 className="text-white p-2 font-semibold text-center capitalize ">
                  Hightlight the Teeth needing treatment{" "}
                </h1>
                <Tooth
                  toothStyle={"md:!w-56 lg:!w-64 "}
                  checked={checked}
                  handleClickSvg={handleClickSvg}
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
    </div>
  );
}

export default Register;
