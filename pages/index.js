import Navbar from '../components/navbar';


 function Home() { 
 return (
    <div className='flex bg-black overflow-auto h-screen '>
      {/* //* Navbar */}
         <Navbar />
      {/* list of patients  */}
        <div className=' text-center  grow  '>
          <h1 className='text-black pt-2 text-xl'> <strong>M@W</strong> Clinic Database </h1>
            {/*  //* card section  */}
          <div className='  '>
          </div>
        </div>
      </div> )
  }

export default Home
