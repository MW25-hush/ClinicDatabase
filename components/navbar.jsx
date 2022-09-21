import Link from 'next/link';
import {  AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { FiPlusCircle } from 'react-icons/fi';
import {useRouter} from 'next/router';
import { BsCalendarDate } from 'react-icons/bs';

const Navbar = () => {
    const router = useRouter();  

        return  (
          <div className="bg-mygreen  text-white py-4 grid w-32">
          {/* logo */}
                 <h1 className='text-white text-lg mx-auto'>M@W</h1>

               <div className='space-y-14 overflow-hidden '>
                 {/* //todo to make it look the other project 
                  */}
                         {/* home icon  */}
                     <div className={`w-full h-14 hover:bg-white group ${router.route === '/Home' ? 'bg-white' : ''} `} >
                      <Link href={'/Home'} passHref>
                      <a>
                         <AiOutlineHome className={`navicon ${router.route === '/Home' ? 'text-black ' : 'text-white'}`}/> 
                      </a>
                      </Link>
                     </div>
             {/* search icon */}
               <div  className={`w-full h-14 hover:bg-white group ${router.route === '/patients' || router.route === '/patients/[id]' ? 'bg-white' : ''}`}>
               <Link href={'/patients'} passHref>
                 <a>
                  <AiOutlineSearch className={`navicon ${router.route === '/patients' || router.route === '/patients/[id]' ? 'text-black' : 'text-white'}`}/>
                 </a>
               </Link>
               </div>
             {/* register icon  */}
                 <div className={`w-full h-14 hover:bg-white group ${router.route === '/register' ? 'bg-white' : ''}`}>
                   <Link href="/register" passHref >
                     <a>
                     <FiPlusCircle className={`navicon ${router.route === '/register' ? 'text-black' : 'text-white'}`}/>
                     </a>
                   </Link>
                 </div>
             {/* payment icon  */}
                 <div className={`w-full h-14 hover:bg-white group ${router.route === '/calender' ? 'bg-white' : ''}`}>
                  <Link href={'/calender'} passHref>
                  <a>
                     <BsCalendarDate className={`navicon ${router.route === '/calender' ? 'text-black' : 'text-white'}`}/>
                  </a>
                  </Link>
                 </div>
      
               </div>
       </div>
             );   
      }

export default Navbar