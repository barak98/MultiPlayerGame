import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Popup from "../Popup";



import "./Chat.css";
import Navbar from "../Navbar";

const ENDPOINT = "localhost:4000";

let socket;

const GameRoom = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const history = useHistory();

  useEffect(() => {
      
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("joinPrivateRoom" ,name);


  }, [ENDPOINT, location.search]);

  useEffect(()=>{

    socket.on("messagePrivateRoom", (message) => {
        console.log("messagePrivateRoom");
        console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    
    socket.on("roomData", ({ users }) => {
        setUsers(users);
      });

  },[]);

   

  const sendMessagePrivateRoom = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessagePrivateRoom", message,name);
      setMessage("");
    }
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <Navbar />
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessagePrivateRoom}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default GameRoom;
