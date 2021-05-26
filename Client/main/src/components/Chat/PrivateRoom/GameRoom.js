import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import Messages from "../../Messages/Messages";
import InfoBar from "../../InfoBar/InfoBar";
import Input from "../../Input/Input";
import Navbar from "../../Navbar";

import "../PrivateRoom/GameRoom.css";
import Game from "../../Game/game";

const ENDPOINT = "https://onlinetictactoe.azurewebsites.net/";

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

    socket.emit("joinPrivateRoom", name);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("messagePrivateRoom", (message) => {
      console.log("messagePrivateRoom");
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessagePrivateRoom = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessagePrivateRoom", message, name);
      setMessage("");
    }
  };

  return (
    <>
    <div className="outerContainerGameRoom" style={{marginRight: "50%"}}>
      <div className="containerGameRoom">
        <Navbar />
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessagePrivateRoom}
        />
      </div>
    </div>
    <div>
    <Game />
    </div>
   
    </>
  );
};

export default GameRoom;
