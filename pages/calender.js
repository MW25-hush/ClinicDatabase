import Navbar from "../components/navbar"
import {HiOutlineEmojiHappy} from 'react-icons/hi'

function Calender() {
  return (
    <div className='flex bg-black overflow-auto h-screen '>
    {/* //* Navbar */}
       <Navbar />
          {/* coming soon  */}
      <div className=' text-center text-white flex text-xl font-bold items-center justify-center w-full '>
        <h1>Coming Soon...</h1>
        <HiOutlineEmojiHappy size={25}/>
      </div>
    </div>
  )
}

export default Calender