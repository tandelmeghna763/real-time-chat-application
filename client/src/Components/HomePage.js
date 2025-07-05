import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import socket from '../Socket';
import "../Components/HomePage.css";
import { BiSend } from "react-icons/bi";
import moment from 'moment';

function HomePage() {
    const [client, setClient] = useState()
    const [selectedUser, setSelectedUser] = useState(null);
    const [msg, setMsg] = useState();
    const [displaymsg, setDisplayMsg] = useState([]);
    useEffect(() => {
        socket.emit("RequestUserList");
        const username = localStorage.getItem("Name of User");
        if (username) {
            socket.emit("JoinChat", username);
        }
        socket.on("SendUserList", (clientarr) => {
            // console.log('SendUserList executed', clientarr);
            const filterclient = clientarr.filter((item) => item.name !== username)
            console.log("Filter the current user", filterclient);
            setClient(filterclient);
        });
        socket.on("SendMsgToReceiver", (msg) => {
            // console.log("Message received:", msg);
            setDisplayMsg(prev => [...prev, msg]);
        });
        return () => {
            socket.off("SendUserList");
            socket.off("SendMsgToReceiver")
        };

    }, []);
    const username = localStorage.getItem("Name of User");
    const handleKeyDown = event => {
        if (event.keyCode === 13) {
            sendmsg()
        }
    };
    const sendmsg = () => {
        if (!selectedUser) {
            alert("Please select a user to send a message.");
            return;
        }
        const timestamp = moment().format('hh:mm A');
        const newMsg = {
            sender: username,
            text: msg,
            time: timestamp,
            receiver: selectedUser,
        };
        setDisplayMsg(prev => [...prev, newMsg]);
        socket.emit("SendMsgFromClient", newMsg);
        // console.log("New msg", newMsg);
        // const updatedMsgs = [...displaymsg, newMsg];
        // console.log("arry msg form client side", updatedMsgs);
        setMsg('');
    };

    return (
        <div className="header">
            <div className="profile">
                <CgProfile style={{ fontSize: "40px", color: "grey" }} />
                <h3>{username}</h3>
            </div>
            <div className="chat">
                <div className="sidebar">
                    {
                        client && client.length > 0 ? (
                            client.map((item, index) => (
                                <div key={index} onClick={() => setSelectedUser(item.name)}>
                                    <CgProfile size={17} />
                                    <h2>{item.name}</h2>
                                </div>
                            ))
                        ) : (
                            <p>No users online</p>
                        )
                    }

                </div>

                <div>
                    <div className="chatuser">
                        {
                            selectedUser ? (
                                <h3 style={{ margin: '0' }}>{selectedUser}</h3>
                            ) : (
                                <h3 style={{ margin: '0', color: '#888' }}>Select Uuser For Chat</h3>
                            )
                        }
                    </div>

                    <div className="displaymsg">
                        {displaymsg.map((m, i) => {
                            const isSender = m.sender === username;
                            const isRelevant = (m.sender === selectedUser && m.receiver === username) || (isSender && m.receiver === selectedUser);

                            return isRelevant && (
                                <div key={i} className={`textmsg ${isSender ? 'right' : 'left'}`}>
                                    <div>{m.text}</div>
                                    <div className="timestamp">{m.time}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="msg">
                        <input type="text" className="msginput" value={msg} placeholder="Enter Your Message Here" onKeyDown={handleKeyDown} onChange={(e) => setMsg(e.target.value)}></input>
                        <BiSend style={{ backgroundColor: ' #4c8df5', fontSize: "42px", borderRadius: "10px" }} onClick={() => sendmsg()} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;