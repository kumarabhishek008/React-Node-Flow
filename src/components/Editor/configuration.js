import React from "react";

const Configuration = () => {
  return {
    /**
     * Id of Element that should contain Editor instance
     */
    holder: "editorjs",

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      // header: {
      //     class: Header,
      //     inlineToolbar: ['link']
      // },
      //     list: {
      //         class: List,
      //         inlineToolbar: true
      //     }
    },
    /**
     * Previously saved data that should be rendered
     */
    data: {},
    /**
     * onReady callback
     */
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
    /**
     * onChange callback
     */
    onChange: (api, event) => {
      console.log("Now I know that Editor's content changed!", event);
    },
    /**
     * This Tool will be used as default
     */
    // defaultBlock: "myOwnParagraph",
    /**
     * Enable autofocus
     */
    autofocus: true,
    // readOnly: true,
    placeholder: 'Let`s write an awesome story!',
    data:{
        "time": 1550476186479,
        "blocks": [
           {
              "type": "heading",
              "data": {
                 "text": "Editor.js",
                 "level": 2
              }
           },
           {
              "type": "paragraph",
              "data": {
                 "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
              }
           },
           {
              "type": "heading",
              "data": {
                 "text": "Key features",
                 "level": 3
              }
           }
        ],
        "version": "2.8.1"
    }
  };
};

export default Configuration;
