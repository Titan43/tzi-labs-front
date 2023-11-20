import { useState } from "react";
import Header from "./components/Header";
import PseudoGenForm from "./components/PseudoGen/PseudoGenForm"
import "./styles/App.css"
import UserNavForm from "./components/UserNavForm";
import Notification from "./components/Utils/Notification";
import OutputView from "./components/Output/OutputView";
import HashForm from "./components/Hash/HashForm";
import EncryptionForm from "./components/Encrypt/EncryptionForm";
import DecryptionForm from "./components/Decrypt/DecryptionForm";
import KeyGeneratorForm from "./components/KeyGen/KeyGen";

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
    case 'Hash MD5':
      componentToRender = <HashForm
      setCurrentView={setCurrentView}
      handleMessage={handleMessage}
      loading={loading}
      setLoading={setLoading}
      setAppOutput={setAppOutput}
      />
      break;
    case 'Generate Keys':
      componentToRender = <KeyGeneratorForm
      appOutput={appOutput}
      setCurrentView={setCurrentView}
      handleMessage={handleMessage}
      loading={loading}
      setLoading={setLoading}
      setAppOutput={setAppOutput}
      />
      break;
    case 'Encrypt data':
      componentToRender = <EncryptionForm
      setCurrentView={setCurrentView}
      handleMessage={handleMessage}
      loading={loading}
      setLoading={setLoading}
      setAppOutput={setAppOutput}
      />
      break;
    case 'Decrypt data':
        componentToRender = <DecryptionForm
        setCurrentView={setCurrentView}
        handleMessage={handleMessage}
        loading={loading}
        setLoading={setLoading}
        setAppOutput={setAppOutput}
        />
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
