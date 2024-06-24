import { useEffect } from "react";

const AlertMessage = ({ message, setMessage }) => {
  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);
  return (
    <>
      {message !== "" && (
        <div
          className={`w-full text-center my-2 py-2 ${message[0]} rounded-md`}
        >
          <p className="text-sm text-white capitalize font-thin">
            {message[1]}
          </p>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
