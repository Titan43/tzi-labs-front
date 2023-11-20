import { ENCRYPT_PATH } from "../Utils/Constants";

export async function encryptMessageRC5(message, key, iv, handleMessage, setLoading, setAppOutput) {
  setLoading(true);

  try {
    const response = await fetch(`${ENCRYPT_PATH}/encrypt/rc5`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        key: key,
        iv: iv,
      }),
    });

    if (response.ok) {
      const out = await response.text();
      handleMessage('Message encrypted with RC5', 'success');
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

export async function encryptFileRC5(file, key, iv, handleMessage, setLoading, setAppOutput) {
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', file);
  
    const jsonBody = {
      key: key,
      iv: iv,
    };
  
    formData.append('key', new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));
  
    try {
      const response = await fetch(`${ENCRYPT_PATH}/file-encrypt/rc5`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const out = await response.text();
        console.log(out);
        handleMessage('File encrypted with RC5', 'success');
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
