function Result({ output }) {
    return (
      <div>
        {output !== null ? (
          output.map((item, index) => (
            <p key={index} className="result">{item}</p>
          ))
        ) : 
        <></>}
      </div>
    );
  }
  
export default Result;