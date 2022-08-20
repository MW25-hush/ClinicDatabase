   
   
      import React, { useState } from 'react'
      import Table from '../components/Chart';
      import { Field,Form, Formik } from 'formik';
      import Navbar from '../components/navbar'
      import Tooth from '../components/tooth'
      import {IoChevronBackOutline} from 'react-icons/io5'
      const initialValues = {
          name : '',
          sex: ''
      }

      function Register() {
         const [active,setActive] = useState({infoActive: true, chartActive: false})

         const handleClick = type => {
          if(type == 'info') setActive({infoActive : true, chartActive : false})
          if(type == 'chart') setActive({infoActive : false , chartActive : true})
        }
        
      return (
        <div className='bg-black flex h-screen ' >
            {/* navbar */}
            <Navbar/>

            <div className='w-full'>
                  {/* links for the two pages  */}
                        <div className='text-white text-center space-x-9 text-xl pt-5 pb-10'>
                          <span onClick={() => handleClick('info')} className={`${active.infoActive ? 'underline decoration-mygreen underline-offset-4 ' : ''} cursor-default`}>Info</span>
                          <span onClick={() => handleClick('chart')} className={`${active.chartActive ? 'underline decoration-mygreen underline-offset-4 ' : ''} cursor-default`}>Chart</span>
                        </div>

                  <div>
                {/* //* registration form  */}
               <Formik initialValues={initialValues} >
                <Form>

                  {/* //*  info section  */}
                  <div className={`grid grid-cols-2 mx-7 grid-rows-1 ${active.infoActive ? 'block' : 'hidden'}`}>
                   <div className='flex col-span-1 flex-wrap gap-4'>
              
                  {/* //? Name input  */}
                      <div className='grow'>
                        <label className='text-white'>Name</label>
                        <Field type="text" name='name' className="customizeForm" />
                      </div>
                       
                           {/* //? Last Name input  */}
                        <div className='grow'>
                        <label className='text-white'>last Name</label>
                        <Field type='text' name="lastname" className="customizeForm"/>
                        </div>
                       {/* Age Input  */}
                        <div className='text-white grow '>
                          <label>Address</label>
                          <Field type='text' name="address" className="customizeForm"/>
                          </div>

                        {/* Job input */}
                        <div className='text-white xl:w-80'>
                          <label>Job</label>
                          <Field type='text' name="job" className="customizeForm"/>
                        </div>

                         {/* Address Input */}
                         <div className='text-white w-44'>
                         <label>Age</label>
                         <Field type='number' name="address"  className="customizeForm"/>
                         </div>
                        
                        <div className='text-white relative  '>
                        <label>Phone Number</label>
                        <span className='absolute xl:left-0 xl:bottom-0 xl:px-2 border-r xl:h-10 xl:pt-1 pointer-events-none bg-mygreen rounded border-mygreen'>+93</span>
                        <Field type='number' name='number'  className="customizeForm xl:ml-10 pl-2 " />
                        </div>

                         {/* sex input  */}
                         <div className='flex items-center w-full text-white gap-2'>
                          <p className=' font-semibold '>{'Gender:'}</p>
                          <label>Male</label>
                         <Field type='radio' name="sex" value="male" className="check"/> 
                         <label>Female</label>
                         <Field type='radio' name="sex" value="female" className="check"/> 
                         </div>

                            {/* sex input  */}
                            <div className='flex items-center w-full text-white gap-2'>
                          <p className=' font-semibold '>{'Marital Status:'}</p>
                          <label>Married</label>
                         <Field type='radio' name="marital" value="married" className="check"/> 
                         <label>Single</label>
                         <Field type='radio' name="marital" value="single" className="check"/> 
                         </div>

                        
                        {/* chekcboxes   */}
                          {/* HIV and family secion  */}
                        <h4 className='font-semibold text-white '>Hypothesis: </h4>
                        <div className='flex w-full gap-5'>
                          {/* "H" family  */}
                        <div className=' flex flex-col  text-white gap-1'>
                          <div className='flex items-center gap-2 '>
                          <label>HIV</label>
                          <Field type='checkbox' name='HIV' className="rounded check "/>
                          </div>
                         <div className='flex items-center gap-2 '>
                          <label>HCV</label>
                          <Field type='checkbox' name='HCV' className="rounded check "/>
                         </div>

                         <div className='flex items-center gap-2 '>
                         <label>HBS</label>
                          <Field type='checkbox' name='HBS' className="check rounded" />
                         </div>
                         {/*  */}
                        </div>

                       {/* diagnois */}
                        <div className='w-full flex flex-col text-white gap-1'>
                        <div className='flex items-center gap-2'>
                         <label>Pregnancy</label>
                          <Field type='checkbox' name='HBS' className="rounded check" />
                         </div>

                         <div className='flex items-center gap-2'>
                         <label>Diabetes</label>
                          <Field type='checkbox' name='HBS' className="rounded check"/>
                         </div>

                         <div className='flex items-center gap-2'>
                         <label>Reflux Esophagitis</label>
                          <Field type='checkbox' name='HBS' className="rounded check"/>
                         </div>

                        </div>
                      </div>

                        </div>

                        {/* column 2 and payment section   */}
                            <div className='col-span-1 space-y-5'>
                                      <div className='text-white xl:ml-16 xl:w-80'>
                                        <label  className='font-semibold '>Payment Amount</label>
                                        <Field type="text" name="payment" className="customizeForm "/>
                                      </div>

                                      <div className='text-white w-96 xl:ml-16'>
                                        <label className='font-semibold italic'>Observation</label>
                                        <Field as="textarea" className="customizeForm h-24" name="observation"/>
                                      </div>

                                      <button onClick={() => handleClick('chart')} className='bg-mygreen text-white rounded w-20 h-8 xl:w-24  xl:ml-80 xl:!mt-40 hover:bg-green-800 hover:font-semibold'>Next</button>
                            </div>
                         </div>
                              {/* //! end of info part */}

                          <div className={`${active.chartActive ? 'block' : 'hidden'} grid grid-cols-2`}>

                                <div className='col-span-1'>
                                  {/* Back button  */}
                                    <button onClick={() => handleClick('info')} className='border-2 border-mygreen hover:bg-mygreen text-white rounded w-20 h-8 xl:w-24  xl:ml-8  hover:font-semibold'>
                                     <IoChevronBackOutline className='inline-block' size={20}/>
                                      Back
                                      </button>

                                  {/* table  */}
                                      <Table/>
                                </div>
                                  {/* chart part d */}
                                <div className='col-span-1'>
                                   <Tooth />
                                   <button type='submit' className='bg-mygreen text-white rounded w-20 h-8 xl:w-5/12 xl:ml-10 mt-10 hover:bg-green-800 hover:font-semibold'>Save</button>
                                </div>
                          </div>

                     </Form>
                </Formik>
              </div>

            </div>
           
        </div>
      )
    }
    
    export default Register