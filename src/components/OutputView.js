import LoadingSpinner from "./LoadingSpinner";
import Result from "./Result";

function OutputView({output, loading}) {
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    return (
    <>
      <div className="output-view form-container" onSubmit={handleSubmit}>
        {loading? 
            <LoadingSpinner/>
        :
            <Result output={output}/>}
      </div>
    </>
    );
  }
  
export default OutputView;

  
  
  
  