import SERVER_URL from "@/data/url";
import useFetch from "@/utils/axios";
import React, { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { parseAxiosTrpcResponse } from "@/utils/trpc";

type UploadType = "perm" | "temp";

function useFileUpload(props: {
  type: UploadType;
  setMessage(message: string): void;
  setUploads(url: string): void;
  stopLoading(): void;
}) {
  return async (data: string, type: string, name: string) => {
    const rawRes = await useFetch.post(
      props.type === "perm" ? "/api/upload.permUpload" : "/api/upload.tempUpload",
      { data, type, name }
    );
    props.stopLoading();
    const res = parseAxiosTrpcResponse<{ ok: boolean; value: string }>(rawRes);
    if (res.success) {
      if (res.data.ok) {
        props.setUploads(res.data.value);
        props.setMessage(`Upload available at ${SERVER_URL}/img/${res.data.value}`);
        return;
      }
      console.error("UNREACHABLE");
      props.setMessage("An error occured");
      return;
    }
    props.setMessage(res.message);
  };
}

export default function UploadPage() {
  const [responseMsg, setResponseMsg] = useState("");
  const [uploadType, setUploadType] = useState<UploadType>("temp");
  const [uploads, setUploads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileData = useFileUpload({
    type: uploadType,
    setMessage: (message: string) => setResponseMsg(message),
    setUploads: (url: string) => {
      setUploads((state) => [...state, url]);
    },
    stopLoading: () => setIsLoading(false),
  });

  // read data from image file and upload
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imageInputRef.current) return;
    const file = imageInputRef.current.files?.item(0);
    if (!file) {
      setResponseMsg("Choose a file first");
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (!result) {
        setResponseMsg("Failed to process file.");
      } else {
        // split removes invalid parts of the base64 string
        await uploadFileData((result as string).split(",")[1], file.type, file.name);
      }
      // reset file input when done
      imageInputRef.current ? (imageInputRef.current.value = "") : null;
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="page">
      <div>
        <Link to="/" className="btn btn-primary rounded-0">
          HOME
        </Link>
        <h2 className="text-center">Upload Image Files to Tobsmg server</h2>
      </div>
      <div className="mx-auto d-flex justify-content-between align-items-center px-4">
        <form onSubmit={handleSubmit}>
          <label className="d-block mb-3">
            <span className="d-block mb-1">Select a file to upload</span>
            <input className="form-control" type="file" accept="image/*" ref={imageInputRef} />
          </label>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={(e) => setUploadType(e.target.checked ? "perm" : "temp")}
            />
            <label>Permanent Upload</label>
          </div>
          <button type="submit" className="btn btn-success" disabled={isLoading}>
            UPLOAD
          </button>
          {responseMsg.length ? <p>{responseMsg}</p> : null}
        </form>
        {uploads.length ? (
          <div>
            <h3 className="text-center">Uploads:</h3>
            <ul className="navbar-nav d-flex flex-row flex-wrap gap-1">
              {uploads.map((url) => (
                <li key={url} className="mb-2">
                  <img src={`${SERVER_URL}/img/${url}`} height={100} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
