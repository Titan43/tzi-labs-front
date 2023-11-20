import { ENCRYPT_PATH } from "../Utils/Constants";

export async function decryptMessageRSA(message, privateKeyFile, handleMessage, setLoading, setAppOutput) {
  setLoading(true);

  const privateKey = await readFileContent(privateKeyFile);

  try {
    const response = await fetch(`${ENCRYPT_PATH}/decrypt/rsa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        key: privateKey,
      }),
    });

    if (response.ok) {
      const out = await response.text();
      handleMessage('Message decrypted with RSA', 'success');
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

export async function decryptFileRSA(file, privateKeyFile, handleMessage, setLoading, setAppOutput) {
  setLoading(true);

  const privateKey = await readFileContent(privateKeyFile);
  const formData = new FormData();
  formData.append('file', file);

  const jsonBody = {
    key: privateKey,
  };

  formData.append('key', new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }));

  try {
    const response = await fetch(`${ENCRYPT_PATH}/file-decrypt/rsa`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const out = await response.text();
      console.log(out);
      handleMessage('File decrypted with RSA', 'success');
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
  if (file != null) {
    const content = await file.text();
    return content.trim();
  }
  return "";
}
