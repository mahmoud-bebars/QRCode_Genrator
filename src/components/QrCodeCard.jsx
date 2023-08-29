import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";

import QRCode from "qrcode";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
const QrCodeCard = () => {
  const [url, setUrl] = useState("");
  const [fileName, setFleName] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "red",
  });
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
      setAlert({
        show: true,
        message: error.message,
        variant: "red",
      });
    }
  };

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({ show: false, message: "", variant: "red" });
      }, 5000);
    }
  }, [alert]);

  const clear = () => {
    setUrl("");
    setDataUrl("");
  };

  return (
    <Card className="w-96">
      <CardHeader variant="gradient" color="gray" className="">
        {dataUrl !== "" ? (
          <div className="flex flex-col items-center p- justify-center">
            <img src={dataUrl} className="p-5 rounded-3xl" alt="qr-code" />
          </div>
        ) : (
          <div className="flex flex-col items-center p-10 justify-center">
            <Typography variant="small" color="white" className="m-0 uppercase">
              Genrate
            </Typography>
            <Typography variant="h3" color="white">
              Qr Code
            </Typography>
          </div>
        )}
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {dataUrl !== "" ? (
          <Input
            type="url"
            placeholder="Enter file name to Download"
            size="lg"
            value={fileName}
            onChange={(e) => setFleName(e.target.value)}
          />
        ) : (
          <Input
            type="url"
            placeholder="Enter a valid URL"
            size="lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={(e) => {
              e.key === "Enter" && qrCodeGerate();
            }}
          />
        )}
      </CardBody>
      <CardFooter className="pt-0">
        {dataUrl === "" ? (
          <Button
            variant="gradient"
            fullWidth
            onClick={() => qrCodeGerate()}
            className="w-full flex items-center justify-center gap-2"
          >
            <QrCodeIcon className="w-5 h-5" />
            <span>Generate</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="gradient"
              color="gray"
              onClick={() => clear()}
              className=" flex items-center justify-center gap-2"
            >
              <XMarkIcon className="w-5 h-5" />
              <span>Clear</span>
            </Button>
            <a download="qrCode.png" href={dataUrl} className="w-full">
              <Button
                variant="gradient"
                color="blue-gray"
                className="w-full flex items-center justify-center gap-2"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span> Download</span>
              </Button>{" "}
            </a>
          </div>
        )}
        <Alert
          className="mt-2 mb-1 h-10 flex items-center"
          variant="outlined"
          open={alert.show === true ? true : false}
          color={alert.variant}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span>{alert.message}</span>
          </div>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default QrCodeCard;
