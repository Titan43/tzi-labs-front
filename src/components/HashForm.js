import { useState } from "react";

function HashForm({setCurrentView, handleMessage, loading, setLoading, setAppOutput}) {
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
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
          Check file integrity using hash</label>
      </div>
      {option === "getHash" && (
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
      {option === "compareHash" && (
        <div className="form-row">
          <label htmlFor="file">Upload a file:</label>
          <input type="file" name="file" id="file" accept=".txt" onChange={handleInputChange} />
        </div>
      )}
      <div className="form-row">
        <button type="submit" className={loading ? "active" : ""} id="submit-btn">
          {option === "getHash" ? "Get Hash" : "Compare File Hash"}
        </button>
      </div>
      <div>
        <button onClick={() => setCurrentView("tzi-labs")}>Go back</button>
      </div>
    </form>
  </>
  );
}

export default HashForm;
