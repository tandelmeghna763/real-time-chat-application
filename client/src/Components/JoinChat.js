import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Components/JoinChat.css';
import socket from '../Socket';

function JoinChat() {
    let navigate = useNavigate();
    const [name, setName] = useState('');

    const submit = (name) => {
        // console.log("User Name", name);
        socket.emit("JoinChat", name);
        localStorage.setItem('Name of User', name);
        navigate('/homepage')
    }
    return (
        <div className="card">
            <h2>Real-Time Chat Application</h2>
            <input type="text" placeholder="Enter Name" value={name} className="input" onChange={(e) => setName(e.target.value)}></input>
            <button className="button" onClick={() => submit(name)}>Join Chat</button>
        </div>
    );
}


export default JoinChat;