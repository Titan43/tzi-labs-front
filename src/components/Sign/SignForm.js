import { useState } from "react";
import Tooltip from "../Utils/Tooltip";

function SignForm({
  setCurrentView,
  handleMessage,
  loading,
  setLoading,
  setAppOutput,
}) {
  const [operation, setOperation] = useState('');
  const [dataType, setDataType] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [signature, setSignature] = useState('');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    setMessage('');
    setFile(null);
    setPrivateKeyFile(null);
    setPublicKeyFile(null);
    setSignature('');
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
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
      case "privateKeyFile":
        setPrivateKeyFile(e.target.files[0]);
        break;
      case "publicKeyFile":
        setPublicKeyFile(e.target.files[0]);
        break;
      case "signature":
        setSignature(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (operation === "verify" && dataType === "file" && file === null) {
      handleMessage('Please upload a file for signature verification.', 'error');
      return;
    }

    if (operation === "sign" && dataType === "file" && !privateKeyFile) {
      handleMessage('Please upload a private key file for signature creation.', 'error');
      return;
    }

    if (operation === "verify" && dataType === "file" && !publicKeyFile) {
      handleMessage('Please upload a public key file for signature verification.', 'error');
      return;
    }

    if (operation === "sign" && dataType === "message" && !privateKeyFile) {
      handleMessage('Please upload a private key file for message signature creation.', 'error');
      return;
    }

    if (operation === "verify" && dataType === "message" && !publicKeyFile) {
      handleMessage('Please upload a public key file for message signature verification.', 'error');
      return;
    }

    // Perform the sign or verify operation based on the selected options
    // Add your logic here

    // Example logic:
    // if (operation === "sign") {
    //   // Perform sign operation with privateKeyFile
    //   // set the generated signature to state or display it as needed
    // } else if (operation === "verify") {
    //   // Perform verify operation with publicKeyFile and signature
    //   // set the verification result to state or display it as needed
    // }
  };

  return (
    <>
      <form
        className="page-form form-container"
        id="data-form"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <h3>Choose an operation:</h3>
        </div>
        <div className="gen-options">
          <label>
            <input
              type="radio"
              name="operation"
              value="sign"
              checked={operation === "sign"}
              onChange={handleOperationChange}
            />
            <Tooltip text={"Create a signature"}>
              Sign
            </Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="operation"
              value="verify"
              checked={operation === "verify"}
              onChange={handleOperationChange}
            />
            <Tooltip text={"Verify a signature"}>
              Verify
            </Tooltip>
          </label>
        </div>

        {operation !== '' && (
          <>
            <div className="form-row">
              <h3>Choose data type:</h3>
            </div>
            <div className="gen-options">
              <label>
                <input
                  type="radio"
                  name="dataType"
                  value="message"
                  checked={dataType === "message"}
                  onChange={handleDataTypeChange}
                />
                <Tooltip text={"Input a text message"}>
                  Message
                </Tooltip>
              </label>
              <label>
                <input
                  type="radio"
                  name="dataType"
                  value="file"
                  checked={dataType === "file"}
                  onChange={handleDataTypeChange}
                />
                <Tooltip text={"Upload a file"}>
                  File
                </Tooltip>
              </label>
            </div>
            {dataType !== '' && (
              <>
                {dataType === "message" && (
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
                {dataType === "file" && (
                  <div className="form-row">
                    <label htmlFor="file">
                      <Tooltip text={"Upload a File"}>
                        Upload a file:
                      </Tooltip>
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {operation === "sign" && dataType === "file" && (
                  <div className="form-row">
                    <label htmlFor="privateKeyFile">
                      <Tooltip text={"Upload a Private Key file"}>
                        Private Key File:
                      </Tooltip>
                    </label>
                    <input
                      type="file"
                      name="privateKeyFile"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {operation === "verify" && dataType === "file" && (
                  <>
                      <div className="form-row">
                      <label htmlFor="signature">
                        <Tooltip text={"Enter the Signature to Verify"}>
                          Signature:
                        </Tooltip>
                      </label>
                      <input
                        type="text"
                        name="signature"
                        placeholder="Enter the Signature"
                        value={signature}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="publicKeyFile">
                        <Tooltip text={"Upload a Public Key file"}>
                          Public Key File:
                        </Tooltip>
                      </label>
                      <input
                        type="file"
                        name="publicKeyFile"
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                {operation === "sign" && dataType === "message" && (
                  <div className="form-row">
                    <label htmlFor="privateKeyFile">
                      <Tooltip text={"Upload a Private Key file"}>
                        Private Key File:
                      </Tooltip>
                    </label>
                    <input
                      type="file"
                      name="privateKeyFile"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {operation === "verify" && dataType === "message" && (
                  <>
                  <div className="form-row">
                  <label htmlFor="signature">
                    <Tooltip text={"Enter the Signature to Verify"}>
                      Signature:
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    name="signature"
                    placeholder="Enter the Signature"
                    value={signature}
                    onChange={handleInputChange}
                  />
                </div>
                  <div className="form-row">
                    <label htmlFor="publicKeyFile">
                      <Tooltip text={"Upload a Public Key file"}>
                        Public Key File:
                      </Tooltip>
                    </label>
                    <input
                      type="file"
                      name="publicKeyFile"
                      onChange={handleInputChange}
                    />
                  </div>
                  </>
                )}
                <div className="form-row">
                  <button
                    type="submit"
                    className={loading ? "active" : ""}
                    id="submit-btn"
                  >
                    {operation === "sign"
                      ? "Create Signature"
                      : "Verify Signature"}
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

export default SignForm;
