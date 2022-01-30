import React from "react";
import EditorJS from "@editorjs/editorjs";
// import Header from '@editorjs/editorjs/header';
// import List from '@editorjs/editorjs/list';
import Configuration from "./configuration";
import { Button } from "@material-ui/core";

const Editor = () => {

  const editor = new EditorJS(Configuration());

  editor.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
      /** Do anything you need after editor initialization */
    //   editor.readOnly.toggle();
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });

    const savedata = () => {
      editor.save().then((outputData) => {
          console.log('Article data: ', outputData)
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
    };
    
  return (
    <div>
      <h1>This is the text editor <Button onClick={savedata}>Save Data</Button></h1>
      <div style={{padding:'2rem'}}>
        <div id="editorjs" />
      </div>
    </div>
  );
};

export default Editor;
