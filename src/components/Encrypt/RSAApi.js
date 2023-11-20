import { ENCRYPT_PATH } from "../Utils/Constants";

export async function encryptMessageRSA(message, publicKeyFile, handleMessage, setLoading, setAppOutput) {
    setLoading(true);
  
    const publicKey = await readFileContent(publicKeyFile);
  
    try {
      const response = await fetch(`${ENCRYPT_PATH}/encrypt/rsa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          key: publicKey,
        }),
      });
  
      if (response.ok) {
        const out = await response.text();
        handleMessage('Message encrypted with RSA', 'success');
        setAppOutput([out]);
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      handleMessage(error.message, 'error');
      setAppOutput(null);
    } finally {
      setLoading(false);
    }
  }
  
  export async function encryptFileRSA(file, publicKeyFile, handleMessage, setLoading, setAppOutput) {
    setLoading(true);
  
    const publicKey = await readFileContent(publicKeyFile);
    const formData = new FormData();
    formData.append('file', file);
  
    const jsonBody = {
      key: publicKey,
    };
  
    formData.append('key', new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));
  
    try {
      const response = await fetch(`${ENCRYPT_PATH}/file-encrypt/rsa`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const out = await response.text();
        console.log(out);
        handleMessage('File encrypted with RSA', 'success');
        setAppOutput([out]);
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      handleMessage(error.message, 'error');
      setAppOutput(null);
    } finally {
      setLoading(false);
    }
  }
  
  async function readFileContent(file) {
    if(file != null){
        const content = await file.text();
        return content.trim(); 
    }
    return "";
  }
  