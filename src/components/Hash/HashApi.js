import { CUSTOM_HASH_PATH } from "../Utils/Constants";

export function getMessageHash(message, handleMessage, setLoading, setAppOutput){
    setLoading(true);
    fetch( CUSTOM_HASH_PATH, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message}),
    })
    .then((response) => {
        if (response.ok) {
            response.text().then((out) => {
            handleMessage('Message Hash was generated', 'success');
            setAppOutput([out])
            });
        }
        else {
            return response.text().then((error) => {
                throw new Error(error);
            });
        }
        })
        .catch((error) => {
        handleMessage(error.message, 'error');
        setAppOutput(null)
        }).finally(()=>{
            setLoading(false);
    });
}

export function compareFileHash(message, file, handleMessage, setLoading, setAppOutput){
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch( CUSTOM_HASH_PATH+'/file', {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        if (response.ok) {
            response.text().then((out) => {
            handleMessage('File Hash was generated', 'success');
            setAppOutput([message===out ? 'File is not corrupt, Hash values match' : 'File is corrupt, Hash values do not match'])
            });
        }
        else {
            return response.text().then((error) => {
                throw new Error(error);
            });
        }
        })
        .catch((error) => {
        handleMessage(error.message, 'error');
        setAppOutput(null)
        }).finally(()=>{
            setLoading(false);
    });
}
