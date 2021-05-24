import React from "react";

import onlineIcon from "../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users,sendInviteGame }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <a key={name} className="activeItem" onClick={(e) => sendInviteGame(e,name)}>
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </a>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
