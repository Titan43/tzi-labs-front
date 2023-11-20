import { useState } from "react";
import Tooltip from "../Utils/Tooltip";
import { encryptMessageRC5, encryptFileRC5 } from "./RC5Api";

function EncryptionForm({ setCurrentView, handleMessage, loading, setLoading, setAppOutput }) {
  const [encryptionType, setEncryptionType] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [rc5Key, setRC5Key] = useState('');
  const [rsaKeyFile, setRSAKeyFile] = useState(null);
  const [rc5IV, setRC5IV] = useState(''); 

  const handleEncryptionTypeChange = (e) => {
    setEncryptionType(e.target.value);
    setMessage('');
    setFile(null);
    setRC5Key('');
    setRSAKeyFile(null);
    setRC5IV(''); 
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
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
      case "rc5Key":
        setRC5Key(value);
        break;
      case "rc5IV":
        setRC5IV(value);
        break;
      case "rsaKeyFile":
        setRSAKeyFile(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (encryptionType === "message" && algorithm === "RC5") {
      encryptMessageRC5(message, rc5Key, rc5IV, handleMessage, setLoading, setAppOutput);
    } else if (encryptionType === "file" && algorithm === "RC5") {
      encryptFileRC5(file, rc5Key, rc5IV, handleMessage, setLoading, setAppOutput);
    }
  };

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
              name="encryptionType"
              value="message"
              checked={encryptionType === "message"}
              onChange={handleEncryptionTypeChange}
            />
            <Tooltip text={"Input a text message to encrypt"}>
              Encrypt Message
            </Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="encryptionType"
              value="file"
              checked={encryptionType === "file"}
              onChange={handleEncryptionTypeChange}
            />
            <Tooltip text={"Upload a file to encrypt"}>
              Encrypt File
            </Tooltip>
          </label>
        </div>
        {encryptionType !== '' && (
          <>
            <div className="form-row">
              <h3>Choose an algorithm:</h3>
            </div>
            <div className="gen-options">
              <label>
                <input
                  type="radio"
                  name="algorithm"
                  value="RC5"
                  checked={algorithm === "RC5"}
                  onChange={handleAlgorithmChange}
                />
                RC5
              </label>
              <label>
                <input
                  type="radio"
                  name="algorithm"
                  value="RSA"
                  checked={algorithm === "RSA"}
                  onChange={handleAlgorithmChange}
                />
                RSA
              </label>
            </div>
            {algorithm !== '' && (
              <>
                {encryptionType === "message" && (
                  <div className="form-row">
                    <input
                      type="text"
                      name="message"
                      placeholder="Enter your message"
                      value={message}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {encryptionType === "file" && (
                  <div className="form-row">
                    <label htmlFor="file">
                      <Tooltip text={"Upload a File to encrypt"}>
                        Upload a file for Encryption:
                      </Tooltip>
                    </label>
                    <input type="file" name="file" id="file" onChange={handleInputChange} />
                  </div>
                )}
                {algorithm === "RC5" && (
                  <>
                    <div className="form-row">
                      <label>
                        RC5 Key:
                      </label>
                      <input
                        type="text"
                        name="rc5Key"
                        value={rc5Key}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-row">
                      <label>
                        RC5 IV:
                      </label>
                      <input
                        type="number"
                        name="rc5IV"
                        value={rc5IV}
                        onChange={handleInputChange}
                        min={0}
                        max={Number.MAX_SAFE_INTEGER}
                        />
                    </div>
                  </>
                )}
                {algorithm === "RSA" && (
                  <div className="form-row">
                    <label>
                      <Tooltip text={"Upload a PrivateKey file"}>
                        RSA Key File:
                      </Tooltip>
                    </label>
                    <input
                      type="file"
                      name="rsaKeyFile"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div className="form-row">
                  <button type="submit" className={loading ? "active" : ""} id="submit-btn">
                    {encryptionType === "message" ? "Encrypt Message" : "Encrypt File"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
        <div>
          <button onClick={() => setCurrentView("tzi-labs")}>Go back</button>
        </div>
      </form>
    </>
  );
}

export default EncryptionForm;
