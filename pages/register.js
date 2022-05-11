    import React from 'react'
    import InputMaker from '../components/inputMaker'


    function register() {
      return (
        <div >
            <h1 className='text-center py-2 font-bold text-2xl'>Registration Form</h1>
                {/* //* card for the registration form  */}
            <div className='bg-gray-200 h-3/4 w-10/12 shadow-md mx-auto mt-8 grid grid-cols-7'>
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
                          <p className=' px-2 '>{'Gender:'}</p>
                          {/* //TODO: TAKE THE APPEARANCE OF THE RADION BUTTON FROM IT  */}
                         <InputMaker type='radio' name="sex" label={'Male'}  styling={{labelStyling: ' p-2 ' , size: 'p-2  text-indigo-600 ' }}/> 
                         <InputMaker type='radio' name="sex" label={'Female'} styling={{labelStyling: ' p-2 ' , size: 'p-2 text-indigo-600'}}/> 
                         </div>

                         {/* Address Input */}
                         <InputMaker type='text' name="address"  label="Address"  styling={{labelStyling: 'block' , size: 'w-72'}}/>
                        
                        {/* phone number  //todo add the prefex  */}
                        <InputMaker type='number' name='number'  label="Phone Number" styling={{labelStyling: 'block' , size: 'w-72' }}/>
                        
                        {/* chekcboxes   */}




                </form>
            </div>
        </div>
      )
    }
    
    export default register