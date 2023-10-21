import { useState } from "react";
import PseudoGenOptions from "./PseudoGenOptions";
import getPseudoRNDOut from "./PseudoGenApi";
import Tooltip from "../Utils/Tooltip";

function PseudoGenForm({setCurrentView, handleMessage, loading, setLoading, setAppOutput}) {
  const [option, setOption] = useState('');
  const [paramA, setParamA] = useState(0);
  const [paramM, setParamM] = useState(1);
  const [paramC, setParamC] = useState(0);
  const [paramX0, setParamX0] = useState(0);
  const [size, setSize] = useState(1);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    getPseudoRNDOut(paramA, paramM, paramC, paramX0,
       size, option,
        handleMessage, setLoading, setAppOutput);
  };

  return (
    <>
      <form className="page-form form-container" id="data-form" onSubmit={handleSubmit}>
        <PseudoGenOptions option={option} handleOptionChange={handleOptionChange}/>
        {option !== '' ?
        <>
        <div className="form-row">
          <h3>Enter generator function params:</h3>
        </div>
        <div className="form-row">
          <label htmlFor="paramA">
            <Tooltip text={"Function multiplier"}>A:</Tooltip>
          </label>
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
          <label htmlFor="paramM">
            <Tooltip text={"Comparison module"}>M:</Tooltip>
          </label>
          <input
            type="number"
            name="paramM"
            value={paramM}
            onChange={handleInputChange}
            min="1"
            max="2147483647"
          />
        </div>
        <div className="form-row">
          <label htmlFor="paramC">
            <Tooltip text={"Function increment"}>C:</Tooltip>
          </label>
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
          <label htmlFor="paramX0">
            <Tooltip text={"Initial value(seed) used for generating values"}>X0:</Tooltip>
          </label>
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
          <label htmlFor="size">
            <Tooltip text={"Size of the generated sequence(Initial value included)"}>Sequence size:</Tooltip>
          </label>
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
        </>
        :
        <></>
        }
        <div className="form-row">
          <button type="submit" className={loading ? "active" : ""} id="submit-btn">
            {option === 'generate' ? 'Generate sequence' : 'Get Function Period'}
          </button>
        </div>
        </>
        : 
        <></>
        }
        <div>
          <button onClick={() => setCurrentView('tzi-labs')}>Go back</button>
        </div>
      </form>
    </>
  );
}

export default PseudoGenForm;
