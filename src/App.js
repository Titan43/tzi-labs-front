import { useState } from "react";
import Header from "./components/Header";
import PseudoGenForm from "./components/PseudoGenForm"
import "./styles/App.css"
import UserNavForm from "./components/UserNavForm";
import Notification from "./components/Notification";
import OutputView from "./components/OutputView";

function App() {
  const [currentView, setCurrentView] = useState('tzi-labs');
  const [appOutput, setAppOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [notificationUpdateTime, setNotificationUpdateTime] = useState(Date.now());

  const handleMessage = (m, t) =>{
    setMessage(m);
    setType(t);
    setNotificationUpdateTime(Date.now());
  }

  let componentToRender = null;

  switch (currentView) {
    case 'PseudoRND Generator':
      componentToRender = <PseudoGenForm 
        setCurrentView={setCurrentView}
        handleMessage={handleMessage}
        loading={loading}
        setLoading={setLoading}
        setAppOutput={setAppOutput}
        />;
      break;
    default:
      componentToRender = <></>;
  }

  return (
    <div className="App">
      <Header currentView={currentView}/>
      <div className="container">
      <UserNavForm 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        setAppOutput={setAppOutput}
        />
      {componentToRender}
      {appOutput || loading? <OutputView 
        output={appOutput}
        loading={loading}
        handleMessage={handleMessage}/>
        :
        <></>}
      </div>
      <Notification 
        message={message} 
        type={type} 
        notificationUpdateTime={notificationUpdateTime}
        />
    </div>
  );
}

export default App;
