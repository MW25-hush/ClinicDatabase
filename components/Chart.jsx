import { ErrorMessage, Field } from 'formik';

const operations = [
  {label : 'Tooth Filling', value : 'toothfilling' , name : 'ops'  },
  {label : 'Orthodantic', value : 'orthodancy' , name : 'ops'  },
  {label : 'Implant', value : 'implant', name : 'ops'  },
  {label : 'Crown', value : 'crown' , name : 'ops' },
  {label : 'Bleaching', value : 'bleaching' , name : 'ops'  },
  {label : 'Prosthesis', value : 'prosthesis' , name : 'ops' },
];


function Chart() {
  return (
    <>
    <div className='mx-5 border border-slate-600 rounded xl:w-8/12 xl:mt-20 mb-2'>
    <table className='w-full'>
    <thead className='bg-black text-white border-b border-slate-600'> 
      <tr className=''>
      <th className=''>Operation</th>
      <th></th>
      </tr>
    </thead>

        <tbody className='text-white  ' >
        {operations.map((op) => (
                <tr key={op.label}>
                  <td className="pl-2">
                    <span>{op.label}</span>
                  </td>
                  <td className="pl-2 text-center">
                    <Field
                      name={op.name}              
                      className="check rounded border-slate-600 w-5 h-5 "
                      type="checkbox"
                      value={op.value}
                      />
                    </td>
                  </tr>
                  ))}
          </tbody>
      </table>

    </div>
          <ErrorMessage name='ops' render={msg => <div className="text-red-500 font-medium mx-10">{msg}</div>}/>
          </>
  )
}

export default Chart

// todo add payment info 