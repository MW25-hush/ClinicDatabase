import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineDollarCircle, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { FiPlusCircle } from 'react-icons/fi'

const Navbar = () => {
  const [active,setActive] =  useState({paymentActivate : false, homeActivate: true, registerActivate : false, searchActivate : false })

    const  handleClick = (type) => {
        switch(type){
            case 'home' : setActive({ homeActivate : true, paymentActivate : false, registerActivate : false, searchActivate : false}) 
            break;
            case 'search' : setActive({homeActivate : false , searchActivate : true , registerActivate : false, paymentActivate : false})
            break;
            case 'register' : setActive({homeActivate : false, searchActivate : false, registerActivate : true , paymentActivate : false})
            break; 
            case 'payment' : setActive({homeActivate : false , searchActivate : false , registerActivate : false , paymentActivate : true})
            break ; 
            default : setActive({ homeActivate : true, paymentActivate : false, registerActivate : false, searchActivate : false})
          }
        }

        return  (
          <div className="bg-mygreen text-white w-3/12 md:w-2/12 lg:w-1/12 py-4 grid">
          {/* logo */}
               <h1 className='text-white text-lg lg:pl-5 xl:pl-7'>M@W</h1>
      
               <div className='space-y-14 overflow-hidden '>
                 {/* //todo make the every icon container animated and on cliced it must have state showing 
                 //todo which one is active  */}
                         {/* home icon  */}
                     <div onClick={() => handleClick('home')} className={`w-32 h-14 hover:bg-white group ${active.homeActivate ? 'bg-white' : ''} `} >
                         <AiOutlineHome className={`navicon ${active.homeActivate ? 'text-black ' : 'text-white'}`}/> 
                     </div>
             {/* search icon */}
               <div onClick={() => handleClick('search')} className={`w-32 h-14 hover:bg-white group ${active.searchActivate ? 'bg-white' : ''} `}>
                  <AiOutlineSearch className={`navicon ${active.searchActivate ? 'text-black' : 'text-white'} `}/>
               </div>
             {/* register icon  */}
                 <div onClick={() => handleClick('register')} className={`w-32 h-14 hover:bg-white group ${active.registerActivate ? 'bg-white' : ''}`}>
                   <Link href="/register" passHref >
                     <a>
                     <FiPlusCircle className={`navicon ${active.registerActivate ? 'text-black' : 'text-white'}`}/>
                     </a>
                   </Link>
                 </div>
             {/* payment icon  */}
                 <div onClick={() => handleClick('payment')} className={`w-32 h-14 hover:bg-white group ${active.paymentActivate ? 'bg-white' : ''}`}>
                     <AiOutlineDollarCircle className={`navicon ${active.paymentActivate ? 'text-black' : 'text-white'}`}/>
                 </div>
      
               </div>
       </div>
             );   
      }

export default Navbar