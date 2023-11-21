import { SIGN_PATH } from "../Utils/Constants";

export async function signMessage(message, key, handleMessage, setLoading, setAppOutput) {
  setLoading(true);

  try {
    const response = await fetch(`${SIGN_PATH}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        key: await readFileContent(key),
      }),
    });

    if (response.ok) {
      const signature = JSON.parse(await response.text());
      handleMessage('Message signed successfully', 'success');
      setAppOutput([signature.signature]);
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

export async function signFile(file, key, handleMessage, setLoading, setAppOutput) {
  setLoading(true);

  const formData = new FormData();
  formData.append('file', file);

  const keyData = await readFileContent(key)
  const jsonBody = {
    key: keyData
  };

  formData.append('key', new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));

  try {
    const response = await fetch(`${SIGN_PATH}/file-sign`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const signature = JSON.parse(await response.text());
      handleMessage('File signed successfully', 'success');
      setAppOutput([signature.signature]);
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

export async function verifyMessage(message, signature, publicKey, handleMessage, setLoading, setAppOutput) {
      setLoading(true);
      const formData = new FormData();
      const key = await readFileContent(publicKey)
      const jsonBody1 = {
          message: message
      };
      const jsonBody2 = {
          key: key,
          signature: signature
      };
      formData.append('message',  new Blob([JSON.stringify(jsonBody1)], { type: 'application/json' }));
      formData.append('signature', new Blob([JSON.stringify(jsonBody2)], { type: 'application/json' }));
      try {
        const response = await fetch(`${SIGN_PATH}/verify`, {
          method: 'POST',
          body: formData,
        });
      
        const responseText = await response.text();
        if (response.ok) {
          if (responseText === "true") {
            handleMessage('Message verification successful', 'success');
            setAppOutput(['Signature is valid']);
          } else {
            handleMessage('Message verification successful', 'success');
            setAppOutput(['Signature is NOT valid']);
          }
        } else {
          throw new Error(responseText);
        }
      } catch (error) {
        handleMessage(error.message, 'error');
        setAppOutput(null);
      } finally {
        setLoading(false);
      }
  }
  
  export async function verifyFile(file, signature, publicKey, handleMessage, setLoading, setAppOutput) {
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', file);
  
    const keyData = await readFileContent(publicKey);
    const jsonBody = {
      key: keyData,
      signature: signature
    };
  
    formData.append('signature', new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));
  
    try {
        const response = await fetch(`${SIGN_PATH}/file-verify`, {
          method: 'POST',
          body: formData,
        });
      
        const responseText = await response.text();
        if (response.ok) {
          if (responseText === "true") {
            handleMessage('Message verification successful', 'success');
            setAppOutput(['Signature is valid']);
          } else {
            handleMessage('Message verification successful', 'success');
            setAppOutput(['Signature is NOT valid']);
          }
        } else {
          throw new Error(responseText);
        }
      } catch (error) {
        handleMessage(error.message, 'error');
        setAppOutput(null);
      } finally {
        setLoading(false);
      }
  }

async function readFileContent(file) {
    if (file != null) {
      const content = await file.text();
      return content.trim();
    }
    return "";
  }