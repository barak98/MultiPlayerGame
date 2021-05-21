import React from "react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message, sendInviteGame }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
    <button className="sendButton" onClick={(e) => sendInviteGame(e)}>
      Send invite game
    </button>
  </form>
);

export default Input;
