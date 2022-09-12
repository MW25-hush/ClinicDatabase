import { collection, getDocs } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Navbar from "../../components/navbar";
import PatientInfo from "../../components/patientsInfoTable";
import { firestore } from "../../firebase/clientApp";

//! can realtime database be used with the getstaticprops or with getServersideProps

function Search({ patientsList, error }) {
  // ! in testing the error variable will have it's place

  const [searchMode, setSearchMode] = useState(false);
  const [filtered, setFiltered] = useState([]);

  //? filter the patients using the phone number
  const searchPatientPhoneNumber = (e) => {
    let phoneNumber = e.target.value
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

  return (
    <div className="bg-black h-screen flex">
      {/* navbar */}
      <Navbar />

      {/* header */}
      <div className="grow">
        <h1 className="text-white text-3xl font-bold font-serif pt-10 px-8">
          Search
        </h1>

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

        {/* table to show patient list */}
        <div className="text-white border  mx-5 border-slate-600 rounded mt-20">
          <table className="w-full table-auto ">
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
              {(filtered.length == 0 ?? patientsList.length == 0) && (
                <tr className="text-center">
                  <th colSpan={5}>Not Found</th>
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
      </div>
    </div>
  );
}

export default Search;

// todo may be the static function is not approparitate  try the serverside props or render it on the client side

          export async function getStaticProps() {
            const patientsCollectionReference = collection(firestore, "user");
            let patientsList = [];
            let error = "";
            try {
              await getDocs(patientsCollectionReference).then((snapshot) => {
                snapshot.forEach((doc) => {
                  patientsList.push({ ...doc.data(), id: doc.id });
                  console.log(doc);
                });
              });
              // console.log(patientsList);
            } catch (e) {
              error = e.message;
            }

            return {
              props: {
                patientsList,
              },
            };
          }
// add registry date to paylog
// making 2 kinds of view option for the patient list 1 table 2 card
// refactor the code tonight
// adding the authentication
// testing the application
// makikng the pre-requirements for the dashboard page and calender page
