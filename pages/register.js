   
   
   import React from 'react'
      import InputMaker from '../components/inputMaker'
      import Table from '../components/Chart';
      import { Field, Form, Formik } from 'formik';

      const initialValues = {
          name : '',
          sex: ''
      }

    function register() {
      return (
        <div >
            <h1 className='pl-7 py-4 font-bold text-2xl'>Registration Form</h1>
                {/* //* card for the registration form  */}
               <Formik initialValues={initialValues} >
                <Form>
            <div className='grid grid-cols-8 mx-7'>
                <div className='flex col-span-5 flex-wrap   '>
                  {/* //? Name input  */}
                      <div>
                        <label className=''>Name</label>
                        <Field type="text" name='name' className="customizeForm" />
                        </div>
                           {/* //? Last Name input  */}
                        <div>
                        <label>last Name</label>
                        <Field type='text' name="lastname" className="customizeForm"/>
                        </div>
                       {/* Age Input  */}
                        <div className='w-28'>
                          <label>Age</label>
                          <Field type='number' name="age" className="customizeForm"/>
                          </div>

                        {/* Job input */}
                        <div>
                          <label>Job</label>
                          <Field type='text' name="job" className="customizeForm"/>
                        </div>
                         {/* sex input  */}
                         <div className='flex items-center w-full'>
                          <p className=' px-2 font-semibold '>{'Gender:'}</p>
                          {/* //TODO: TAKE THE APPEARANCE OF THE RADION BUTTON FROM IT  */}
                          <label>Male</label>
                         <Field type='radio' name="sex" value="male" className="text-black focus:ring-0"/> 
                         <label>Female</label>
                         <Field type='radio' name="sex" value="female" className="text-black focus:ring-0"/> 
                         </div>

                         {/* Address Input */}
                         <div>
                         <label>Address</label>
                         <Field type='text' name="address"  className="customizeForm"/>
                         </div>
                        
                        {/* phone number  //todo add the prefex  */}
                        <div>
                        <label>Phone Number</label>
                        <Field type='number' name='number'  className="customizeForm" />
                        </div>
                        
                        {/* chekcboxes   */}
                          {/* HIV and family secion  */}
                        <h4 className='font-semibold p-2 w-full '>Hypothesis: </h4>
                        <div className='w-full flex space-x-3'>
                          <div className='flex items-center space-x-1 '>
                          <label>HIV</label>
                          <Field type='checkbox' name='HIV' className="rounded text-black focus:ring-0" />
                          </div>
                         <div className='flex items-center space-x-1'>
                          <label>HCV</label>
                          <Field type='checkbox' name='HCV' className="rounded text-black focus:ring-0" />
                         </div>

                         <div className='flex items-center space-x-1'>
                         <label>HBS</label>
                          <Field type='checkbox' name='HBS' className="rounded text-black focus:ring-0" />
                         </div>

                        </div>
                       
                       {/* diagnois */}
                        <div className='w-full flex'>
                        <div className='flex items-center space-x-1'>
                         <label>pregnancy</label>
                          <Field type='checkbox' name='HBS' className="rounded text-black focus:ring-0" />
                         </div>

                         <div className='flex items-center space-x-1'>
                         <label>diabetes</label>
                          <Field type='checkbox' name='HBS' className="rounded text-black focus:ring-0" />
                         </div>
                        </div>

                        </div>
                      
              {/* chart section  */}
                      <Table />

            </div>
            </Form>
                </Formik>
        </div>
      )
    }
    
    export default register