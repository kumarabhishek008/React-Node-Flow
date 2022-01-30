import React, { createContext } from 'react';
import { db } from './firebase';

export const ApiContextProvider = createContext({});

const ApiContext = ({ children }) => {

    const addMessage = (sender, reciever, message) => {
         db.collection("chat").add({
            sender : sender,
            reciever : reciever,
            message : message
        })
    }

    const getChats = (reciever, sender) => {
        const all_chats = db.collection("chat").get({reciever:reciever, sender:sender})
    }
    

    return (
        <ApiContextProvider.Provider value={{addMessage}}>
            {children}
        </ApiContextProvider.Provider>
    )
}

export default ApiContext
