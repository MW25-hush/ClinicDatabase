import { collection, getDocs } from "firebase/firestore";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  AiOutlineIdcard,
  AiOutlineOrderedList,
  AiOutlineSearch,
} from "react-icons/ai";
import CardTypePatientInfo from "../../components/CardTypePatientInformationComponent";
import Modal from "../../components/ModalComponent";
import Navbar from "../../components/navbar";
import PatientInfo from "../../components/patientsInfoTable";
import { firestore } from "../../firebase/clientApp";

function Search({ patientsList, error }) {
  // ! in testing the error variable will have it's place
  const { status } = useSession();

  const [searchMode, setSearchMode] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [typeOfView, setTypeOfView] = useState({ list: true, card: false });

  //? filter the patients using the phone number
  const searchPatientPhoneNumber = (e) => {
    let phoneNumber = e.target.value;
    // check for string length and then display accordingly
    phoneNumber.length > 0 ? setSearchMode(true) : setSearchMode(false);

    // filter function
    setFiltered(
      // ? patientList returns an array an that array is stored in filtered
      patientsList.filter((patient) => {
        return patient.phone_number.toString().includes(phoneNumber);
      })
    );
  };

  // typeofView function
  const handleTypeOfView = (type) => {
    type == "list"
      ? setTypeOfView({ card: false, list: true })
      : setTypeOfView({ card: true, list: false });
  };

  return status == "unauthenticated" ? (
    <Modal />
  ) : (
    <div className="bg-black h-screen flex">
      {/* navbar */}
      <Navbar />

      {/* header */}
      <div className="grow">
        {/* Title */}
        <div className="flex justify-between mx-8 mt-4">
          <div>
            <h1 className="text-white text-3xl font-bold font-serif ">
              Search
            </h1>
          </div>
          {/*List and Card Option View  */}
          <div className="text-white flex gap-4 ">
            <AiOutlineOrderedList
              size={30}
              className={`${
                typeOfView.list && "scale-110 !text-white"
              } text-gray-400`}
              onClick={() => handleTypeOfView("list")}
            />
            <AiOutlineIdcard
              size={30}
              className={`${
                typeOfView.card && "scale-110 !text-white"
              } text-gray-400`}
              onClick={() => handleTypeOfView("card")}
            />
          </div>
        </div>

        {/* input field for search functionality  */}
        <div className="mx-7 mt-28 relative text-white">
          <Formik initialValues={{ id: "" }}>
            {() => (
              <form>
                <AiOutlineSearch className="bottom-2 absolute" size={24} />
                <input
                  type={"number"}
                  className="pl-10 w-5/12 transition ease-in-out duration-400  placeholder-white placeholder:italic  border-0 border-b-2 border-slate-700 bg-black  focus:border-0 focus:border-b-4 focus:ring-0  focus:border-mygreen  focus:w-9/12 "
                  onChange={searchPatientPhoneNumber}
                  name="id"
                  placeholder="Enter the id"
                />
              </form>
            )}
          </Formik>
        </div>

        {/* type: table to show patient list */}
        <div
          className={`text-white border  mx-5 border-slate-600 rounded mt-20 ${
            typeOfView.list ? " block" : "hidden"
          } `}
        >
          <table className="w-full table-auto">
            <thead className="bg-black border-b border-slate-600 ">
              <tr className="">
                <th>No:</th>
                <th>ID</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Payment Amount</th>
              </tr>
            </thead>

            {/* //* All the patients List  */}
            <tbody>
              {/* checking if there is no data and giving message accordingly */}
              {((searchMode && filtered.length == 0) ||
                patientsList?.length == 0) && (
                <tr className="text-center">
                  <th colSpan={5}>The List Is Empty</th>
                </tr>
              )}
              {/* rendering the data by 2 possibilities 1: original data 2: filteredData */}
              {searchMode
                ? // by typing on the input the searchMode is activated thus the filter array will be rendered
                  filtered.map((patient, idx) => (
                    <PatientInfo
                      key={patient.phone_number}
                      patient={patient}
                      idx={idx}
                    />
                  ))
                : // and if the input length is '0' the original data will be rendered
                  patientsList?.map((patient, idx) => (
                    <PatientInfo
                      key={patient.phone_number}
                      patient={patient}
                      idx={idx}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {/* type :  cards to show the patient */}
        <div className="text-white">
          {/* checking if there is no data and giving message accordingly */}
          {((searchMode && filtered.length == 0) ||
            patientsList?.length == 0) && (
            <div className="text-center mt-10 text-xl font-bold">
              <h1>The List is Empty!</h1>
            </div>
          )}
          {/* rendering the data by 2 possibilities 1: original data 2: filteredData */}
          <div
            className={`${
              typeOfView.card ? "flex" : "hidden"
            } gap-3 flex-wrap mt justify-center mt-10`}
          >
            {searchMode
              ? // by typing on the input the searchMode is activated thus the filter array will be rendered
                filtered.map((patient) => (
                  <CardTypePatientInfo
                    key={patient.phone_number}
                    patientName={patient.name}
                    patientLastName={patient.last_name}
                    patientNumber={patient.phone_number}
                  />
                ))
              : // and if the input length is '0' the original data will be rendered
                patientsList?.map((patient) => (
                  <CardTypePatientInfo
                    key={patient.phone_number}
                    patientName={patient.name}
                    patientLastName={patient.last_name}
                    patientNumber={patient.phone_number}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

// ? may be the static function is not approparitate  try the serverside props or render it on the client side

export async function getStaticProps() {
  const patientsCollectionReference = collection(firestore, "user");
  let patientsList = [];
  let error = "";
  try {
    await getDocs(patientsCollectionReference).then((snapshot) => {
      snapshot.forEach((doc) => {
        patientsList.push({ ...doc.data(), id: doc.id });
      });
    });
  } catch (e) {
    error = e.message;
  }

  return {
    props: {
      patientsList,
      error
    },
    revalidate : 1
  };
}
