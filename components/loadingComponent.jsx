import Image from "next/image";
import loading_spinner from "../public/loading_spinner.svg";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center grow ">
      <Image alt="loading" height={150} width={150} src={loading_spinner} />{" "}
    </div>
  );
};

export default LoadingSpinner;
