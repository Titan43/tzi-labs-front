function Result({ output }) {
  return (
    <div>
      {output !== null ? (
        output.map((item, index) => (
          <p key={index} className="result">
            {item.length < 150000 ? item : "Data size too large to display"}
          </p>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Result;