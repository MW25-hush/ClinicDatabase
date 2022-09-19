import { useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "../components/ModalComponent";
import Navbar from "../components/navbar";
import loading_spinner from "../public/loading_spinner.svg";

function Home() {
  const { status } = useSession();

  return status == "unauthenticated" ? (
    <div className="flex h-screen justify-center bg-black items-center grow">
      <Modal />
    </div>
  ) : (
    <div className={`flex bg-black overflow-auto h-screen`}>
      <Navbar />
      {status == "loading" ? (
        <div className="flex justify-center items-center grow ">
          <Image alt="loading" height={150} width={150} src={loading_spinner} />{" "}
        </div>
      ) : (
        <div className=" text-center  grow ">
          <h1 className="pt-2 text-xl text-white">
            {" "}
            <strong>M@W</strong> Clinic Database{" "}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Home;
