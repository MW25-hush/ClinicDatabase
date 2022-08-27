import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import { firestore } from "../../firebase/clientApp"
import { BsPerson,} from 'react-icons/bs'
import { Field, Formik } from "formik"
import {AiOutlinePlus, AiOutlineSearch} from 'react-icons/ai'
import { MdArrowForwardIos} from 'react-icons/md'
import {ImPrinter} from 'react-icons/im'
import {BiEdit} from 'react-icons/bi'

const Patient =  () => {
  const router = useRouter();
  const [data,setData] =  useState()
  
  
    useEffect(()  =>  {
       async function fetch (){
      if(router.query.id){
        const docRef =  doc(firestore,'user',router.query.id);
        const docSnap = await getDoc(docRef)
         if (docSnap.exists()) {
           setData(docSnap.data())
          //  console.log("Document data:", docSnap.data());
            console.log(data);
        } else {
           // doc.data() will be undefined in this case
           setData(undefined)
         }
       }
     }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  return (
    <div className="bg-black h-screen flex">
      {/* navbar  */}
        <Navbar/>
          {/* profile  */}
          <div className="w-full px-10 pt-3">
          {/* the First header  */}
              <div className="flex text-white w-full justify-between ">
                {/* name and avatar */}
                <div className="flex items-center gap-4">
                <BsPerson size={35} className="text-slate-400"/>
                 <span className="text-lg ">{data?.name}{data?.last_name}</span>
                </div>

                {/* search input and add button  */}
                <div className="flex gap-4 items-center relative">
                      <Formik initialValues={{search : ''}} onSubmit>
                        <form>
                          <AiOutlineSearch size={20} className="absolute bottom-2 left-4"/>
                          <Field type="number" className="customizeForm bg-slate-800 rounded-2xl pl-10 w-52" name="search" placeholder="Search" />
                        </form>
                      </Formik>
                        <div className="border-2 border-mygreen rounded-full hover:bg-mygreen  p-1.5">
                        <AiOutlinePlus size={25}/>
                        </div>
                  </div>
              </div>
              <hr className="my-4 border-0 border-b border-slate-600"/>
              {/* patient link and update button  */}
              <div className="flex justify-between  ">
                {/* patient list and name  */}
                  <div className="mt-2 flex gap-3 items-center">
                    <span className="text-white t">Patient List</span>
                    <MdArrowForwardIos className="text-slate-600" size={25}/>  
                    <span className="text-slate-400">{data?.name}{data?.last_name}</span>
                  </div>

                    {/* printer and update button  */}
                  <div className="flex gap-4"> 
                  <div className="bg-slate-400 p-1.5 hover:text-slate-300">
                      <ImPrinter size={25} className="text-whit" />
                  </div>
                      <div className="flex rounded border gap-2 items-center p-1 hover:bg-black">
                         <BiEdit size={20} className="text-white"/>
                          <span className="text-white">Edit Patient</span>
                      </div>  
                  </div>

              </div>

          </div>

    </div>
  )
}

export default Patient