import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message) {
            await axios.post('http://localhost:5000/messages', { message });
            setMessage('');
            fetchMessages();
        }
    };

    const fetchMessages = async () => {
        const response = await axios.get('http://localhost:5000/messages');
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Message Board</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a message"
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
