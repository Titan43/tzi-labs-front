import { useState } from "react";
import Header from "./components/Header";
import PseudoGenForm from "./components/PseudoGenForm"
import "./styles/App.css"
import UserNavForm from "./components/UserNavForm";

function App() {
  const [currentView, setCurrentView] = useState('tzi-labs');

  let componentToRender;

  switch (currentView) {
    case 'PseudoRND Generator':
      componentToRender = <PseudoGenForm setCurrentView={setCurrentView}/>;
      break;
    default:
      componentToRender = <></>;
  }

  return (
    <div className="App">
      <Header currentView={currentView}/>
      <div className="container">
      <UserNavForm currentView={currentView} setCurrentView={setCurrentView}/>
      {componentToRender}
      </div>
    </div>
  );
}

export default App;
