import React, { useContext } from 'react';
import { ApiContextProvider } from '../utils/ApiContext';

const ChatView = (props) => {
    const value = useContext(ApiContextProvider);
    const { addMessage } = value;
    return (
        <div>
            This is my chat app
        </div>
    )
}

export default ChatView
