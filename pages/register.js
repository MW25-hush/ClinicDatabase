      import React from 'react'
      import InputMaker from '../components/inputMaker'
      import Table from '../components/Chart'
      import ToothPopUpModal from '../components/toothPopUpModal';

    function register() {
      return (
        <div >
            <h1 className='text-center py-2 font-bold text-2xl'>Registration Form</h1>
                {/* //* card for the registration form  */}
            <div className='bg-gray-200 h-3/4 w-10/12 shadow-md mx-auto mt-8 grid grid-cols-8'>
               <form className='flex col-span-5 flex-wrap '>
                  {/* //? Name input  */}
                        <InputMaker type="text" name='name'  label="Name" styling={{labelStyling: 'block' , size: 'lg:w-72'}}/>
                           {/* //? Last Name input  */}
                        <InputMaker type='text' name="lastname"  label="Last Name" styling={{labelStyling: 'block' , size: 'lg:w-72'}}/>
                       {/* Age Input  */}
                          <InputMaker type='number' name={'age'}  label="Age" styling={{labelStyling: 'block' , size: 'w-48' }}/>
                        {/* Job input */}
                         <InputMaker type='text' name="job"  label="Job"  styling={{labelStyling: 'block' , size: 'w-64'}}/>
                         {/* sex input  */}
                         <div className='flex items-center w-full '>
                          <p className=' px-2 font-semibold '>{'Gender:'}</p>
                          {/* //TODO: TAKE THE APPEARANCE OF THE RADION BUTTON FROM IT  */}
                         <InputMaker type='radio' name="sex" label={'Male'}  styling={{labelStyling: ' p-2 ' , size: 'p-2  text-indigo-600 ' }}/> 
                         <InputMaker type='radio' name="sex" label={'Female'} styling={{labelStyling: ' p-2 ' , size: 'p-2 text-indigo-600'}}/> 
                         </div>

                         {/* Address Input */}
                         <InputMaker type='text' name="address"  label="Address"  styling={{labelStyling: 'block' , size: 'w-72'}}/>
                        
                        {/* phone number  //todo add the prefex  */}
                        <InputMaker type='number' name='number'  label="Phone Number" styling={{labelStyling: 'block' , size: 'w-72' }}/>
                        
                        {/* chekcboxes   */}
                          {/* HIV and family secion  */}
                        <h4 className='font-semibold p-2 w-full '>Diagnosis: </h4>
                        <div className='w-full flex'>
                          <InputMaker type='checkbox' name='HIV'  label="HIV" styling={{labelStyling: 'p-2' , size: 'p-2 text-indigo-500' }}/>
                          <InputMaker type='checkbox' name='HCV'  label="HCV" styling={{labelStyling: 'p-2' , size: 'p-2 text-indigo-500' }}/>
                          <InputMaker type='checkbox' name='HBS'  label="HBS" styling={{labelStyling: 'p-2' , size: 'p-2 text-indigo-500' }}/>
                        </div>
                       
                       {/* diagnois */}
                        <div className='w-full flex'>
                          <InputMaker type='checkbox' name='pregnancy'  label="Pregnancy" styling={{labelStyling: 'p-2' , size: 'p-2 text-indigo-500' }}/>
                          <InputMaker type='checkbox' name='diabetes'  label="Diabetes" styling={{labelStyling: 'p-2' , size: 'p-2 text-indigo-500' }}/>
                        </div>
                </form>

              {/* chart section  */}
              <Table />

              <ToothPopUpModal />

            </div>
        </div>
      )
    }
    
    export default register