import { useSession } from "next-auth/react";
import LoadingSpinner from "../components/loadingComponent";
import Modal from "../components/ModalComponent";
import Navbar from "../components/navbar";

function Home() {
  const { status } = useSession();

  return status == "unauthenticated" ? (
      <Modal />
  ) : (
    <div className={`flex bg-black overflow-auto h-screen`}>
      <Navbar />
      {status == "loading" ? (
            <LoadingSpinner />
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
