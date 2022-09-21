import { useRouter } from "next/router";

const Modal = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen justify-center bg-black items-center grow">
      <div className="bg-white rounded w-1/3 text-center p-2 space-y-2">
        <h1 className="font-bold text-xl uppercase">Unauthorized Entry</h1>
        <p className="text-lg">Please Log in to continue!</p>
        <button
          onClick={() => router.push("/")}
          className="bg-mygreen w-20 hover:text-white p-1 rounded font-bold"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Modal;
