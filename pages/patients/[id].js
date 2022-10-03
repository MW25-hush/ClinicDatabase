import { deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { firestore } from "../../firebase/clientApp";
import { Form, Formik } from "formik";
import ToothChart from "../../components/tooth";
import { toast, ToastContainer } from "react-toastify";
import HeaderSection from "../../components/patientsPageHeader";
import OperationOptionsTable from "../../components/Chart";
import PatientSocial from "../../components/PatientSocialInfoContainer";
import PatientsObservation from "../../components/PatientObsevationComponent";
import PatientsPersonalInfo from "../../components/PersonalInfoComponent";
import PatientsPayment from "../../components/PatientsPaymentComponent";
import { useSession } from "next-auth/react";
import Modal from "../../components/ModalComponent";
import LoadingSpinner from "../../components/loadingComponent";
import Link from "next/link";

const PatientInfo = () => {
  // router object for taking the id of the patient
  const { status } = useSession();
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // patients Information is stored in patientsData
  const [patientData, setPatientData] = useState();
  // the state for wether the profile is on edit mode or not
  const [editActive, setEditStatus] = useState(false);
  // the values of patients Data are initially stored and after modification the modified values will be submitted to the server
  const [afterEditValues, setAfterEditValues] = useState({
    ops: [],
    teethGraph: {},
    name: "",
    last_name: "",
    address: "",
    payment_amount: 0,
    currentPayment: 0,
  });

  useEffect(() => {
    // * GetDoc function for fetching the patients data from firestore
    // at initialLoad the the router is undefined so waiting for the dom to catch the router object
    if (id) {
      const docRef = doc(firestore, "user", id);
      // fetching data from the firestore for single document
      try {
        onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            // fetching data for the Main profile Data
            setPatientData(snapshot.data());
            // Fetching the same data for the updateState to be modified
            setAfterEditValues({
              ...afterEditValues,
              ops: snapshot.data().ops,
              teethGraph: snapshot.data().teethGraph,
              name: snapshot.data().name,
              last_name: snapshot.data().last_name,
              address: snapshot.data().address,
              payment_amount: snapshot.data().payment_amount,
            });
          } else {
            //
            setPatientData("null");
          }
        });
      } catch (e) {
        toast.error(e.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // deletePatient Function
  const deletePatient = () => {
    //* deleteDoc function
    (async function () {
      await deleteDoc(doc(firestore, "user", id))
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

  //* highlighting the the targeted teeth function
  const selectTeeth = (teeth) => {
    setAfterEditValues((prevState) => ({
      ...prevState,
      // updating the chart
      chart: {
        ...prevState.chart,
        [teeth.target.id]: !prevState.chart[teeth.target.id],
      },
    }));
  };

  //* handle update function
  const submitUpdate = (condition) => {
    if (condition === "status") setEditStatus(!editActive);
    if (condition === "update") {
      (async function () {
        await setDoc(doc(firestore, "user", id), {
          ...patientData,
          name: afterEditValues.name,
          last_name: afterEditValues.last_name,
          address: afterEditValues.address,
          ops: afterEditValues.ops,
          teeth: afterEditValues.teethGraph,
        })
          .then(() => setEditStatus(false))
          .catch((e) => {
            toast.error(e.message);
          });
      })();
    }
  };

  const updateOperationTable = (e) => {
    // if the value exists then it will be removed
    if (afterEditValues.ops.includes(e.target.value)) {
      setAfterEditValues({
        ...afterEditValues,
        ops: afterEditValues.ops.filter((op) => op !== e.target.value),
      });
    }
    // if the value does not exist then it will be added
    else {
      afterEditValues?.ops.push(e.target.value);
      setAfterEditValues({ ...afterEditValues, ops: afterEditValues.ops });
    }
  };

  // * paymentFunction Function
  const paymentFunction = () => {
    (async function () {
      await setDoc(doc(firestore, "user", id), {
        ...patientData,
        // todo to add history log here
        recieved_payment: patientData.recieved_payment
          ? parseInt(
              patientData?.recieved_payment + afterEditValues.currentPayment
            )
          : afterEditValues.currentPayment,
      })
        .then(() => {
          toast.success("Successfully Payed");
          // ! not updaing the value of input ;
          setAfterEditValues({ ...afterEditValues, currentPayment: 0 });
        })
        .catch((e) => {
          toast.error(e.message);
        });
    })();
  };

  return status == "unauthenticated" ? (
    <Modal />
  ) : (
    <div className="bg-black min-h-screen overflow-auto flex ">
      <ToastContainer />
      {/* navbar  */}
      <Navbar />
      {/* Profile of Patient */}
      {patientData == undefined ? (
        <LoadingSpinner />
      ) : patientData == "null" ? (
        <div className="text-white mx-auto text-xl my-auto font-bold">
          <h1>The Document Does Not Exist</h1>
          <button className="border-slate-500 border-2 px-2 py-1 rounded mt-2 hover:bg-gray-400 hover:border-0 transition hover:text-black "><Link href={'/patients'}>Back to List</Link></button>
        </div>
      ) : (
        <div className="pt-3 grow ">
          {/*//* the First header  */}
          {/* Header of the page includes the 2 first parts of the page */}
          <HeaderSection
            {...{ editActive, patientData, deletePatient, submitUpdate }}
          />
          <Formik
            initialValues={afterEditValues}
            onSubmit={(values) => console.log(values)}
          >
            <Form>
              {/* patient profile */}
              <div className="2xl:max-w-7xl 2xl:mx-auto">
                {/* photo info and observation  */}
                <div className="flex md:flex-wrap lg:flex-nowrap ">
                  {/* photo  */}
                  <PatientsPersonalInfo
                    {...{
                      editActive,
                      patientData,
                      setAfterEditValues,
                      afterEditValues,
                    }}
                  />
                  {/* Paitents Social and person info  */}
                  <PatientSocial patientData={patientData} />
                  {/* observation  */}
                  <PatientsObservation patientData={patientData} />
                </div>

                {/* //*chart and files */}
                <div className="flex md:flex-wrap lg:flex-nowrap mt-5 ml-10  mr-8">
                  {/* operation  */}
                  <div className="bg-slate-700 rounded flex grow md:mx-auto lg:mx-0 ">
                    {/* chart container */}
                    <OperationOptionsTable
                      chartStyle={{
                        body: "even:bg-black",
                        head: "!border-2 !border-slate-90 !mx-2 !my-12 grow ",
                        table: "h-full  ",
                      }}
                      checked={
                        editActive ? afterEditValues?.ops : patientData?.ops
                      }
                      disabled={!editActive}
                      props={{ onChange: updateOperationTable }}
                    />
                    <div className="border-l m-2 border-gray-500 "></div>
                    {/* //? the width and pointer property for the styling of the tooth component accoding to the needs of the page */}
                    <ToothChart
                      teethStyle={`!w-64 ${
                        editActive
                          ? "pointer-events-auto"
                          : "pointer-events-none"
                      }`}
                      selectTeethFunction={selectTeeth}
                      teethIsSelected={
                        editActive
                          ? afterEditValues?.teethGraph
                          : patientData?.teethGraph
                      }
                    />
                  </div>

                  {/* Payment  */}
                  <PatientsPayment
                    {...{
                      editActive,
                      afterEditValues,
                      patientData,
                      paymentFunction,
                      setAfterEditValues,
                    }}
                  />
                </div>
              </div>
              {/* end of profile  */}
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
