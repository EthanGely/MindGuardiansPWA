import { useEffect, useState } from "react";
import "./chat.scss";

function Chat() {
    // Create a fake list of messages
    const [messages, setMessages] = useState([
        { user: 'me', text: 'Hello!' },
        { user: 'them', text: 'Hi there!' },
        { user: 'me', text: 'How are you?' },
        { user: 'them', text: 'I am good, thanks!' },
        { user: 'them', text: 'How are you feeling today?' },
        { user: 'me', text: 'I am feeling great!' },
        { user: 'me', text: 'Do you want to chat?' },
        { user: 'them', text: 'Sure, let\'s chat!' }
    ]);

    function sendMessage() {
        // Get the message from the input
        const message = (document.querySelector('.chat-input input') as HTMLInputElement).value;
        // Add the message to the list of messages
        setMessages([...messages, { user: 'me', text: message }]);
        // Reset the input
        (document.querySelector('.chat-input input') as HTMLInputElement).value = '';
    }

    useEffect(() => {
        console.log("NEW MESSAGE!")
        // Scroll to the bottom of the chat
        const messagesDiv = document.querySelector('.chat-messages');
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-header">
                <p>C'est moche, mais bientôt fonctionnel !</p>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user === 'me' ? 'my-message' : 'their-message'}`}>
                        { (message.user !== 'me' ? <p className="username"><strong>{message.user}</strong></p> : '')}
                        <p className="messageText">{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
export default Chat;