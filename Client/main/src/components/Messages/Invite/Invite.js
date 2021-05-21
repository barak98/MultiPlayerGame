import React from "react";

import "../Message/Message.css";


const Invite = ({ invite , name }) => {
  let isSentByCurrentUser = false;

//   const trimmedName = name.trim().toLowerCase();

//   if (user === trimmedName) {
//     isSentByCurrentUser = true;
//   }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <a className="messageText colorWhite">{invite}</a>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <a className="messageText colorDark">{invite}</a>
      </div>
    </div>
  );
};

export default Invite;