import Tooltip from "../Utils/Tooltip";

function PseudoGenOptions({option, handleOptionChange}){
    return (<>
    <h3>Choose an option:</h3>
    <div className="gen-options">
          <label>
            <input
              type="radio"
              name="option"
              value="generate"
              checked={option === 'generate'}
              onChange={handleOptionChange}
            />
            <Tooltip text={"Generate a sequence of pseudorandom numbers using given params"}>
              Generate Sequence
            </Tooltip>
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="period"
              checked={option === 'period'}
              onChange={handleOptionChange}
            />
            <Tooltip text={"Find the period of a pseudorandom function with given params"}>
              Function Period
            </Tooltip>
          </label>
    </div>
    </>);
}

export default PseudoGenOptions;