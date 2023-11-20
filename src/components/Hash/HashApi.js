import { CUSTOM_HASH_PATH } from "../Utils/Constants";

export function getMessageHash(message, handleMessage, setLoading, setAppOutput) {
  setLoading(true);
  fetch(CUSTOM_HASH_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => {
      if (response.ok) {
        response.text().then((out) => {
          handleMessage('Message Hash was generated', 'success');
          setAppOutput([out]);
        });
      } else {
        return response.text().then((error) => {
          throw new Error(error);
        });
      }
    })
    .catch((error) => {
      handleMessage(error.message, 'error');
      setAppOutput(null);
    })
    .finally(() => {
      setLoading(false);
    });
}

export async function getFileHash(file, handleMessage, setLoading, setAppOutput) {
  setLoading(true);
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(CUSTOM_HASH_PATH + '/file', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const out = await response.text();
      handleMessage('File Hash was generated', 'success');
      setAppOutput([out]);
      return out;
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

export async function compareFileHash(message, file, handleMessage, setLoading, setAppOutput) {
  try {
    const fileHash = await getFileHash(file, handleMessage, setLoading, setAppOutput);
    const isFileCorrupt = message.toUpperCase() !== fileHash;
    console.log(fileHash);
    console.log(message.toUpperCase());

    handleMessage('File Hash was generated', 'success');
    setAppOutput([isFileCorrupt ? 'File is corrupt, Hash values do not match' : 'File is not corrupt, Hash values match']);
  } catch (error) {
    handleMessage(error.message, 'error');
    setAppOutput(null);
  }
}
