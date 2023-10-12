import LoadingSpinner from "./LoadingSpinner";
import Result from "./Result";
import SaveToFile from "./SaveToFile";

function OutputView({output, loading, handleMessage}) {
    return (
    <>
      <div className="output-view form-container">
        {loading? 
            <LoadingSpinner/>
        :
            <>
            <SaveToFile 
                output={output}
                handleMessage={handleMessage}/>
            <h3>Output:</h3>
            <Result output={output}/>
            </>}
      </div>
    </>
    );
  }
  
export default OutputView;

  
  
  
  