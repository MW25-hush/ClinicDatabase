import React from 'react'
import InputMaker from './inputMaker'
import ToothPopUpModal from '../components/toothPopUpModal';


function Chart() {
  return (
    <div className='col-span-3 mr-5 '>
    <table className='table-fixe bg-gray-100 border-2 border-slate-500 border-collapse w-full my-2  '>
    <thead className='bg-blue-100'> 
      <tr>
      <th className='border border-slate-600'>Operation</th>
      <th className='border border-slate-600'></th>
      </tr>
    </thead>

    <tbody >
        <tr>
          <td className='border border-slate-600  pl-2'>
            Tooth Filling 
          </td>
          <td className='border border-slate-600  pl-2'>
          <InputMaker type='checkbox' name='orthodancy'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Orthodancy
          </td>
          <td className='border border-slate-600 pl-2'>
          <InputMaker type='checkbox' name='orthodancy'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Implant
          </td>
          <td className='border border-slate-600 pl-2'>
          <InputMaker type='checkbox' name='Implant'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>


        <tr>
          <td className='border border-slate-600 pl-2'>
            Crown 
          </td>
          <td className='border border-slate-600 pl-2'>
          <InputMaker type='checkbox' name='Crown'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Bleaching
          </td>
          <td className='border border-slate-600 pl-2'>
          <InputMaker type='checkbox' name='bleaching'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Prosthesis
          </td>
          <td className='border border-slate-600 pl-2'>
          <InputMaker type='checkbox' name='prosthesis'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>


    </tbody>
</table>
<ToothPopUpModal />
</div>
  )
}

export default Chart