import React, { useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import SunEditor from 'suneditor-react';
// import SunEditorCore from "suneditor/src/lib/core";
import './suneditor.min.css'; 

const Editor = (props) => {
    const {
        setInputChange,
        value,
        handleClose,
        handleSave
     } = props;
     const editor = useRef();

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

     useEffect(() => {
        // getSunEditorInstance();
     }, [])
     
     const handleInputChnage = (content) => { 
        setInputChange(content)
      }

  return (
    <div>
        <SunEditor 
        getSunEditorInstance={getSunEditorInstance} 
        setContents={value} onChange={handleInputChnage}
        setOptions={{
            height:'150px',
            plugins:['font','bold']
        }}
        />
        <div style={{display:'flex', justifyContent:'end', alignItems:'flex-end', padding:'0.5rem '}}>
            <Button contained color="secondary" onClick={handleClose}>Cancel</Button>
            <Button contained color="primary" onClick={handleSave}>Save</Button>
        </div>
    </div>
  )
}

export default Editor