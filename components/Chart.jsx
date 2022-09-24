import { ErrorMessage, Field } from 'formik';
import json from '../DataObjects.json'

function OperationOptionsTable({chartStyle,checked, disabled, props}) {
  // table of operations 
  const listOfOperations = json.Operations

  return (
    <>
    <div className={`mx-5 border border-slate-600 rounded max-w-sm  mb-2 ${chartStyle?.head}`}>
    <table className={`w-full ${chartStyle?.table}`}>
    <thead className='bg-black text-white border-b border-slate-600'> 
      <tr>
      <th className=''>Operation</th>
      <th></th>
      </tr>
    </thead>
        <tbody className='text-white'>
        {listOfOperations.map((op) => (
                <tr key={op.label} className={chartStyle?.body}>
                  <td className="pl-2">
                    <span>{op.label}</span>
                  </td>
                  <td className="pl-2 text-center">
                    <Field
                      name={op.name}              
                      className="check rounded border-slate-600 w-5 h-5 "
                      type="checkbox"
                      value={op.value}
                      checked={ checked?.includes(op.value) }
                      disabled={disabled}
                      {...props}
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

export default OperationOptionsTable
