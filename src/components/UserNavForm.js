function UserNavForm({currentView, setCurrentView}) {
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    return (
    <>
      <form className="user-nav-form" onSubmit={handleSubmit}>
        <button
          className={currentView === "PseudoRND Generator" ? "active" : ""}
          onClick={() => setCurrentView('PseudoRND Generator')}
        >
          PseudoRND Generator
        </button>
        <button
          className={currentView === "PLACEHOLDER" ? "active" : ""}
          onClick={() => setCurrentView('tzi-labs')}
        >
          TODO
        </button>
      </form>
    </>
    );
  }
  
export default UserNavForm;

  
  
  
  