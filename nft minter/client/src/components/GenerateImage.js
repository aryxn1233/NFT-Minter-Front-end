import React, { useState } from "react";

function GenerateImage({ setImageUrl }) {
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setFileName(file.name);
    }
  };

  return (
    <div>
      <label className="file-upload-label" htmlFor="file-input">
        Choose an Image
      </label>
      <input 
        type="file" 
        id="file-input" 
        onChange={handleImageChange} 
        accept="image/*" 
        style={{ display: "none" }}
      />
      {fileName && <p className="file-name">Selected file: {fileName}</p>}
    </div>
  );
}

export default GenerateImage;
