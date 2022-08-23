   
   
      import React, { useState } from 'react'
      import Table from '../components/Chart';
      import { ErrorMessage, Field,Form, Formik } from 'formik';
      import Navbar from '../components/navbar'
      import Tooth from '../components/tooth'
      import {IoChevronBackOutline} from 'react-icons/io5'
      import * as Yup from 'yup'
      import {doc, setDoc} from 'firebase/firestore'
      import { firestore } from '../firebase/clientApp';

    const checkbox = [
  { label: "Tooth Filling", value: "toothfilling", name: "checkbox" },
  { label: "Orthodantic", value: "orthodancy", name: "checkbox" },
  { label: "Implant", value: "implant", name: "checkbox" },
  { label: "Crown", value: "crown", name: "checkbox" },
  { label: "Bleaching", value: "bleaching", name: "checkbox" },
  { label: "Prosthesis", value: "prosthesis", name: "checkbox" },
];

      const initialValues = {
          name : '',
          lastname: '',
          address: '', 
          job: '',
          age: '',
          phonenumber: '',
          payment: '', 
          sex: '',
          marital : '',
          HIV :false,
          HCV: false, 
          HBS: false, 
          pregnancy: false, 
          diabetes: false, 
          reflux: false, 
          observation: '',
          ops : []
       
      }
          //todo validate the checkboxes and how to do it with yup and radio buttons 
     const validationSchema = Yup.object().shape({
          name : Yup.string().required('You need to fill this filed'),
          lastname : Yup.string().required('You need to fill this filed'),
          address : Yup.string().required('You need to fill this filed'),
          age: Yup.string().required('You need to fill this field'),
          phonenumber : Yup.string().length(9, 'please enter the 9 digits of your phone number').required('You need to fill this field'),
          payment : Yup.string().required('You need to fill this field'),
          sex : Yup.string().oneOf(['male','female']).required('You should select a gender'),
          marital : Yup.string().oneOf(['married', 'single']).required('you should select one option'),
          ops : Yup.array().required('Required')
     }) 

     

      function Register() {
         const [active,setActive] = useState({infoActive: true, chartActive: false})
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
            let temp = data.target.id
            setChecked({...checked , [temp] : !checked[temp] })
        };

         const handleClick = type => {
          if(type == 'info') setActive({infoActive : true, chartActive : false})
          if(type == 'chart') setActive({infoActive : false , chartActive : true})
        }

       

        const handleSubmit = (values,{resetForm}) => {
          console.log(values);
          // * todo the submit functionality 
            // setDoc(doc(firestore,"user", values.phonenumber.toString()),{
            //    name : values.name,
            //    last_name  :values.lastname,
            //    address: values.address,
            //    age : values.age,
            //    phone_number : values.phonenumber,
            //    payment_amount : values.payment,
            //    job : values.job,
            //    sex : values.sex , 
            //    marital : values.marital, 
            //    hiv : values.HIV,
            //    hcv : values.HCV,
            //    hbs : values.HBS,
            //    pregnancy : values.pregnancy,
            //    diabetes : values.diabetes ,
            //    reflux : values.reflux,
            //    observation : values.observation ,
            //    ops : values.checkbox,
            //    chart  : checked


            // })
            // // todo to find the response property out of the firestore 
            // .then(res => console.log(res))
          
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
               <Formik  initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>

                  {/* //*  info section  */}
                  <div className={`grid grid-cols-2 mx-7 ${active.infoActive ? 'block' : 'hidden'}`}>
                   <div className='flex col-span-1 flex-wrap gap-4 ml-2 mr-10 xl:ml-0 xl:mr-0'>
                
                    {/* //? Name input  */}
                        <div className='grow'>
                          <label className='text-white'>Name</label>
                          <Field type="text" name='name' className="customizeForm" />
                          <ErrorMessage name='name'  render={msg => <div className='text-red-500 font-medium capitalize'>{msg}</div>}/>
                        </div>
                        
                            {/* //? Last Name input  */}
                          <div className='grow'>
                          <label className='text-white'>last Name</label>
                          <Field type='text' name="lastname" className="customizeForm"/>
                          <ErrorMessage name='lastname'  render={msg => <div className='text-red-500 font-medium capitalize'>{msg}</div>}/>
                          </div>
                          {/* Address Input */}
                          <div className='text-white grow xl:w-96 '>
                            <label>Address</label>
                            <Field type='text' name="address" className="customizeForm"/>
                          <ErrorMessage name='address'  render={msg => <div className='text-red-500 font-medium capitalize'>{msg}</div>}/>
                            </div>

                          {/* Job input */}
                          <div className='text-white grow xl:w-80'>
                            <label>Job</label>
                            <Field type='text' name="job" className="customizeForm"/>
                          </div>

                        {/* Age Input  */}
                          <div className='text-white w-44'>
                          <label>Age</label>
                          <Field type='number' name="age"  className="customizeForm"/>
                          <ErrorMessage name='age'  render={msg => <div className='text-red-500 font-medium capitalize'>{msg}</div>}/>
                          </div>
                          
                          {/* phone number */}
                            <div className='text-white md:w-72 lg:w-96 '>
                              <label>Phone Number</label>
                              <div className='relative'>
                              <span className='absolute left-0 bottom-0  px-2 border-r h-10 pt-1 pointer-events-none bg-mygreen rounded border-mygreen'>+93</span>
                              <Field type='number' name='phonenumber'  className="customizeForm ml-10 pl-2" />
                             </div>
                              <ErrorMessage name='phonenumber'  render={msg => <span className='text-red-500 font-medium capitalize'>{msg}</span>}/>
                            </div>

                          {/* payment amount  */}
                          <div className='text-white xl:w-80'>
                              <label  className='font-semibold '>Payment Amount</label>
                              <Field type="text" name="payment" className="customizeForm  "/>
                              <ErrorMessage name='payment'  render={msg => <div className='text-red-500 font-medium capitalize'>{msg}</div>}/>
                          </div>

                          </div>

                          {/* column 2 and payment section   */}
                              <div className='col-span-1 space-y-5 xl:ml-16 xl:mt-3'>
                                
                                 {/* sex input  */}
                                  <div className='flex items-center w-full text-white gap-2'>
                                  <p className=' font-semibold '>{'Gender:'}</p>
                                  <label>Male</label>
                                  <Field type='radio' name="sex" value="male" className="check" /> 
                                  <label>Female</label>
                                  <Field type='radio' name="sex" value="female" className="check" /> 
                                  </div>
                                  <ErrorMessage name='sex' render={msg => <div className="text-red-500 font-medium capitalize">{msg}</div>} />

                              {/* marital input  */}
                                <div role={'group'} className='flex items-center w-full text-white gap-2'>
                                <p className=' font-semibold '>{'Marital Status:'}</p>
                                <label>Married</label>
                                <Field type='radio' name="marital" value="married" className="check" />
                                <label>Single</label>
                                <Field type='radio' name="marital" value="single" className="check" />
                                </div>
                                <ErrorMessage name='marital' render={msg => <div className="text-red-500 font-medium capitalize ">{msg}</div>} />

                          
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

                        {/* diagnosis */}
                          <div className='w-full flex flex-col text-white gap-1'>
                          <div className='flex items-center gap-2'>
                          <label>Pregnancy</label>
                            <Field type='checkbox' name='pregnancy' className="rounded check" />
                          </div>

                          <div className='flex items-center gap-2'>
                          <label>Diabetes</label>
                            <Field type='checkbox' name='diabetes' className="rounded check"/>
                          </div>

                          <div className='flex items-center gap-2'>
                          <label>Reflux Esophagitis</label>
                            <Field type='checkbox' name='reflux' className="rounded check"/>
                          </div>

                        </div>
                      </div>

                            {/* text observation  */}
                          <div className='text-white w-96'>
                            <label className='font-semibold italic'>Observation</label>
                            <Field as="textarea" className="customizeForm h-24 " name="observation"/>
                            </div>
                           </div>
                       </div>

                       {/* button for next  */}
                          <div className={`flex justify-end md:mx-16 xl:mx-36 2xl:mx-64 ${active.infoActive ? 'block' : 'hidden'}`}>
                          <button type='button' onClick={() => handleClick('chart')} className=' bg-mygreen text-white rounded h-9 w-64 xl:w-96  hover:bg-green-800 hover:font-semibold'>Next</button>
                          </div>
                              {/* //! end of info part */}

                          <div className={`${active.chartActive ? 'block' : 'hidden'} grid grid-cols-2`}>

                                <div className='col-span-1'>
                                  {/* Back button  */}
                                    <button type='button' onClick={() => handleClick('info')} className= 'border-2 border-mygreen hover:bg-mygreen text-white rounded w-20 h-8 xl:w-24 ml-8 md:mb-5  hover:font-semibold'>
                                     <IoChevronBackOutline className='inline-block' size={20}/>
                                      Back
                                    </button>

                                  {/* table  */}
                                            <Table/>
                                </div>
                                  {/* chart part d */}
                                <div className='col-span-1'>
                                   <Tooth checked={checked} handleClickSvg={handleClickSvg} />
                                </div>
                                   <button type='submit' className='bg-mygreen text-white rounded col-span-2 h-8 w-5/12  xl:w-1/3 2xl:w-5/12 mx-72 xl:mx-80  mt-1 xl:mt-20 hover:bg-green-800 hover:font-semibold'>Save</button>
                          </div>

                     </Form>
                </Formik>
              </div>

            </div>
           
        </div>
      )
    }
    
    export default Register