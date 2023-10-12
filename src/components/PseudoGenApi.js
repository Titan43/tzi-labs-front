import { PSEUDO_GEN_PATH } from "./Constants";

function getPseudoRNDOut(paramA, paramM, paramC, paramX0, size, option, handleMessage, setLoading, setAppOutput){
    setLoading(true);
    fetch(PSEUDO_GEN_PATH + (option==='generate' ? `?size=${size}` : '/period'), {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        a: paramA,
        m: paramM,
        c: paramC,
        initialValue: paramX0
        }),
    })
        .then((response) => {
        if (response.ok) {
            if(option==='generate'){
                response.json().then((out) => {
                handleMessage('Sequence generated', 'success');
                setAppOutput(out)
                });
            }
            else{
                response.text().then((out) => {
                handleMessage('Period found', 'success');
                setAppOutput([out])
                });
            }
        } else {
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

export default getPseudoRNDOut;