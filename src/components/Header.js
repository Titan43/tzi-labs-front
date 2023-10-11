function Header({currentView}){
    return (<>
        <header className="header">
          <h1>{currentView}</h1>
        </header>
    </>);
}

export default Header;