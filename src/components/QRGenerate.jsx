import { useState } from "react";
import AlertMessage from "./shared/AlertMessage";
import QRCode from "qrcode";

import {
  XMarkIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const QRGenerate = () => {
  const [url, setUrl] = useState("");
  const [fileName, setFleName] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [message, setMessage] = useState("");
  const qrCodeGerate = () => {
    try {
      if (url === "") throw new Error("Please Enter Vaild Url");
      console.log("Genrating QR Code");
      QRCode.toDataURL(url, { width: 300 }, (err, dataUrl) => {
        if (err) throw new Error(err);

        // set dataUrl state to dataUrl
        setDataUrl(dataUrl);
        console.log(dataUrl);
      });
    } catch (error) {
      setMessage(["bg-red-600/20", error.message]);
    }
  };

  const clear = () => {
    setUrl("");
    setDataUrl("");
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] bg-white shadow-xl rounded-lg p-3 z-10 space-y-4">
      <div className="w-full bg-blue-400 rounded-xl shadow-lg">
        {dataUrl !== "" ? (
          <div className="flex flex-col items-center p-2 justify-center">
            <img src={dataUrl} className="p-2 rounded-3xl" alt="qr-code" />
            <p className="text-sm font-thin italic text-white">https://{url}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center p-10 justify-center">
            <p className="text-2xl text-white">Generate QR</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {dataUrl !== "" ? (
          <input
            type="text"
            name="first-name"
            placeholder="Enter file name to Download"
            size="lg"
            value={fileName}
            onChange={(e) => setFleName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 ">
            <span className="w-fit flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              https://
            </span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyUp={(e) => {
                e.key === "Enter" && qrCodeGerate();
              }}
              autoComplete="username"
              className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus-within:ring-0  focus-within:ring-blue-100 sm:text-sm sm:leading-6"
              placeholder="www.google.com"
            />
          </div>
        )}
      </div>
      <div className="my-6 flex items-center justify-between gap-x-2">
        {dataUrl === "" ? (
          <button
            type="submit"
            className="w-[100%] flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => qrCodeGerate()}
          >
            <QrCodeIcon className="w-5 h-5" />
            <span>Generate</span>
          </button>
        ) : (
          <>
            {" "}
            <button
              type="button"
              className="w-[30%] flex items-center justify-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-300 rounded-md px-3 py-2"
              onClick={() => clear()}
            >
              <XMarkIcon className="w-5 h-5" />
              <span>Clear</span>
            </button>
            <a download="qrCode.png" href={dataUrl} className="w-[100%]">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline "
                onClick={() => qrCodeGerate()}
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span> Download</span>
              </button>
            </a>
          </>
        )}
      </div>
      <AlertMessage message={message} setMessage={setMessage} />
    </div>
  );
};

export default QRGenerate;
