import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineDollarCircle, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { FiPlusCircle } from 'react-icons/fi';
import {useRouter} from 'next/router'

const Navbar = () => {
    const router = useRouter();  

        return  (
          <div className="bg-mygreen text-white w-1/12 lg:w-32 py-4 grid">
          {/* logo */}
               <h1 className='text-white text-lg mx-auto'>M@W</h1>
      
               <div className='space-y-14 overflow-hidden'>
                 {/* //todo make the every icon container animated and on cliced it must have state showing 
                 //todo which one is active  */}
                         {/* home icon  */}
                     <div className={`w-full h-14 hover:bg-white group ${router.route === '/' ? 'bg-white' : ''} `} >
                      <Link href={'/'} passHref>
                      <a>
                         <AiOutlineHome className={`navicon ${router.route === '/' ? 'text-black ' : 'text-white'}`}/> 
                      </a>
                      </Link>
                     </div>
             {/* search icon */}
               <div  className={`w-full h-14 hover:bg-white group ${router.route === '/search' ? 'bg-white' : ''} `}>
               <Link href={'/search'} passHref>
                 <a>
                  <AiOutlineSearch className={`navicon ${router.route === '/search' ? 'text-black' : 'text-white'} `}/>
                 </a>
               </Link>
               </div>
             {/* register icon  */}
                 <div className={`w-full h-14 hover:bg-white group ${router.route === '/register' ? 'bg-white' : ''}`}>
                   <Link href="register" passHref >
                     <a>
                     <FiPlusCircle className={`navicon ${router.route === '/register' ? 'text-black' : 'text-white'}`}/>
                     </a>
                   </Link>
                 </div>
             {/* payment icon  */}
                 <div className={`w-full h-14 hover:bg-white group ${router.route === '/payment' ? 'bg-white' : ''}`}>
                  <Link href={'payment'} passHref>
                  <a>
                     <AiOutlineDollarCircle className={`navicon ${router.route === '/payment' ? 'text-black' : 'text-white'}`}/>
                  </a>
                  </Link>
                 </div>
      
               </div>
       </div>
             );   
      }

export default Navbar