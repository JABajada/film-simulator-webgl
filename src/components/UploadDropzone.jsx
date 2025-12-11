import React from "react";
import { useDropzone } from "react-dropzone";

export default function UploadDropzone({ onUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result);
      reader.readAsDataURL(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded p-10 text-center cursor-pointer bg-white"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>Drag & drop an image or click to upload</p>}
    </div>
  );
}

