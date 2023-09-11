// import { useEffect } from "react";

function Errormsg({ errorMessage = " " }) {
  return (
    <div className="w-full max-w-3xl mt-10   ">
      <div className="text-2xl uppercase font-semibold">
        Something Went <span className="text-blue-500">wrong</span>{" "}
      </div>
      <div className=" bg-gray-100 text-gray-500 text-lg font-normal p-3 mt-3">
        StatusCode: {errorMessage}
      </div>
    </div>
  );
}

export default Errormsg;
