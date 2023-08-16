import React, { useState } from "react";

export const Profile = ({ id }) => {
  const [img, setImg] = useState();
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1024 * 1024; // 1mb

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.size > maxFileSize) {
      setFileSizeExceeded(true);
      return; // do not process the file if it exceeds the size limit
    }
    setImg(event.target.files[0]);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setFileSizeExceeded(false);
    // };
    // reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container">
      <h3>React Js File Upload size Limit Validation</h3>
      <input type="file" onChange={handleFileUpload} accept="image/*" />
      {fileSizeExceeded && (
        <p className="error">
          File size exceeded the limit of {maxFileSize / 1000} KB
        </p>
      )}
      <img src={img} alt="" />
    </div>
  );
};
