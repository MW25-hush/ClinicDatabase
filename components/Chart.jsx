import { Field } from 'formik';
import React from 'react'

import ToothPopUpModal from '../components/toothPopUpModal';


function Chart() {
  return (
    <div className='col-span-3 mr-5 '>
    <table className=' bg-gray-10  w-full my-2  '>
    <thead className='bg-black text-white'> 
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
          <Field type='checkbox' name='toothfilling '  className="customizeForm" />
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Orthodancy
          </td>
          <td className='border border-slate-600 pl-2'>
          <Field type='checkbox' name='orthodancy'  className="customizeForm" />
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Implant
          </td>
          <td className='border border-slate-600 pl-2'>
          <Field type='checkbox' name='Implant' className="customizeForm" />
          </td>
        </tr>


        <tr>
          <td className='border border-slate-600 pl-2'>
            Crown 
          </td>
          <td className='border border-slate-600 pl-2'>
          <Field type='checkbox' name='Crown'  className="customizeForm" />
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Bleaching
          </td>
          <td className='border border-slate-600 pl-2'>
          <Field type='checkbox' name='bleaching'  className="customizeForm" />
          </td>
        </tr>

        <tr>
          <td className='border border-slate-600 pl-2'>
            Prosthesis
          </td>
          <td className='border border-slate-600 pl-2'>
          <Field type='checkbox' name='prosthesis'  className="customizeForm"/>
          </td>
        </tr>


    </tbody>
</table>
<ToothPopUpModal />
</div>
  )
}

export default Chart

// todo add payment info 