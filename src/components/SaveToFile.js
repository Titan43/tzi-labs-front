import { saveAs } from 'file-saver';

function SaveToFile({output, handleMessage}){
    const handleSaveToFile = (out) => {
        const textContent = out.join('\n');
    
        const fileName = prompt('Enter a file name (with extension):', 'sequence.txt');
    
        if (fileName) {
          const blob = new Blob([textContent], { type: 'text/plain' });
          saveAs(blob, fileName);
          handleMessage("File saved to your default download folder",
            "success")
        }
    }

    return (<>
        <button className="save-to-file" onClick={()=>handleSaveToFile(output)}>
            Save output as file
        </button>
    </>);
}

export default SaveToFile;