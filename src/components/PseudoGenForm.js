import { useState } from "react";
import PseudoGenOptions from "./PseudoGenOptions";

function PseudoGenForm({setCurrentView}) {
  const [option, setOption] = useState('');
  const [paramA, setParamA] = useState(0);
  const [paramM, setParamM] = useState(0);
  const [paramC, setParamC] = useState(0);
  const [paramX0, setParamX0] = useState(0);
  const [size, setSize] = useState(1);
  const [saveToFile, setSaveToFile] = useState(false);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'paramA':
        setParamA(value);
        break;
      case 'paramM':
        setParamM(value);
        break;
      case 'paramC':
        setParamC(value);
        break;
      case 'paramX0':
        setParamX0(value);
        break;
      case 'size':
        setSize(value);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (e) => {
    setSaveToFile(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <form className="page-form" id="data-form" onSubmit={handleSubmit}>
        <PseudoGenOptions option={option} handleOptionChange={handleOptionChange}/>
        {option !== '' ?
        <>
        <div className="form-row">
          <h3>Enter generator function params:</h3>
        </div>
        <div className="form-row">
          <label htmlFor="paramA">A:</label>
          <input
            type="number"
            name="paramA"
            value={paramA}
            onChange={handleInputChange}
            min="0"
            max="2147483647"
          />
        </div>
        <div className="form-row">
          <label htmlFor="paramM">M:</label>
          <input
            type="number"
            name="paramM"
            value={paramM}
            onChange={handleInputChange}
            min="0"
            max="2147483647"
          />
        </div>
        <div className="form-row">
          <label htmlFor="paramC">C:</label>
          <input
            type="number"
            name="paramC"
            value={paramC}
            onChange={handleInputChange}
            min="0"
            max="2147483647"
          />
        </div>
        <div className="form-row">
          <label htmlFor="paramX0">X0:</label>
          <input
            type="number"
            name="paramX0"
            value={paramX0}
            onChange={handleInputChange}
            min="0"
            max="2147483647"
          />
        </div>
        {option==='generate'?
        <>
        <div className="form-row" id="size-row">
          <label htmlFor="size">Sequence size:</label>
          <input
            type="number"
            name="size"
            value={size}
            onChange={handleInputChange}
            min="1"
            max="100000"
            required
          />
        </div>
        <div className="form-row" id="saveToFileRow">
          <label htmlFor="saveToFile">
            <input
              type="checkbox"
              name="saveToFile"
              checked={saveToFile}
              onChange={handleCheckboxChange}
            />
            Save Output to File
          </label>
        </div>
        </>
        :
        <></>
        }
        <div className="form-row">
          <button type="submit" id="submit-btn">
            {option === 'generate' ? 'Generate sequence' : 'Get Function Period'}
          </button>
        </div>
        </>
        : 
        <></>
        }
        <div>
          <button onClick={() => null}>Go back</button>
        </div>
      </form>
    </>
  );
}

export default PseudoGenForm;
