import React from 'react'
import InputMaker from './inputMaker'


function Chart() {
  return (
    
    <table className='table-fixed bg-gray-100 border-2 border-slate-500 border-collapse col-span-3 m-2 '>
    <thead className='bg-blue-100'> 
      <tr>
      <th className='border border-slate-600'>Operation</th>
      <th className='border border-slate-600'></th>
      </tr>
    </thead>

    <tbody>
        <tr>
          <td className='border border-slate-600'>
            Tooth Filling 
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='orthodancy'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600'>
            Orthodancy
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='orthodancy'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600'>
            Implant
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='Implant'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>


        <tr>
          <td className='border border-slate-600'>
            Crown 
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='Crown'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600'>
            Bleaching
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='bleaching'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600'>
            Prosthesis
          </td>
          <td className='border border-slate-600'>
          <InputMaker type='checkbox' name='prosthesis'   styling={{labelStyling: '' , size: 'p-2 text-indigo-500 w-full' }}/>
          </td>
        </tr>


    </tbody>
</table>
  )
}

export default Chart