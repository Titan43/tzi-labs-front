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
          className={currentView === "Generate Keys" ? "active" : ""}
          onClick={() => setCurrentView('Generate Keys')}
        >
          Generate Keys
        </button>
        <button
          className={currentView === "Encrypt data" ? "active" : ""}
          onClick={() => setCurrentView('Encrypt data')}
        >
          Encrypt data
        </button>
        <button
          className={currentView === "Decrypt data" ? "active" : ""}
          onClick={() => setCurrentView('Decrypt data')}
        >
          Decrypt data
        </button>
        <button
          className={currentView === "Sign data" ? "active" : ""}
          onClick={() => setCurrentView('Sign data')}
        >
          Sign data
        </button>
      </form>
    </>
    );
  }
  
export default UserNavForm;

  
  
  
  