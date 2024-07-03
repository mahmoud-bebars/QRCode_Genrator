import { useEffect, useRef, useState } from "react";

import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import QRCode from "qrcode";
const QrReader = () => {
  const [data, setData] = useState("");
  const [qrData, setQrData] = useState("");

  const clear = () => {
    setData("");
    setQrData("");
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%]  bg-white shadow-xl rounded-lg p-3 z-10 space-y-4">
      <div className="w-full bg-blue-400 rounded-xl shadow-lg">
        {qrData !== "" ? (
          <div className="flex flex-col items-center p-2 justify-center">
            <img src={qrData} className="p-2 rounded-3xl" alt="qr-code" />
            <p className="text-sm font-thin italic text-white">{data}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center p-10 justify-center">
            <p className="text-2xl text-white">Scan QR</p>
          </div>
        )}
      </div>

      {qrData === "" ? (
        <Reader setData={setData} setQrData={setQrData} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            {" "}
            <button
              type="button"
              className="w-[30%] flex items-center justify-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-300 rounded-md px-3 py-2"
              onClick={() => clear()}
            >
              <XMarkIcon className="w-5 h-5" />
              <span>Clear</span>
            </button>
            <a download="qrCode.png" href={qrData} className="w-[100%]">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline "
                onClick={() => qrCodeGerate()}
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span> Download QR</span>
              </button>
            </a>
          </div>
          {validURL(data) ? (
            <div className="py-3">
              <a target="blank" href={`https://${data}`} className="w-[100%]">
                <button className="w-full flex items-center justify-center gap-2 rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline ">
                  <span>Visit Link</span>
                </button>
              </a>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default QrReader;

const Reader = ({ setQrData, setData }) => {
  // QR States
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Success
  const onScanSuccess = (result) => {
    console.log(result);
    setData(result?.data);

    QRCode.toDataURL(result?.data, { width: 300 }, (err, dataUrl) => {
      if (err) throw new Error(err);
      setQrData(dataUrl);
      console.log(dataUrl);
    });
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="!w-[100%] !left-0  m-auto relative p-3">
      {/* QR */}
      <video ref={videoEl} className=" rounded-3xl  object-cover" />
      <div ref={qrBoxEl} className=" flex flex-col items-center justify-center">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="absolute flex items-center justify-center"
        />
      </div>
    </div>
  );
};
