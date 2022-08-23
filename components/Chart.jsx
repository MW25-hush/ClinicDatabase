import { Field } from 'formik';

const operations = [
  {label : 'Tooth Filling', name : 'toothfilling'  },
  {label : 'Orthodantic', name : 'orthodancy'  },
  {label : 'Implant', name : 'implant'  },
  {label : 'Crown', name : 'crown'  },
  {label : 'Bleaching', name : 'bleaching'  },
  {label : 'Prosthesis', name : 'prosthesis'  },
];


function Chart() {
  return (
    <div className='mx-5 border  border-slate-600 rounded xl:w-8/12 xl:my-20'>
    <table className=' w-full'>
    <thead className='bg-black text-white border-b border-slate-600'> 
      <tr className=''>
      <th className=''>Operation</th>
      <th></th>
      </tr>
    </thead>

    <tbody className='text-white  ' >
        <tr className=''>
          <td className='pl-2'>
           <span>Tooth Filling</span>  
          </td>

          <td className='pl-2 text-center '>
          <Field type='checkbox' value='toothfilling ' name='ops' className="rounded check w-7 h-7 border-slate-600 " />
          </td>

        </tr>

        <tr className=' '>
          <td className='pl-2'>
            Orthodantics
          </td>
          <td className=' pl-2 text-center'>
          <Field type='checkbox' value='orthodancy' name='ops'  className="rounded check w-7 h-7 border-slate-600" />
          </td>
        </tr>

        <tr className=''>
          <td className=' pl-2'>
            Implant
          </td>
          <td className=' pl-2 text-center'>
          <Field type='checkbox' value='implant' name='ops' className="rounded check w-7 h-7 border-slate-600" />
          </td>
        </tr>


        <tr>
          <td className=' pl-2'>
            Crown 
          </td>
          <td className=' pl-2 text-center'>
          <Field type='checkbox' value='crown' name='ops'  className="rounded check w-7 h-7 border-slate-600" />
          </td>
        </tr>

        <tr>
          <td className=' pl-2'>
            Bleaching
          </td>
          <td className=' pl-2 text-center'>
          <Field type='checkbox' value='bleaching' name='ops' className="rounded check w-7 h-7 border-slate-600" />
          </td>
        </tr>

        <tr>
          <td className=' pl-2'>
            Prosthesis
          </td>
          <td className=' pl-2 text-center'>
          <Field type='checkbox' value='prosthesis' name='ops' className="rounded check w-7 h-7 border-slate-600"/>
          </td>
        </tr>


    </tbody>
</table>

</div>
  )
}

export default Chart

// todo add payment info 