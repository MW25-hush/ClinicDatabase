  import { collection, getDocs } from "firebase/firestore";
  import { Formik } from "formik";
  import Link from "next/link";
  import { useState } from "react";
  import { AiOutlineSearch } from "react-icons/ai";
  import Navbar from "../../components/navbar";
  import { firestore } from "../../firebase/clientApp";

function Search({ patientsList }) {
  // console.log(patientsList);

    const [activePartition,setActivePartition] = useState(false)
    const [filtered,setFiltered] = useState([])
    // todo filter the content in here 
  const handleChange  =  (e) => {
    // check for string length and then display accodingly
    e.target.value.length > 0 ? setActivePartition(true) : setActivePartition(false) 
    
    // filter function
    setFiltered(
      // ? patilentl list returns an array an that array is stored in fitlered
      patientsList.filter((patient) => {
      return  patient.phone_number.toString().includes(e.target.value)
    }))
    
  };
  // console.log(filtered, 'out of the function');


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
          <Formik initialValues={{ id: '' }}  >
            {() => (
              <form>
                <AiOutlineSearch className="bottom-2 absolute" size={24}/>
                <input 
                type={'number'}
                className="pl-10 w-5/12 transition ease-in-out duration-400  placeholder-white placeholder:italic  border-0 border-b-2 border-slate-700 bg-black  focus:border-0 focus:border-b-4 focus:ring-0  focus:border-mygreen  focus:w-9/12 "
                onChange={handleChange}
                name="id"
                placeholder="Enter the id"
                />
              </form>
            )}
          </Formik>
        </div>

        {/* table to show patient list and filtered content */}
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
                    <tbody className={`${activePartition ? 'hidden' : ''}`}>
                        {patientsList?.map((patient,idx) => (
                          <Link key={patient.phone_number} href={`/search/${patient.phone_number}`} passHref>
                           <tr className="text-center hover:bg-mygreen transition" >
                              <td>{idx + 1}</td>
                              <td>{patient.phone_number}</td>
                              <td>{patient.name}</td>
                              <td>{patient.last_name}</td>
                              <td>{patient.payment_amount}</td>
                          </tr>
                          </Link>
                        ))}
                    </tbody>

                          {/* //* for filtering  */}
                    <tbody className={`${activePartition ? '' : 'hidden'} transition`}>
                          {/* filtered content  */}
                          {filtered.length == 0 
                          // ? if not found then show the message 
                                ? 
                                <tr  className="text-center">
                                  <th colSpan={5}>Not Found</th>
                                </tr>
                                : 
                                // ? if there is data then show the data 
                                <>
                                {filtered?.map((patient,idx) => (
                                    <Link key={patient.phone_number} href={`/search/${patient.phone_number}`} passHref>
                                    <tr  className="text-center hover:bg-mygreen transition" >
                                        <td>{idx + 1}</td>
                                        <td>{patient.phone_number}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.last_name}</td>
                                        <td>{patient.payment_amount}</td>
                                    </tr>
                                    </Link>
                                ))}
                                </>
                            }
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
      const patientsCollection = collection(firestore, "user");
      let patientsList = [];
      await getDocs(patientsCollection).then((snapshot) => {
        snapshot.forEach((doc) => {
          patientsList.push({ ...doc.data(), id: doc.id });
        });
      });

      return {
        props: {
          patientsList,
        },
        
      };
    }
