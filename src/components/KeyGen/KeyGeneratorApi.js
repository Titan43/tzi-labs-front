import { ENCRYPT_PATH, SIGN_PATH } from "../Utils/Constants";

const generateKey = async (algorithm, handleMessage, setLoading, setAppOutput) => {
    setLoading(true);
    try {
      const response = await fetch(`${algorithm === 'RSA' ? ENCRYPT_PATH 
      : SIGN_PATH}/generate-keys`);
      if (response.ok) {
        const data = await response.json();
        setAppOutput(Object.values(data));
        handleMessage("Keys generated successfully", "success")
      } else {
        throw new Error('Error generating encryption keys');
      }
    } catch (error) {
      handleMessage(error.message)
    }
    finally{
        setLoading(false);
    }
};

export default generateKey;