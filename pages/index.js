
import { firestore } from '../firebase/clientApp';
import {collection,getDocs} from "@firebase/firestore";
import { useState ,useEffect} from 'react';
import {SearchCircleIcon, PlusCircleIcon , EmojiSadIcon} from '@heroicons/react/outline'
import CardMaker from '../components/cardmaker';
import Image from 'next/image';
import loading from '../public/loading.svg'
import Link from 'next/link';

export default function Home() {
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
    <div className='flex  '>
      {/* //* Navbar */}
      <div className="bg-black text-white h-screen w-3/12 md:w-2/12 lg:w-1/12 p-4 grid content-center pb-44 space-y-4 ">
          <SearchCircleIcon className='h-12 lg:h-16 hover:text-gray-400 '/>
         
         <Link href={'/register'} passHref>
          <PlusCircleIcon className='h-12 lg:h-16 hover:text-gray-400 '/>
         </Link>

      </div>

      {/* list of patients  */}
        <div className=' text-center h-screen  grow    '>
          <h1 className='text-black pt-2  text-xl'> <strong>M@W</strong> Clinic Database </h1>
            {/*  //* card section  */}
          <div className='  '>
            {data.length != 0 ?  data.map(info => {<CardMaker/>}) : <h3 className='capitalize font-semibold text-gray-500 py-72 text-2xl'>the list is empty {<EmojiSadIcon className='h-10 inline-block pl-1 mb-1'/>} </h3>}
          </div>
        </div>
      </div> )
  
  return( <div className="flex justify-center items-center h-screen"><Image src={loading} className="" alt="spinner"/></div>)
  
}
