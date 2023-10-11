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
            Generate Sequence
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="period"
              checked={option === 'period'}
              onChange={handleOptionChange}
            />
            Function Period
          </label>
    </div>
    </>);
}

export default PseudoGenOptions;