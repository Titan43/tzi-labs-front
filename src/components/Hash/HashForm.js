import { useState } from "react";
import { compareFileHash, getMessageHash } from "./HashApi";

function HashForm({setCurrentView, handleMessage, loading, setLoading, setAppOutput}) {
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setMessage('');
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
    if(option === 'getHash')
      getMessageHash(message, handleMessage, setLoading, setAppOutput);
    else
      compareFileHash(message, file, handleMessage, setLoading, setAppOutput);
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
            name="option1"
            value="getHash"
            checked={option === "getHash"}
            onChange={handleOptionChange}
          />
           Get Hash</label>
        <label>
          <input
            type="radio"
            name="option2"
            value="compareHash"
            checked={option === "compareHash"}
            onChange={handleOptionChange}
          />
          Check file integrity using hash value</label>
      </div>
      {option !== '' ?
        <>
        <div className="form-row">
          <input
            type="text"
            name="message"
            placeholder={option==='getHash' ? "Enter your message" : "Enter expected hash value"}
            value={message}
            onChange={handleInputChange}
          />
        </div>
        {option === "compareHash" && (
        <>
          <div className="form-row">

          </div>
          <div className="form-row">
            <label htmlFor="file">Upload a file:</label>
            <input type="file" name="file" id="file" onChange={handleInputChange}/>
          </div>
        </>
        )}
        <div className="form-row">
          <button type="submit" className={loading ? "active" : ""} id="submit-btn">
            {option === "getHash" ? "Get Hash" : "Compare File Hash"}
          </button>
        </div>
        </>
          :
          <></>}
      <div>
        <button onClick={() => setCurrentView("tzi-labs")}>Go back</button>
      </div>
    </form>
  </>
  );
}

export default HashForm;
