import React, { useState } from "react";
import { getMessageHash, compareFileHash, getFileHash } from "./HashApi";
import Tooltip from "../Utils/Tooltip";

function HashForm({ setCurrentView, handleMessage, loading, setLoading, setAppOutput }) {
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setMessage('');
    setFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "message":
        setMessage(value);
        break;
      case "file":
        setFile(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (option === 'getHash') {
      getMessageHash(message, handleMessage, setLoading, setAppOutput);
    } else if (option === 'compareHash') {
      if (!file) {
        handleMessage('Please upload a file for comparison.', 'error');
        return;
      }
      compareFileHash(message, file, handleMessage, setLoading, setAppOutput);
    } else if (option === 'fileHash') {
      if (!file) {
        handleMessage('Please upload a file to get its hash.', 'error');
        return;
      }
      getFileHash(file, handleMessage, setLoading, setAppOutput);
    }
  }

  return (
    <>
      <form className="page-form form-container" id="data-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <h3>Choose an option:</h3>
        </div>
        <div className="gen-options">
          <label>
            <input
              type="radio"
              name="option"
              value="getHash"
              checked={option === "getHash"}
              onChange={handleOptionChange}
            />
            <Tooltip text={"Get Hash value of a given message"}>Get Hash value</Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="compareHash"
              checked={option === "compareHash"}
              onChange={handleOptionChange}
            />
            <Tooltip text={"Check File integrity using it's last known Hash value"}>Check file integrity</Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="fileHash"
              checked={option === "fileHash"}
              onChange={handleOptionChange}
            />
            <Tooltip text={"Get Hash value of an uploaded file"}>File Hash</Tooltip>
          </label>
        </div>
        {option !== '' && option === 'fileHash' && (
          <>
            <div className="form-row">
              <label htmlFor="file">
                <Tooltip text={"Upload a File to get its Hash"}>Upload a file:</Tooltip>
              </label>
              <input type="file" name="file" id="file" onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <button type="submit" className={loading ? "active" : ""} id="submit-btn">
                {"Get File Hash"}
              </button>
            </div>
          </>
        )}
        {option !== '' && option !== 'fileHash' && (
          <>
            <div className="form-row">
              <input
                type="text"
                name="message"
                placeholder={option === 'getHash' ? "Enter your message" : "Enter hash value"}
                value={message}
                onChange={handleInputChange}
              />
            </div>
            {option === "compareHash" && (
              <>
                <div className="form-row">
                  <label htmlFor="file">
                    <Tooltip text={"Upload a File to compare its Hash value"}>Upload a file:</Tooltip>
                  </label>
                  <input type="file" name="file" id="file" onChange={handleInputChange} />
                </div>
              </>
            )}
            <div className="form-row">
              <button type="submit" className={loading ? "active" : ""} id="submit-btn">
                {option === "getHash" ? "Get Hash" : (option === "compareHash" ? "Compare File Hash" : "Get File Hash")}
              </button>
            </div>
          </>
        )}
        <div>
          <button onClick={() => setCurrentView("tzi-labs")}>Go back</button>
        </div>
      </form>
    </>
  );
}

export default HashForm;
