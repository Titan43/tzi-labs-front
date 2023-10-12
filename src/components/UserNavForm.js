function UserNavForm({currentView, setCurrentView, setAppOutput}) {
    const handleSubmit = (event) => {
        event.preventDefault(); 
        setAppOutput(null);
    };

    return (
    <>
      <form className="user-nav-form form-container" onSubmit={handleSubmit}>
        <button
          className={currentView === "PseudoRND Generator" ? "active" : ""}
          onClick={() => setCurrentView('PseudoRND Generator')}
        >
          PseudoRND Generator
        </button>
        <button
          className={currentView === "Hash MD5" ? "active" : ""}
          onClick={() => setCurrentView('Hash MD5')}
        >
          Hash MD5
        </button>
        <button
          className={currentView === "tzi-labs" ? "active" : ""}
          onClick={() => setCurrentView('tzi-labs')}
        >
          TODO
        </button>
      </form>
    </>
    );
  }
  
export default UserNavForm;

  
  
  
  