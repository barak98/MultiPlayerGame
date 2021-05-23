import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Popup from "../Popup";

import { v4 as uuidv4 } from 'uuid';


import "./Chat.css";
import Navbar from "../Navbar";

const ENDPOINT = "localhost:4000";

let socket;

const GameRoom = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("aaa");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  },[]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
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
          sendMessage={sendMessage}
          
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default GameRoom;
