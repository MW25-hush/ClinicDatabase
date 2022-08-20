import React from 'react'
import { firestore } from '../firebase/clientApp';
import {collection,getDocs} from "@firebase/firestore";
import { useState ,useEffect} from 'react';
import CardMaker from '../components/cardmaker';
import Image from 'next/image';
import loading from '../public/loading.svg'
import {FaRegSadTear} from 'react-icons/fa'
import Navbar from '../components/navbar';


 function Home() {
  const [data, setData] = useState()
  const patientsCollection = collection(firestore,'Patients');

  useEffect(() => {
    getDocs(patientsCollection).then((snapshot) => {
      let patientsList = [];
        snapshot.forEach((doc) => {
          patientsList.push({...doc.data(), id: doc.id})
        })
        setData(patientsList)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 
  if (data !== undefined) return (
    <div className='flex bg-black'>
      {/* //* Navbar */}
         <Navbar />
      {/* list of patients  */}
        <div className=' text-center h-screen grow  '>
          <h1 className='text-black pt-2  text-xl'> <strong>M@W</strong> Clinic Database </h1>
            {/*  //* card section  */}
          <div className='  '>
            {data.length != 0 ?  data.map(info => {<CardMaker/>}) : <h3 className='capitalize font-semibold text-gray-500 py-72 text-2xl'>the list is empty {<FaRegSadTear className='h-10 inline-block pl-1 mb-1'/>} </h3>}
          </div>
        </div>
      </div> )
  
  return( <div className="flex justify-center items-center h-screen"><Image src={loading} className="" alt="spinner"/></div>)
  }
;

export default Home
