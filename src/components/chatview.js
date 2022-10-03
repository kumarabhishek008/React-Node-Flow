import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ApiContextProvider } from '../utils/ApiContext';

const ChatView = (props) => {
    const value = useContext(ApiContextProvider);
    const { addMessage } = value;
    const [inputChnage, setInputChnage] = useState("");

    // useEffect(() => {  
    //     let timeout; 
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //         console.log(inputChnage);
    //     }, 2000);
    // }, [inputChnage])
    
    const handleChnage = (e) => { 
        setInputChnage(e.target.value);
        console.log(e.target.value)
     }

    const updateDebouceText = useCallback(debonceText(handleChnage,1000),[])

    function debonceText (cb, delay=1000){
         let timeout
         return (...args) =>{
             if(timeout) clearTimeout(timeout);
             timeout = setTimeout(()=>{
                 timeout = null
                cb(...args)
            },delay)
        }
    }
    return (
        <div>
            This is my chat app
            <input onChange={updateDebouceText}/>
        </div>
    )
}

export default ChatView
