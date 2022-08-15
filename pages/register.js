      import React from 'react'
      import InputMaker from '../components/inputMaker'
      import Table from '../components/Chart';

    function register() {
      return (
        <div >
            <h1 className='pl-7 py-4 font-bold text-2xl'>Registration Form</h1>
                {/* //* card for the registration form  */}
               <form >
            <div className='grid grid-cols-8 mx-7'>
                <div className='flex col-span-5 flex-wrap md:w-10/1  xl:w-11/12   '>
                  {/* //? Name input  */}
                        <InputMaker type="text" name='name'  label="Name" styling={{labelStyling: 'block' , size: ' lg:w-60 xl:w-80'}}/>
                           {/* //? Last Name input  */}
                        <InputMaker type='text' name="lastname"  label="Last Name" styling={{labelStyling: 'block' , size: ' lg:w-60  xl:w-80'}}/>
                       {/* Age Input  */}
                          <InputMaker type='number' name={'age'}  label="Age" styling={{labelStyling: 'block' , size: '   ' }}/>
                        {/* Job input */}
                         <InputMaker type='text' name="job"  label="Job"  styling={{labelStyling: 'block' , size: ' '}}/>
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
                        <h4 className='font-semibold p-2 w-full '>Hypothesis: </h4>
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

                        </div>
                      
              {/* chart section  */}
                      <Table />

            </div>
                </form>
        </div>
      )
    }
    
    export default register