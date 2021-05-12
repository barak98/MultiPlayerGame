import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

import TextField from '@material-ui/core/TextField'
import io from "socket.io-client";
import Sidebar from "../components/Sidebar";

const socket = io.connect('http://localhost:4000/')

 

export default function DashBoard() {

  const [state, setState] = useState({message: '', name: ''})
  const [chat, setChat] = useState([])

  const socketRef = useRef()
  
  const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

  const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

  useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

  const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

  return (
    <>
 
      <Navbar></Navbar>

      <div style={{ marginLeft: "90%" }}>
      <Sidebar></Sidebar>
      </div>

      <div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>





}
