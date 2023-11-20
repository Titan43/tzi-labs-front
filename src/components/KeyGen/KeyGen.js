import React, { useState } from "react";
import generateKey from "./KeyGeneratorApi";
import Tooltip from "../Utils/Tooltip";

function KeyGeneratorForm({ appOutput, setCurrentView, handleMessage, loading, setLoading, setAppOutput }) {
  const [algorithm, setAlgorithm] = useState('');

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleSaveKeys = () => {
    const [privateKey, publicKey] = appOutput;

    if (privateKey && publicKey) {
      saveKeyToFile(privateKey, "private_key.txt");
      saveKeyToFile(publicKey, "public_key.txt");
    } else {
      handleMessage("Keys not available for saving.", "error");
    }
  };

  const saveKeyToFile = (key, fileName) => {
    const blob = new Blob([key], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!algorithm) {
      handleMessage('Please choose an algorithm.', 'error');
      return;
    }
    generateKey(algorithm, handleMessage, setLoading, setAppOutput);
  }

  return (
    <>
      <form className="page-form form-container" id="data-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <h3>Choose an algorithm:</h3>
        </div>
        <div className="gen-options">
          <label>
            <input
              type="radio"
              name="algorithm"
              value="RSA"
              checked={algorithm === "RSA"}
              onChange={handleAlgorithmChange}
            />
            <Tooltip text={"Generate keys for the RSA algorithm"}>RSA</Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="algorithm"
              value="DSA"
              checked={algorithm === "DSA"}
              onChange={handleAlgorithmChange}
            />
            <Tooltip text={"Generate keys for the DSA algorithm"}>DSA</Tooltip>
          </label>
        </div>
        {algorithm && (
          <>
            <div className="form-row">
              <button type="submit" className={loading ? "active" : ""} id="submit-btn">
                {"Generate Keys"}
              </button>
            </div>
          </>
        )}
        {appOutput && (
          <div className="form-row">
            <button onClick={handleSaveKeys}>
              {"Save Keys as Files"}
            </button>
          </div>
        )}
        <div>
          <button onClick={() => setCurrentView("tzi-labs")}>Go back</button>
        </div>
      </form>
    </>
  );
}

export default KeyGeneratorForm;
